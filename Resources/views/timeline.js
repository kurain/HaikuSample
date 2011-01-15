var win = Ti.UI.currentWindow;
var tableView = Ti.UI.createTableView({
    data:null
});
win.add(tableView);

function updateTimeline (timeline) {
    var currentData = [];
    for (var i=0;i<timeline.length;i++) {
        var haiku = timeline[i];
        var row = Ti.UI.createTableViewRow(
            {
                height: 'auto'
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
                top: 30,
                height: 200,
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
                bottom: 5,
                fontSize: 6
            }
        );
        dateLabel.text = haiku.created_at;
        row.add(dateLabel);
        currentData.push(row);
    }
    tableView.setData(currentData);
}

function getTimline () {
    var xhr = Ti.Network.createHTTPClient();
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

if ( !Ti.App.message ) {
    getTimline();
}