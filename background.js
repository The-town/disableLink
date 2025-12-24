// メッセージ表示スクリプトを登録してリンクを無効化

messenger.scripting.messageDisplay.registerScripts([{
    id: "disableLink",
    js: ["content.js"],
    css: ["content.css"]
}]);

// message_display_actionのボタンがクリックされたときの処理
messenger.messageDisplayAction.onClicked.addListener(async (tab, info) => {
    try {
        // 現在表示されているメールのcontent scriptにメッセージを送信
        await messenger.tabs.sendMessage(tab.id, {
            action: "enableLinks"
        });
        console.log("Disable Link: リンクを有効化しました");
    } catch (error) {
        console.error("Disable Link: エラーが発生しました", error);
    }
});

console.log("Disable Link extension loaded");

