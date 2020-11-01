//terminal is simply a character that is not on the left side of a rule
//no rules of the form A -> empty string
//no duplicates of symbol on the left side
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

const grammars_to_test = {
    "grammar_1": {
        'Q': ['XA', 'YB', 'AA', 'BB'],
        'S': ['XA', 'YB', 'AA', 'BB'],
        'X': ['AS'],
        'Y': ['BS'],
        'A': ['a'],
        'B': ['b'],
    },
    "grammar_2": {
        'Q': ['AS', 'BS', 'AA', 'BB'],
        'S': ['AS', 'BS', 'AB', 'BA', 'AA', 'BB'],
        'A': ['a'],
        'B': ['b']
    }
};

function parseToPDA(grammar) {

    let state2 = [];
    let state3 = [];
    let alphabet = [];

    const keys = Object.keys(grammar);

    for (let key of keys) {
        for (let rule of grammar[key]) {
            if (rule.length == 1) {
                alphabet.push(rule);
                state2.push(new Edge(2, [new Input(key, key, rule)]));
                state2.push(new Edge(2, [new Input(rule, rule, null)]));
            } else if (rule.length == 2) {
                let symbols = rule.split('');
                let l = symbols[0];
                let r = symbols[1];
                if (keys.includes(l) && keys.includes(r)) {
                    state2.push(new Edge(3, [new Input(null, key, r)]));
                    state3.push(new Edge(2, [new Input(null, null, l)]));
                }
            } else {
                console.log("error, not in cnf")
                return null;
            }
        }
    }
    const transition_function = [
        [new Edge(1, [new Input(null, null, "$")])],
        [new Edge(2, [new Input(null, null, keys[0])])],
        state2.concat([new Edge(4, [new Input(null, "$", null)])]),
        state3
    ];

    return new Automaton(transition_function, [4], alphabet);
}

let pda = parseToPDA(grammars_to_test.grammar_2);
module.exports = pda;