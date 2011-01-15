function postHaiku (message, rk, rkm) {
    var cookie = 'rk=' + rk;
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
            body: message,
            rkm: rkm
        }
    );
}
