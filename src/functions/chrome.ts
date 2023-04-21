export { activateListenerOnTab, getTabs, listenToNewChannel, commandList, testClickChan, currentCommand }

import { writable } from "svelte/store";
import { Command } from "../types/command";

//@ts-ignore
var isChrome = typeof chrome.tabs != "undefined";

const commandList = writable<Command[]>([]);
const currentCommand = writable<Command>(new Command("", "", ""));
var localCurrentCommand: Command

const testClickChan = writable<Object>();

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
            target: { tabId: tabId, allFrames: true },
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
            var isSaveClickChan = port.name == "save-click-channel"
            var isTestClickChan = port.name == "test-click-channel"
            var isConfirmClickChan = port.name == "confirm-click-channel"
            if (isTestClickChan) {
                testClickChan.set(port)
            }

            port.onMessage.addListener(function (msg) {
                if (isSaveClickChan) {
                    localCurrentCommand = new Command("click", msg, "")
                    currentCommand.set(localCurrentCommand)
                } else if (isConfirmClickChan) {
                    commandList.update((prev) => [...prev, localCurrentCommand])
                } else if (isTestClickChan) {
                    port.postMessage(localCurrentCommand.target)
                }
            });
        });
        return true;
    }
    console.log("No Chrome for you");
}
