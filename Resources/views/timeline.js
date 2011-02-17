Ti.include('../post_haiku.js');
var win = Ti.UI.currentWindow;

var textArea = Ti.UI.createTextArea(
    {
        top:  10,
        width: 310,
        height: 100,
        left: 10,
        value: (win.comment ? win.comment : '')
    }
);
win.add(textArea);

var postButton = Ti.UI.createButton(
    {
        top:  120,
        width: 100,
        height: 40,
        right: 20,
        title: '投稿'
    }
);

postButton.addEventListener(
    'click',
    function() {
        var comment = textArea.value;
        Ti.App.fireEvent('postComment',{comment:comment});
    }
);
win.add(postButton);

var tableView = Ti.UI.createTableView(
    {
        top: 200,
        data:null
    }
);
win.add(tableView);

function updateTimeline (timeline) {
    var currentData = [];
    for (var i=0;i<timeline.length;i++) {
        var haiku = timeline[i];
        var row = Ti.UI.createTableViewRow(
            {
                height: 140
            }
        );
        var imageView = Ti.UI.createImageView(
            {
                image: haiku.user.profile_image_url,
                width: 48,
                height: 48,
                top: 5,
                left: 5
            }
        );
        row.add(imageView);
        var nameLabel = Ti.UI.createLabel(
            {
                width: 120,
                height: 20,
                left: 58,
                top: 5,
                fontSize: 6,
                fontWeight: 'bold',
                color: '#2b4771'
            }
        );
        nameLabel.text = haiku.user.screen_name;
        row.add(nameLabel);
        var commentLabel = Ti.UI.createLabel(
            {
                width: 257,
                left: 58,
                top: 20,
                height: 80,
                fontSize: 8
            }
        );
        commentLabel.text = haiku.text;
        row.add(commentLabel);
        var dateLabel = Ti.UI.createLabel(
            {
                width: 200,
                height: 20,
                left: 58,
                top: 105,
                fontSize: 6
            }
        );
        dateLabel.text = haiku.created_at;
        row.add(dateLabel);
        currentData.push(row);
    }
    tableView.setData(currentData);
}

function getTimeline () {
    Ti.UI.createNotification({message:'タイムラインを更新します。'}).show();
    var xhr = Ti.Network.createHTTPClient();
    if ( !Ti.App.userInfo ) {
        Ti.UI.createNotification({message:'menuからログインしてください。'}).show();
        return;
    }
    var userName = Ti.App.userInfo.userName;
    var url = "http://h.hatena.ne.jp/api/statuses/friends_timeline/"+ userName +".json";
    xhr.open('GET', url);
    xhr.onload = function() {
        Ti.API.debug(this.responseText);
        var timeline = JSON.parse(this.responseText);
        updateTimeline(timeline);
    };
    xhr.send();
}

var LOGIN = 0;
var UPDATE = 1;
win.activity.onCreateOptionsMenu = function(e) {
    Ti.API.debug('onCreateOptionsMenu');
    var menu = e.menu;
    var login = menu.add({ title: "ログイン", itemId: LOGIN });
    login.addEventListener("click", function(e) {
        getLoginData(function(){getTimeline();});
    });
    var logout = menu.add({ title: "更新", itemId: UPDATE });
        logout.addEventListener("click", function(e) {
        getTimeline();
    });
};
