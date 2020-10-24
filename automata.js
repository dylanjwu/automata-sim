//Prototypes for an automata
function Input(input, toPop, toPush) {
    this.input = input;
    this.toPop = toPop;
    this.toPush = toPush;
}

function Edge(id, inputs) {
    this.id = id;
    this.inputs = inputs;
}

function Automaton(transitions, accepts, alphabet) {
    this.transitions = transitions;
    this.acceptStates = accepts;
    this.alphabet = alphabet || [0, 1];
}

//defining example automata, that accepts language: a^nb^n 

//transition function
const edge1 = new Edge(1, [new Input("e", "e", "$")]);
const edge2 = new Edge(1, [new Input("a", "e", "a")]);
const edge3 = new Edge(2, [new Input("b", "a", "e")]);
const edge4 = new Edge(2, [new Input("b", "a", "e")]);
const edge5 = new Edge(3, [new Input("e", "$", "e")]);

const transFunc = [
    [edge1],
    [edge2, edge3],
    [edge4, edge5]
];

//long run, have list of automatas that are exported
const acceptStates = [3];
const alphabet = ["a", "b"];
const aut_AnBn = new Automaton(transFunc, acceptStates, alphabet);
module.exports = aut_AnBn;