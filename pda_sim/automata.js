//CONSTRUCTS AUTOMATON OBJECT 
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

// automaton that recognizes a^i b^j c^k, where i=j or i=k
function automaton_abc() {
    const edge1 = new Edge(1, [new Input(null, null, "$")]);
    const edge2 = new Edge(1, [new Input('a', null, 'a')]);
    const edge3 = new Edge(2, [new Input(null, null, null)]);
    const edge4 = new Edge(4, [new Input(null, null, null)]);
    const edge5 = new Edge(2, [new Input('b', 'a', null)]);
    const edge6 = new Edge(3, [new Input(null, '$', null)]);
    const edge7 = new Edge(3, [new Input('c', null, null)]);
    const edge8 = new Edge(4, [new Input('b', null, null)]);
    const edge9 = new Edge(5, [new Input(null, null, null)]);
    const edge10 = new Edge(5, [new Input('c', 'a', null)]);
    const edge11 = new Edge(6, [new Input(null, '$', null)]);

    const transFunc_abc = [
        [edge1],
        [edge2, edge3, edge4],
        [edge5, edge6],
        [edge7],
        [edge8, edge9],
        [edge10, edge11]
    ]

    const acceptStates_abc = [3, 6];
    const alphabet_abc = ['a', 'b', 'c'];
    const aut_AnBn = new Automaton(transFunc_abc, acceptStates_abc, alphabet_abc);
    return aut_AnBn;
}


// automaton that recognizes language: a^nb^n 
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

// automaton that recognizes the language: ww^r
function automaton_Palindrome() {
    const edge1 = new Edge(1, [new Input(null, null, "$")]);
    const edge2 = new Edge(1, [new Input("a", null, "a")]);
    const edge3 = new Edge(1, [new Input("b", null, "b")]);
    const edge4 = new Edge(2, [new Input(null, null, null)]);
    const edge5 = new Edge(2, [new Input("a", "a", null)]);
    const edge6 = new Edge(2, [new Input("b", "b", null)]);
    const edge7 = new Edge(3, [new Input(null, "$", null)]);

    const transFunc = [
        [edge1],
        [edge2, edge3, edge4],
        [edge5, edge6, edge7]
    ];

    const acceptStates = [3];
    const alphabet = ["a", "b"];
    const aut_palindrome = new Automaton(transFunc, acceptStates, alphabet);

    return aut_palindrome;
}

module.exports = {
    "AnBn": automaton_AnBn(),
    "palindrome": automaton_Palindrome(),
    "abc": automaton_abc()
};