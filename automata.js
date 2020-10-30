//CONSTRUCTS AUTOMATON OBJECT FROM PARSED GRAMMAR (IN CNF, from web UI)

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
//Automata AnBn
function automaton_AnBn() {
    const edge1 = new Edge(1, [new Input(null, null, "$")]);
    const edge2 = new Edge(1, [new Input("a", null, "a")]);
    const edge3 = new Edge(2, [new Input("b", "a", null)]);
    const edge4 = new Edge(2, [new Input("b", "a", null)]);
    const edge5 = new Edge(3, [new Input(null, "$", null)]);

    const transFunc_AnBn = [
        [edge1],
        [edge2, edge3],
        [edge4, edge5]
    ];

    const acceptStates_AnBn = [3];
    const alphabet_AnBn = ["a", "b"];
    const aut_AnBn = new Automaton(transFunc_AnBn, acceptStates_AnBn, alphabet_AnBn);
    return aut_AnBn;
}

function automaton_Palindrome() {
    const edge2 = new Edge(0, [new Input("a", "e", "a")]);
    const edge3 = new Edge(0, [new Input("b", "e", "b")]);
    const edge4 = new Edge(1, [new Input("e", "e", "e")]);
    const edge5 = new Edge(1, [new Input("a", "a", "e")]);
    const edge6 = new Edge(1, [new Input("b", "b", "e")]);
    const edge7 = new Edge(2, [new Input("e", "$", "e")]);

    const transFunc = [
        [edge2, edge3, edge4],
        [edge5, edge6, edge7]
    ];

    const acceptStates = [2];
    const alphabet = ["a", "b"];
    const aut_palindrome = new Automaton(transFunc, acceptStates, alphabet);
    return aut_palindrome;
}

module.exports = automaton_Palindrome;