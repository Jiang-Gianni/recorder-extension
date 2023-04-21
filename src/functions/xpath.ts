export { getElementByXpath, getPathTo }

function getElementByXpath(path: string) {
    return document.evaluate(
        path,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue as HTMLElement;
}

function getPathTo(element: HTMLElement) {
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
                element.tagName.toLocaleLowerCase() +
                "[" +
                (ix + 1) +
                "]"
            );
        if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++;
    }
}