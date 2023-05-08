export { activateListenerOnTab, getTabs, listenToNewChannel, commandList, tabId, testXpath, findTextXpath, foundTextXpath, clearLog }

import { writable } from "svelte/store";
import { Command } from "../types/command";

//@ts-ignore
var isChrome = typeof chrome.tabs != "undefined";

const tabId = writable<number>();
const commandList = writable<Command[]>([]);
const foundTextXpath = writable<string>()

var testXpath = function (cmd: Object) { }
var findTextXpath = function (text: string) { }
var clearLog = function () { }

async function getTabs() {
    if (isChrome) {
        //@ts-ignore
        return await chrome.tabs.query({ lastFocusedWindow: false, }).then((tabs) => {
            return tabs;
        });
    }
    console.log("No Chrome for you");
}

function activateListenerOnTab(tabId: number) {
    if (isChrome) {
        //@ts-ignore
        chrome.scripting.executeScript({
            target: { tabId: tabId, allFrames: false },
            files: ["activateListener.js"],
        });
        return;
    }
    console.log("No Chrome for you");
}

function listenToNewChannel() {
    if (isChrome) {
        //@ts-ignore
        chrome.runtime.onConnect.addListener(function (port) {
            console.log("Connected to port ", port.name);
            var isFindTextChan = port.name == "find-text-channel"
            var isTestChan = port.name == "test-channel"
            var isInputChan = port.name == "input-channel"
            var isClickChan = port.name == "click-channel"
            var isKeyChan = port.name == "key-channel"
            var isClearLog = port.name == "clear-log-channel"

            if (isTestChan) {
                testXpath = function (cmd: Object) {
                    if (
                        cmd["target"] == "" ||
                        cmd["target"] == null ||
                        cmd["target"] == undefined
                    ) {
                        return;
                    }
                    //@ts-ignore
                    port.postMessage(cmd["target"].trim());
                }
            }

            if (isClearLog) {
                clearLog = function () {
                    //@ts-ignore
                    port.postMessage("a");
                }
            }

            if (isFindTextChan) {
                findTextXpath = function (textToFind: string) {
                    //@ts-ignore
                    port.postMessage(textToFind);
                    //@ts-ignore
                    port.onMessage.addListener((msg) => {
                        foundTextXpath.set(msg)
                    })
                }
            }

            if (isClickChan || isInputChan || isKeyChan) {
                port.onMessage.addListener(function (msg) {
                    var cmd = new Command(msg["command"], msg["target"], msg["value"])
                    commandList.update((prev) => [...prev, cmd])
                    window.scrollTo(0, document.body.scrollHeight);
                });
            }

        });
        return true;
    }
    console.log("No Chrome for you");
}
