var testChan = chrome.runtime.connect({ name: "test-channel" });
var inputChan = chrome.runtime.connect({ name: "input-channel" });
var clickChan = chrome.runtime.connect({ name: "click-channel" });
var findTextChan = chrome.runtime.connect({ name: "find-text-channel" });
var keyChan = chrome.runtime.connect({ name: "key-channel" });
var clearLogChan = chrome.runtime.connect({ name: "clear-log-channel" });

const testBorder = "aquamarine solid 3px";

const specialKeys = ["Enter", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"];

clearLogChan.onMessage.addListener(function (msg) {
    console.clear()
})

testChan.onMessage.addListener(function (msg) {
    testXpath(msg)
})

findTextChan.onMessage.addListener(function (msg) {
    var first = "//*[contains(text(), '"
    var second = "')]"
    var path = first + msg + second
    var el = getElementByXpath(path)
    console.log("TEXT ELEMENT ", el);
    if (el != null) {
        first = first.replace('*', el.tagName)
        findTextChan.postMessage(first + msg + second)
    } else {
        findTextChan.postMessage("NOT FOUND")
    }
})

function getElementByXpath(path) {
    return window.document.evaluate(
        path,
        window.document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
}

async function testXpath(xpath) {
    let el = getElementByXpath(xpath);
    console.log(xpath);
    console.log("FOUND ", el);
    var tmpBorder = el.style.border;
    el.style.border = testBorder;
    await new Promise(r => setTimeout(r, 100));
    el.style.border = tmpBorder ?? ""
}

function getPathTo(element) {
    if (element.id !== "") return "//" + element.tagName + "[@id='" + element.id + "']";
    if (element === document.body) return "//" + element.tagName.toLowerCase();
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


let htmlEl;
let textInputEl;
let inputValue = [];
let isInputting = false;

window.addEventListener("mouseover", (e) => htmlEl = e.target)

window.addEventListener("mousedown", (e) => {
    // Register only left clicks
    if (e.button != 0) {
        return
    }
    if (isInputting) {
        return
    }
    console.log(e.target);
    var xPath = getAppianPathTo(e.target) ?? getPathTo(e.target)
    clickChan.postMessage(
        { "command": "click", "target": xPath, "value": "" },
    )
})

window.addEventListener("keyup", (e) => {
    if (isInputting) {
        return;
    } else {
        if (specialKeys.includes(e.code)) {
            var xPath = getAppianPathTo(htmlEl) ?? getPathTo(htmlEl)
            keyChan.postMessage({ "command": "key", "target": xPath, "value": e.code },)
        }
    }
})

window.addEventListener("keydown", (e) => {
    if (isInputting) {
        var text = inputValue.join('')
        switch (e.key) {
            case "Control":
                console.log("Registered Text: ", text)
                var xPath = getAppianPathTo(textInputEl) ?? getPathTo(textInputEl)
                inputChan.postMessage(
                    { "command": "type", "target": xPath, "value": text },
                )
                isInputting = false
                inputValue = []
                break;
            case "Shift":
                break;
            case "Backspace":
                inputValue.pop()
                console.log("Text: ", inputValue.join(''));
                break;
            default:
                inputValue.push(e.key);
                console.log("Text: ", inputValue.join(''));
                break;
        }
    } else if (e.key == "Control") {
        console.log("Input Type Text Mode");
        isInputting = true;
        textInputEl = htmlEl;
    }
})
