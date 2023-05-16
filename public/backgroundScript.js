var newURL = chrome.runtime.getURL("index.html");

chrome.action.onClicked.addListener(() => {
    chrome.windows.create({ url: newURL });
});