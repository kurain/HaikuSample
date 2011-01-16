Titanium.UI.setBackgroundColor('#000');

var intent = Ti.Android.currentActivity.getIntent();
var text = intent.getStringExtra(Ti.Android.EXTRA_TEXT);

var tabGroup = Titanium.UI.createTabGroup();
var win = Titanium.UI.createWindow(
    {  
        comment: text,
        url: 'views/timeline.js',
        title:'timeline',
        backgroundColor:'#fff'
    }
);

var tab = Titanium.UI.createTab({  
    window:win
});

tabGroup.addTab(tab);  
tabGroup.open();

Ti.UI.createNotification({message:'menuからログインしてください。'}).show();

