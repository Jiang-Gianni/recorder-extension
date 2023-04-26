export { activateListenerOnTab, getTabs, listenToNewChannel, commandList, testClickChan, currentCommand, tabId }

import { writable } from "svelte/store";
import { Command } from "../types/command";

//@ts-ignore
var isChrome = typeof chrome.tabs != "undefined";

const tabId = writable<number>();
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
            var isSaveChan = port.name == "save-channel"
            var isTestChan = port.name == "test-channel"
            var isConfirmChan = port.name == "confirm-channel"
            var isInputChan = port.name == "input-channel"
            var isClickChan = port.name == "click-channel"
            if (isTestChan) {
                testClickChan.set(port)
            }
            port.onMessage.addListener(function (msg) {
                if (isClickChan || isInputChan) {
                    var cmd = new Command(msg["command"], msg["target"], msg["value"])
                    commandList.update((prev) => [...prev, cmd])
                    window.scrollTo(0, document.body.scrollHeight);
                }
                // if (isSaveChan) {
                //     localCurrentCommand = new Command(msg["command"], msg["target"], msg["value"])
                //     currentCommand.set(localCurrentCommand)
                // } else if (isConfirmChan) {
                //     commandList.update((prev) => [...prev, localCurrentCommand])
                // } else if (isTestChan) {
                //     port.postMessage(localCurrentCommand.target)
                // } else if (isInputChan) {
                //     localCurrentCommand.value = msg
                //     currentCommand.set(localCurrentCommand)
                // }
            });
        });
        return true;
    }
    console.log("No Chrome for you");
}
