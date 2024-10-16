chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({
        urls: [
            'http://localhost:3000',
            'http://localhost:8080',
            'http://localhost:5000'
        ]
    });
});

export { };