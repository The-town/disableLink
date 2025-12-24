// メッセージ表示スクリプトを登録してリンクを無効化

messenger.scripting.messageDisplay.registerScripts([{
    id: "disableLink",
    js: ["content.js"],
    css: ["content.css"]
}]);

console.log("Disable Link extension loaded");

