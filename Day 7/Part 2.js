/*
https://adventofcode.com/2015/day/7
Now, take the signal you got on wire a, override wire b to that signal, and reset the other wires (including wire a). What new signal is ultimately provided to wire a?
*/
// Note js bitwise = 32 bit (& 0xFFFF = 16 bit mask)

let s = document.body.textContent,
    sa = s.split('\n'),
    n = {};

class Node {
    constructor(input, func, output) {
        this.input = input;
        this.func = func;
        this.output = output;
    }
    evaluate() {
        if (this.value) return this.value;
        switch (this.func) {
            case 'NOT':
                this.value = Node.mask(~Node.value(this.input));
                break;
            case "LSHIFT":
                this.value = Node.mask(Node.value(this.input[0]) << Node.value(this.input[1]));
                break;
            case "RSHIFT":
                this.value = Node.mask(Node.value(this.input[0]) >> Node.value(this.input[1]));
                break;
            case "AND":
                this.value = Node.mask(Node.value(this.input[0]) & Node.value(this.input[1]));
                break;
            case "OR":
                this.value = Node.mask(Node.value(this.input[0]) | Node.value(this.input[1]));
                break;
            default:
                this.value = Node.value(this.input);
                break;
        }
        return this.value;
    }
    static value(inV) {
        if (isNaN(inV))
            return n[inV].evaluate();
        else
            return inV;
    }
    static mask(in32) {
        return Number(in32 & 0xFFFF);
    }
}

for (let ins of sa) {
    if (!ins) continue;
    ins = ins.split(' -> ');
    let sp = ins[0].split(" ");
    if (sp.length == 1) // ASSIGN
        n[ins[1]] = new Node(sp[0], null, ins[1]);
    else if (sp.length == 2) // NOT
        n[ins[1]] = new Node(sp[1], sp[0], ins[1]);
    else if (sp.length == 3)
        n[ins[1]] = new Node([sp[0], sp[2]], sp[1], ins[1]);
}
n['b'].value = 16076; // override
let goal = 'a';
console.log(n[goal].evaluate());