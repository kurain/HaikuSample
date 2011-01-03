Titanium.UI.setBackgroundColor('#000');

var tabGroup = Titanium.UI.createTabGroup();

var win1 = Titanium.UI.createWindow(
    {  
        title:'timeline',
        // url:'views/timeline.js',
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
        // url:'views/post.js',
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
tabGroup.open();

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
            }
        }
    );
}



var intent = Ti.Android.currentActivity.getIntent();
var text = intent.getStringExtra(Ti.Android.EXTRA_TEXT);
if ( text ) {
    win2.fireEvent('setMessage',{message: text});
    tabGroup.setActiveTab(1);
} else {
    getLoginData();
}
