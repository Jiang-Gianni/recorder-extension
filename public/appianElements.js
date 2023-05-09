function paragraphField(element) {
    try {
        var label = element.parentElement.parentElement.previousSibling.firstChild.textContent
        xPath = "//LABEL[contains(text(), '" + label + "')]/parent::DIV/following-sibling::DIV/DIV/TEXTAREA[@role='textbox']"
        return testMatch(xPath, element)
    } catch (error) {
    }
}

function textIntegerDecimalField(element) {
    try {
        var label = element.parentElement.parentElement.previousSibling.firstChild.textContent
        xPath = "//LABEL[contains(text(), '" + label + "')]/parent::DIV/following-sibling::DIV/DIV/INPUT[@type='text']"
        return testMatch(xPath, element)
    } catch (error) {
    }
}

function dateField(element) {
    try {
        var label = element.parentElement.parentElement.parentElement.previousSibling.firstChild.textContent
        xPath = "//LABEL[contains(text(), '" + label + "')]/parent::DIV/following-sibling::DIV/DIV/DIV/INPUT[@type='text']"
        return testMatch(xPath, element)
    } catch (error) {
    }
}

function dateTimeFieldDate(element) {
    try {
        var label = element.parentElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling.firstChild.textContent
        xPath = "//SPAN[contains(text(), '" + label + "')]/parent::DIV/following-sibling::DIV/DIV/DIV[1]/DIV/DIV/INPUT[@type='text']"
        return testMatch(xPath, element)
    } catch (error) {
    }
}

function dateTimeFieldTime(element) {
    try {
        var label = element.parentElement.parentElement.parentElement.parentElement.previousElementSibling.firstChild.textContent
        xPath = "//SPAN[contains(text(), '" + label + "')]/parent::DIV/following-sibling::DIV/DIV/DIV[2]/DIV/INPUT[@type='text']"
        return testMatch(xPath, element)
    } catch (error) {
    }
}

function multipleDropDownField(element) {
    try {
        var label = element.parentElement.parentElement.previousSibling.firstChild.textContent
        xPath = "//SPAN[contains(text(), '" + label + "')]/parent::DIV/following-sibling::DIV/DIV/DIV[@role='combobox']"
        return testMatch(xPath, element)
    } catch (error) {
    }
}

function cardChoiceFieldBarTextJustefied(element) {
    try {
        var option = element.textContent
        var label = element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.previousSibling.firstChild.textContent
        xPath = "//SPAN[contains(text(),'" + label + "')]/parent::DIV/following-sibling::DIV/DIV/DIV/*/DIV/DIV/DIV[2]/DIV/DIV/DIV/DIV[2]/DIV/P/SPAN[contains(text(), '" + option + "')]"
        return testMatch(xPath, element)
    } catch (error) {
    }
}

function cardChoiceFieldBarTextStacked(element) {
    try {
        var option = element.textContent
        var label = element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.textContent
        xPath = "//SPAN[contains(text(),'" + label + "')]/parent::DIV/following-sibling::DIV/DIV/DIV/*/DIV/DIV/DIV/DIV/DIV[2]/DIV/P[contains(text(), '" + option + "')]"
        return testMatch(xPath, element)
    } catch (error) {
    }
}

function cardChoiceFieldBarTile(element) {
    try {
        var option = element.textContent
        var label = element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling.firstChild.textContent
        xPath = "//SPAN[contains(text(),'" + label + "')]/parent::DIV/following-sibling::DIV/DIV/DIV/*/DIV/DIV/DIV[2]/DIV/P/SPAN/SPAN[contains(text(), '" + option + "')]"
        return testMatch(xPath, element)
    } catch (error) {
    }
}

function radioButtonField(element) {
    try {
        var option = element.textContent
        var label = element.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.textContent
        xPath = "//SPAN[contains(text(), '" + label + "')]/parent::DIV/following-sibling::DIV/DIV/*/LABEL[contains(text(), '" + option + "')]"
        return testMatch(xPath, element)
    } catch (error) {
    }
}

function checkboxField(element) {
    try {
        var option = element.textContent
        var label = element.parentElement.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.textContent
        xPath = "//SPAN[contains(text(), '" + label + "')]/parent::DIV/following-sibling::DIV/DIV/DIV/*/LABEL[contains(text(), '" + option + "')]"
        return testMatch(xPath, element)
    } catch (error) {
    }
}

function linkField(element) {
    try {
        var option = element.textContent
        xPath = "//A[contains(text(), '" + option + "')]"
        return testMatch(xPath, element)
    } catch (error) {
    }
}

function recordActionButton(element) {
    try {
        var option = element.children[1].textContent
        xPath = "//BUTTON[./SPAN[contains(text(), '" + option + "')]]"
        return testMatch(xPath, element)
    } catch (error) {
    }
}

function recordActionLink(element) {
    try {
        var option = element.children[1].textContent
        xPath = "//A[./SPAN[contains(text(), '" + option + "')]]"
        return testMatch(xPath, element)
    } catch (error) {
    }
}

function buttonWidget(element) {
    try {
        var option = element.textContent
        xPath = "//BUTTON[contains(text(), '" + option + "')]"
        return testMatch(xPath, element)
    } catch (error) {
    }
}

function exitRecordActionWindow(element) {
    try {
        xPath1 = "//BUTTON[contains(@class, 'RecordActionModalWidget---modal_close_control')]"
        xPath2 = "//I[contains(@class, 'RecordActionModalWidget---fa')]"
        return testMatch(xPath1, element) ?? testMatch(xPath2, element)
    } catch (error) {
    }
}

function testMatch(xPath, element) {
    if (getElementByXpath(xPath) == element) {
        return xPath
    }
}

function getAppianPathTo(element) {
    var appianPaths = [
        paragraphField(element),
        textIntegerDecimalField(element),
        dateField(element),
        dateTimeFieldDate(element),
        dateTimeFieldTime(element),
        multipleDropDownField(element),
        cardChoiceFieldBarTextJustefied(element),
        cardChoiceFieldBarTextStacked(element),
        cardChoiceFieldBarTile(element),
        radioButtonField(element),
        checkboxField(element),
        linkField(element),
        recordActionButton(element),
        recordActionLink(element),
        buttonWidget(element),
        exitRecordActionWindow(element),
    ]
    var filtered = appianPaths.find((el) => el !== undefined)
    return filtered
}