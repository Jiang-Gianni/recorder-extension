var saveClickChan = chrome.runtime.connect({ name: "save-click-channel" });
var confirmClickChan = chrome.runtime.connect({ name: "confirm-click-channel" });
var testClickChan = chrome.runtime.connect({ name: "test-click-channel" });

testClickChan.onMessage.addListener(function (msg) {
    testXpath(msg)
})

async function testXpath(xpath) {
    let el = getElementByXpath(xpath);
    console.log("XPATH ", xpath);
    console.log("FOUND ", el);
    var tmpBorder = el.style.border;
    el.style.border = "aquamarine solid 3px";
    await new Promise(r => setTimeout(r, 500));
    el.style.border = tmpBorder
}

let htmlEl;
window.addEventListener("mouseover", (e) => htmlEl = e.target)
window.addEventListener("keydown", (e) => {
    if (e.code == "KeyS") {
        saveClickChan.postMessage(getPathTo(htmlEl),)
    } else if (e.code == "KeyC") {
        confirmClickChan.postMessage("")
    } else if (e.code == "KeyT") {
        testClickChan.postMessage("")
    }
})

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
    if (element === document.body) return element.tagName.toLowerCase();
    var ix = 0;
    var siblings = element.parentNode.children;
    for (var i = 0; i < siblings.length; i++) {
        var sibling = siblings[i];
        if (sibling === element)
            return (
                getPathTo(element.parentElement) +
                "/" +
                element.tagName.toLowerCase() +
                "[" +
                (ix + 1) +
                "]"
            );
        if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++;
    }
}