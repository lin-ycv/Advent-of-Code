/*
https://adventofcode.com/2015/day/7
--- Day 7: Some Assembly Required ---
This year, Santa brought little Bobby Tables a set of wires and bitwise logic gates! Unfortunately, little Bobby is a little under the recommended age range, and he needs help assembling the circuit.

Each wire has an identifier (some lowercase letters) and can carry a 16-bit signal (a number from 0 to 65535). A signal is provided to each wire by a gate, another wire, or some specific value. Each wire can only get a signal from one source, but can provide its signal to multiple destinations. A gate provides no signal until all of its inputs have a signal.

The included instructions booklet describes how to connect the parts together: x AND y -> z means to connect wires x and y to an AND gate, and then connect its output to wire z.

For example:

123 -> x means that the signal 123 is provided to wire x.
x AND y -> z means that the bitwise AND of wire x and wire y is provided to wire z.
p LSHIFT 2 -> q means that the value from wire p is left-shifted by 2 and then provided to wire q.
NOT e -> f means that the bitwise complement of the value from wire e is provided to wire f.
Other possible gates include OR (bitwise OR) and RSHIFT (right-shift). If, for some reason, you'd like to emulate the circuit instead, almost all programming languages (for example, C, JavaScript, or Python) provide operators for these gates.

For example, here is a simple circuit:

123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i
After it is run, these are the signals on the wires:

d: 72
e: 507
f: 492
g: 114
h: 65412
i: 65079
x: 123
y: 456
In little Bobby's kit's instructions booklet (provided as your puzzle input), what signal is ultimately provided to wire a?
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
let goal = 'a';
console.log(n[goal].evaluate());