Titanium.UI.setBackgroundColor('#000');

var tabGroup = Titanium.UI.createTabGroup();

var win1 = Titanium.UI.createWindow(
    {  
        title:'timeline',
        url:'views/timeline.js',
        backgroundColor:'#fff'
    }
);
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Timeline',
    window:win1
});

var win2 = Titanium.UI.createWindow(
    {  
        title:'post',
        url:'views/post.js',
        backgroundColor:'#fff'
    }
);
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Post',
    window:win2
});

tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  

function startService () {
    alert('start');
    var intent = Titanium.Android.createServiceIntent( { url: 'post_service.js' } );
    intent.putExtra('interval', 5000);
    var service = Titanium.Android.createService(intent);
    service.start();
}

function getLoginData () {
    var intent = Ti.Android.createIntent(
        {
            action: Ti.Android.ACTION_PICK,
            type: "vnd.android.cursor.dir/vnd.hatena.accounts"
        }
    );
    intent.addCategory(Ti.Android.CATEGORY_DEFAULT);
    Ti.Android.currentActivity.startActivityForResult(
        intent,
        function(e) {
            if ( e.resultCode == Ti.Android.RESULT_OK ) {
                var userName = e.intent.getStringExtra("username");
                var rk = e.intent.getStringExtra("randomkey");
                var rkm = e.intent.getStringExtra("rkm");

                Ti.App.userInfo = {
                    userName: userName,
                    rk: rk,
                    rkm: rkm
                };
                tabGroup.open();
                startService();
                if ( Ti.App.message ) {
                    tabGroup.setActiveTab(1);
                }

            }
        }
    );
}

function postComment (comment) {
    var cookie = 'rk=' + Ti.App.userInfo.rk;
    var xhr = Ti.Network.createHTTPClient();
    xhr.open('POST','http://h.hatena.ne.jp/entry');
    xhr.setRequestHeader('Cookie', cookie);
    xhr.onload = function () {
        if ( Ti.App.message ) {
            var intent = Ti.Android.createIntent();
            Ti.Android.currentActivity.setResult(Ti.Android.RESULT_OK,intent);
        }
    };
    xhr.send(
        {
            body: comment,
            rkm: Ti.App.userInfo.rkm
        }
    );
}

Ti.App.addEventListener(
    'postComment',
    function (e) {
        alert('fire event');
        postComment(e.comment);
    }
);

var intent = Ti.Android.currentActivity.getIntent();
var text = intent.getStringExtra(Ti.Android.EXTRA_TEXT);
if ( text ) {
    alert(text);
    Ti.App.message = text;
}

var LOGIN = 1, LOGOUT = 2;
var loggedIn = false;
var activity = Ti.Android.currentActivity;
activity.onCreateOptionsMenu = function(e) {
    var menu = e.menu;
    var login = menu.add({ title: "Login", itemId: LOGIN });
    //login.setIcon("login.png");
    login.addEventListener("click", function(e) {
        loggedIn = true;
    });
    var logout = menu.add({ title: "Logout", itemId: LOGOUT });
    //logout.setIcon("logout.png");
    logout.addEventListener("click", function(e) {
        loggedIn = false;
    });
};

activity.onPrepareOptionsMenu = function(e) {
    var menu = e.menu;
    menu.findItem(LOGIN).setVisible(!loggedIn);
    menu.findItem(LOGOUT).setVisible(loggedIn);
};

getLoginData();

