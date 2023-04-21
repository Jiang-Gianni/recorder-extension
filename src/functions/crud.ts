import type { Command } from "../types/command";

export { readFile, createXpathUrl }

function createXpathUrl(commandList: Command[]) {
    const blob = new Blob(
        [
            JSON.stringify(
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
        ],
        {
            type: "application/json"
        }
    );
    return URL.createObjectURL(blob)
}

async function readFile(url: string) {
    var result = await fetch(url).then((r) => {
        return r.text();
    });
    return result;
}
