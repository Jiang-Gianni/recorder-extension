// var saveChan = chrome.runtime.connect({ name: "save-channel" });
// var confirmChan = chrome.runtime.connect({ name: "confirm-channel" });
var testChan = chrome.runtime.connect({ name: "test-channel" });
var inputChan = chrome.runtime.connect({ name: "input-channel" });
var clickChan = chrome.runtime.connect({ name: "click-channel" });

testChan.onMessage.addListener(function (msg) {
    testXpath(msg)
})

const testBorder = "aquamarine solid 3px";

function getElementByXpath(path) {
    console.log(document.evaluate(
        path,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ));
    return document.evaluate(
        path,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
}

async function testXpath(xpath) {
    let el = getElementByXpath(xpath);
    console.log("XPATH ", xpath);
    console.log("FOUND ", el);
    var tmpBorder = el.style.border;
    el.style.border = testBorder;
    await new Promise(r => setTimeout(r, 500));
    el.style.border = tmpBorder ?? ""
}

function getPathTo(element) {
    if (element.id !== "") return 'id("' + element.id + '")';
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
    if (isInputting) {
        return
    }
    clickChan.postMessage(
        { "command": "click", "target": getPathTo(e.target), "value": "" },
    )
})
window.addEventListener("keydown", (e) => {
    if (isInputting) {
        var text = inputValue.join('')
        switch (e.key) {
            case "Control":
                console.log("Registered Text: ", text)
                inputChan.postMessage(
                    { "command": "type", "target": getPathTo(textInputEl), "value": text },
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
    } else {
        if (e.key == "Control") {
            console.log("Input Type Text Mode");
            isInputting = true;
            textInputEl = htmlEl;
        } else if (e.code == "KeyU") {
            saveChan.postMessage({ "command": "type", "target": getPathTo(getInputFileElement(htmlEl)), "value": "./text.txt" },)
        }
    }
})


// var el = document.getElementById("file-upload")
var el = document.getElementsByTagName("form").item(0)

/**
 * @param {HTMLElement} element The date
 */
function getInputFileElement(element) {
    if (isInputFileElement(element)) {
        console.log(element);
        return element
    }
    var children = element.children
    for (let index = 0; index < children.length; index++) {
        const child = children[index];
        getInputFileElement(child)
    }
}

/**
 * @param {HTMLElement} element The date
 */
function isInputFileElement(element) {
    return element.tagName == "INPUT" && element.getAttribute("type") == "file"
}


// getInputFileElement(el)