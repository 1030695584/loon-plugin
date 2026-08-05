// 美团外卖开屏活动页自动关闭
// 命中启动阶段的 Gundam 全屏活动页后，返回一个最小页面并调用美团 KNB 关闭当前 WebView。

(() => {
  const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
  <style>html,body{margin:0;width:100%;height:100%;background:#fff;overflow:hidden}</style>
</head>
<body>
<script src="https://s0.meituan.net/bs/knb/v1.7.5:js/knb.js"><\/script>
<script>
(function () {
  var attempts = 0;
  var timer;

  function closeCurrentWebView() {
    attempts += 1;

    try {
      if (window.KNB && typeof window.KNB.closeWebview === 'function') {
        window.KNB.closeWebview({});
      }
    } catch (error) {}

    try {
      if (window.KNB && typeof window.KNB.closeWindow === 'function') {
        window.KNB.closeWindow({});
      }
    } catch (error) {}

    try {
      if (window.DPZeus && typeof window.DPZeus.closeWebview === 'function') {
        window.DPZeus.closeWebview();
      }
    } catch (error) {}

    if (attempts >= 30 && timer) {
      clearInterval(timer);
      try { history.back(); } catch (error) {}
      try { window.close(); } catch (error) {}
    }
  }

  try {
    if (window.KNB && typeof window.KNB.ready === 'function') {
      window.KNB.ready(closeCurrentWebView);
    }
  } catch (error) {}

  closeCurrentWebView();
  timer = setInterval(closeCurrentWebView, 50);
})();
<\/script>
</body>
</html>`;

  $done({
    body: html,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      "Pragma": "no-cache"
    }
  });
})();
