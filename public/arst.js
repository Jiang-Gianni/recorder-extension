const testBorder = "aquamarine solid 3px";

function getElementByXpath(path) {
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
    console.log(xpath);
    console.log("FOUND ", el);
    var tmpBorder = el.style.border;
    el.style.border = testBorder;
    await new Promise(r => setTimeout(r, 500));
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

// var el = document.getElementById("file-upload")
// var el = document.getElementsByTagName("form").item(0)
let htmlEl;
let textInputEl;
let inputValue = [];
let isInputting = false;

window.addEventListener("mouseover", (e) => htmlEl = e.target)

/**
 * @param {HTMLElement} element The date
 */
function getInputFileElement(element) {
    if (isInputFileElement(element)) {
        console.log("Function ", element);
        return element
    }
    var children = element.children
    for (let index = 0; index < children.length; index++) {
        const child = children[index];
        return getInputFileElement(child)
    }
    return null
}

/**
 * @param {HTMLElement} element The date
 */
function isInputFileElement(element) {
    return element.tagName == "INPUT" && element.getAttribute("type") == "file"
}

window.addEventListener("keydown", (e) => {
    if (e.code == "KeyU") {
        // var inputFile = getInputFileElement(htmlEl);
        // console.log("Input File ", inputFile);
        console.log(
            "Listener ", getInputFileElement(htmlEl)
        );
    }
})


window.addEventListener("keyup", (e) => {
    console.log(e.code);
})