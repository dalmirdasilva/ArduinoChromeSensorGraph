chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    bounds: {
      width: 820,
      height: 500,
      left: 100,
      top: 100
    },
    minWidth: 800,
    minHeight: 500
  });
});

chrome.runtime.onSuspend.addListener(function() { 
});

chrome.runtime.onInstalled.addListener(function() { 
});
