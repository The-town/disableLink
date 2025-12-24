// メール内のリンクを無効化するスクリプト

(function() {
    'use strict';

    // 無効化されたリンクを追跡するためのMap
    const disabledLinks = new Map();

    // リンクを無効化する関数
    function disableLinks() {
        const links = document.querySelectorAll('a[href]');
        links.forEach(link => {
            // クリックイベントハンドラーを保存
            const clickHandler = function(e) {
                e.preventDefault();
                return false;
            };
            link.addEventListener('click', clickHandler, true); // capture phaseで実行
            disabledLinks.set(link, clickHandler);

            // href属性を無効化（オプション）
            const originalHref = link.getAttribute('href');
            if (originalHref) {
                link.setAttribute('data-original-href', originalHref);
                link.removeAttribute('href');
            }

            // カーソルをポインターから通常に変更
            link.style.cursor = 'default';
        });
    }

    // リンクを有効化する関数
    function enableLinks() {
        // 無効化されたリンクを有効化
        disabledLinks.forEach((clickHandler, link) => {
            // クリックイベントリスナーを削除
            link.removeEventListener('click', clickHandler, true);

            // href属性を復元
            const originalHref = link.getAttribute('data-original-href');
            if (originalHref) {
                link.setAttribute('href', originalHref);
                link.removeAttribute('data-original-href');
            }

            // カーソルをポインターに戻す
            link.style.cursor = 'pointer';
        });

        // まだ無効化されていないリンクも確認（動的に追加されたリンクなど）
        const allLinks = document.querySelectorAll('a[data-original-href]');
        allLinks.forEach(link => {
            const originalHref = link.getAttribute('data-original-href');
            if (originalHref) {
                link.setAttribute('href', originalHref);
                link.removeAttribute('data-original-href');
            }
            link.style.cursor = 'pointer';
        });

        // Mapをクリア
        disabledLinks.clear();

        console.log('Disable Link: リンクが有効化されました');
    }

    // background scriptからのメッセージを受信
    messenger.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "enableLinks") {
            enableLinks();
            sendResponse({ success: true });
        }
    });

    // 初期実行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', disableLinks);
    } else {
        disableLinks();
    }

    console.log('Disable Link: リンクが無効化されました');
})();

