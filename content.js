// メール内のリンクを無効化するスクリプト

(function() {
    'use strict';

    // リンクを無効化する関数
    function disableLinks() {
        const links = document.querySelectorAll('a[href]');
        links.forEach(link => {
            // クリックイベントを防止
            link.addEventListener('click', function(e) {
                e.preventDefault();
                return false;
            }, true); // capture phaseで実行

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

    // 初期実行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', disableLinks);
    } else {
        disableLinks();
    }

    console.log('Disable Link: リンクが無効化されました');
})();

