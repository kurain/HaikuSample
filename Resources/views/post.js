var win = Ti.UI.currentWindow;
var rkm;
var rk;
var userName;

var textArea = Ti.UI.createTextArea(
    {
        top:  10,
        width: 310,
        height: 100,
        left: 10
    }
);
win.add(textArea);

var postButton = Ti.UI.createButton(
    {
        top:  120,
        width: 310,
        right: 10
    }
);

function postComment () {
    var comment = textArea.value;

    var cookie = 'rk=' + Ti.App.userInfo.rk;
    var xhr = Ti.Network.createHTTPClient();
    xhr.open('POST','http://h.hatena.ne.jp/entry');
    xhr.setRequestHeader('Cookie', cookie);
    xhr.onload = function () {
    };
    xhr.send(
        {
            body: comment,
            rkm: Ti.App.userInfo.rkm
        }
    );
}

postButton.addEventListener(
    'click',
    postComment
);

win.addEventListener(
    'setMessage',
    function() {
        textArea.value = e.message;
    }
);

win.add(postButton);