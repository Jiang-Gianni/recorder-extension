/*
    command: click / type
    target: xpath
    value: string value in case of type command
*/

export { Command }

class Command {
    constructor(
        public command: string,
        public target: string,
        public value: string
    ) { }
}