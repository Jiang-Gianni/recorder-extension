/*
    command: click / type / open
    target: xpath
    value: string value in case of type command
*/

export { Command }

class Command {
    constructor(
        public command: string,
        public target: string,
        public value: string,
        public parentPath: string = "",
    ) { }
}