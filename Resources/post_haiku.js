function getLoginData (callback) {
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
                if ( callback ) {
                    callback();
                }
            }
        }
    );
}

function postComment (comment) {
    if ( !Ti.App.userInfo ) {
        getLoginData();
        return;
    }
    var cookie = 'rk=' + Ti.App.userInfo.rk;
    var xhr = Ti.Network.createHTTPClient();
    xhr.open('POST','http://h.hatena.ne.jp/entry');
    xhr.setRequestHeader('Cookie', cookie);
    xhr.onload = function () {
        Ti.UI.createNotification({message:'ハイクに投稿しました。'}).show();
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
        postComment(e.comment);
    }
);
