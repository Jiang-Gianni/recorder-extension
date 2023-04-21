var newURL = chrome.runtime.getURL("index.html");

chrome.action.onClicked.addListener((tab) => {
    // chrome.tabs.create({ url: newURL + "?=" + tab.url });
    chrome.windows.create({ url: newURL });
});

function getElementByXpath(path) {
    return document.evaluate(
        path,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
}

function getPathTo(element) {
    if (element.id !== "") return 'id("' + element.id + '")';
    if (element === document.body) return element.tagName;
    var ix = 0;
    var siblings = element.parentNode.children;
    for (var i = 0; i < siblings.length; i++) {
        var sibling = siblings[i];
        if (sibling === element)
            return (
                getPathTo(element.parentElement) +
                "/" +
                element.tagName +
                "[" +
                (ix + 1) +
                "]"
            );
        if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++;
    }
}

async function clickLog(e) {
    let target = e.target;
    let xpath = getPathTo(target);
    let el = getElementByXpath(xpath);
    console.log("XPATH ", xpath);
    console.log("FOUND ", el);
    el.style.border = "aquamarine solid 3px";
}