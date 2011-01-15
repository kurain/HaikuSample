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

postButton.addEventListener(
    'click',
    function() {
        var comment = textArea.value;
        Ti.App.fireEvent('postComment',{comment:comment});
    }
);

win.addEventListener(
    'focus',
    function(e) {
        if ( Ti.App.message ) {
            textArea.value = Ti.App.message;
        }
    }
);

win.add(postButton);

