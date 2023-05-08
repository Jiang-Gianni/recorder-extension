import type { Command } from "../types/command";

export { readFile, createXpathUrl, generateCmdJson }

function createXpathUrl(commandList: Command[]) {
    const blob = new Blob(
        [
            generateCmdJson(commandList),
        ],
        {
            type: "application/json"
        }
    );
    return URL.createObjectURL(blob)
}

function generateCmdJson(commandList: Command[]) {
    return JSON.stringify(
        commandList.map(
            (cmd) => {
                return {
                    "command": cmd.command,
                    "target": cmd.target,
                    "value": cmd.value
                }
            }
        )
    )
}

async function readFile(url: string) {
    var result = await fetch(url).then((r) => {
        return r.text();
    });
    return result;
}
