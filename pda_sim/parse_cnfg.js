/*
Above and Beyond portion of the project:
parse a simple context free grammar in Chomsky normal form
and convert into Automaton object, to be simulated

the simulation algorithm has not been corrected 
to prevent infinite loops from occuring
which, as learned from experience, is frequent with generated automata

I also had plans of making a more general parser
rather than just for Chomsky normal form grammars
which would have been straightforward to do
but without the simulation algorithm corrected, not worth it
*/


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

const grammars = {
    "astar": {
        'S': ['BA', 'e'],
        'A': ['BA', 'B'],
        'B': ['a']
    },
};

function parseToPDA(grammar) {
    let state2 = [];
    let alphabet = [];

    let state3 = [];

    const keys = Object.keys(grammar);

    for (let key of keys) {
        for (let rule of grammar[key]) {
            if (rule.length == 1) {
                alphabet.push(rule);
                let edgeA = new Edge(2, [new Input(null, key, rule)]);
                let edgeB = new Edge(2, [new Input(rule, rule, null)]);
                state2.push(edgeA);
                state2.push(edgeB);
            } else if (rule.length == 2) {
                let symbols = rule.split('');
                let l = symbols[0];
                let r = symbols[1];
                if (keys.includes(l) && keys.includes(r)) {
                    let edgeC = new Edge(3, [new Input(null, key, r)]);
                    let edgeD = new Edge(2, [new Input(null, null, l)]);
                    state2.push(edgeC);
                    state3.push(edgeD);
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

// let pda_astar = parseToPDA(grammars.astar);
// module.exports = [grammars.astar, pda_astar];

module.exports = parseToPDA;