/*
Theory of Computation (Fall 2020): Application Challenge: "Solving the unsolvable"
Submitted: Dec 3, 2020
Written by Dylan Wu

What it does:
Checks if a PDA has a cycle in it or not, if not: it returns false, else: returns null
Checks if a PDA is a state that loops for all symbols, if it does: returns true, else: checks for cycle (above)

For Above and Beyond:
Traverses PDA for a 'free-path' to an all-looping state (as described above) and from that state (if it exists) to accept state

*/


/* DEFINED PDAs */

//Data structure:
function Input(input, toPop, toPush) {
    this.input = input;
    this.toPop = toPop;
    this.toPush = toPush;
}

function Edge(id, input) {
    this.id = id;
    this.input = input;
}

function Automaton(transitions, accepts, alphabet) {
    this.transitions = transitions;
    this.acceptStates = accepts;
    this.alphabet = alphabet || [0, 1];
}

//accepts all
function automaton_all() {
    const edge1 = new Edge(1, new Input(null, null, "$"));
    const edge2 = new Edge(1, new Input('a', null, null));
    const edge3 = new Edge(1, new Input('b', null, null));
    const edge4 = new Edge(2, new Input(null, '$', null));


    const transFunc = [
        [edge1],
        [edge2, edge3, edge4],
    ];

    const acceptStates = [2];
    const alphabet = ['a', 'b'];
    const aut = new Automaton(transFunc, acceptStates, alphabet);
    return aut;
}

//does not accept all
function automaton_noCycle() {
    const edge1 = new Edge(1, new Input(null, null, "$"));
    const edge2 = new Edge(2, new Input('a', null, null));
    const edge3 = new Edge(2, new Input('b', null, null));
    const edge4 = new Edge(3, new Input(null, '$', null));


    const transFunc = [
        [edge1],
        [edge2, edge3],
        [edge4],
    ];

    const acceptStates = [3];
    const alphabet = ['a', 'b'];
    const aut = new Automaton(transFunc, acceptStates, alphabet);
    return aut;
}

//accepts all
function automaton_freePath() {
    const edge1 = new Edge(1, new Input(null, null, "$"));
    const edge2 = new Edge(2, new Input(null, null, 'a'));
    const edge3 = new Edge(2, new Input('a', null, null));
    const edge4 = new Edge(2, new Input('b', null, null));
    const edge5 = new Edge(3, new Input(null, '$', null));


    const transFunc = [
        [edge1],
        [edge2],
        [edge3, edge4, edge5],
    ];

    const acceptStates = [3];
    const alphabet = ['a', 'b'];
    const aut = new Automaton(transFunc, acceptStates, alphabet);
    return aut;
}

//should accept all, returns null for now
function automaton_freeLoopPath() {
    const edge1 = new Edge(1, new Input(null, null, '$'));

    const edge2 = new Edge(2, new Input(null, null, 'b'));
    const edge3 = new Edge(3, new Input(null, null, null));
    const edge4 = new Edge(2, new Input('a', null, null));

    const edge5 = new Edge(2, new Input(null, null, 'b'));
    const edge6 = new Edge(3, new Input('b', null, null));
    const edge7 = new Edge(2, new Input(null, null, 'a'));

    const edge8 = new Edge(4, new Input(null, '$', null));

    const transFunc = [
        [edge1],
        [edge2, edge5, edge8],
        [edge3, edge6],
        [edge4, edge7]
    ];

    const acceptStates = [4];
    const alphabet = ['a', 'b'];
    const aut = new Automaton(transFunc, acceptStates, alphabet);
    return aut;
}


class AcceptsAll {

    constructor(pda) {
        this.pda = pda;
        this.transitions = pda.transitions;
        this.acceptStates = pda.acceptStates;
        this.alphabet = pda.alphabet;
    }

    hasFreePath(start, target) {
        // check if there is a input-free and pop-free path from start to target in pda
        let queue = this.transitions[start].map(x => x);
        let visited = queue;

        for (let s_edge of queue) {
            if ((!s_edge.input.toPop || s_edge.input.toPop == '$') && !s_edge.input.input) {
                if (s_edge.id == target)
                    return true;
            }
        }

        while (queue.length > 0) {
            let curr = queue.pop(0);
            if (this.transitions[curr.id]) {
                for (let edge of this.transitions[curr.id])
                    if (!visited.includes(edge)) {
                        if (!(edge.input.toPop || edge.input.input)) {
                            if (edge.id == target)
                                return true;
                            queue.push(child);
                            visited.push(child);
                        }
                    }
            }
        }
        return false;
    }

    //if there are no cycles of any kind in the PDA, it must not accept all strings, so, return false
    //returning true does not mean that it accepts all strings, merely that it is still eligable
    hasNoCycles() {
        let queue = this.transitions[0].map(x => x);
        let visited = queue;

        while (queue.length > 0) {
            let curr = queue.pop(0);
            if (this.transitions[curr.id])
                for (let edge of this.transitions[curr.id]) {
                    if (!visited.includes(edge)) {
                        queue.push(edge);
                        visited.push(edge);
                    } else {
                        return false;
                    }
                }
        }
        return true;
    }

    hasLoopState() {
        //check if there is a state that loops through all alphabet symbols
        //returns that state
        let symbol_map = {};

        for (let i = 0; i < this.transitions.length; i++) {
            for (let edge of this.transitions[i]) {
                if (edge.id == i)
                    if (!edge.input.toPop) {
                        let inp = edge.input.input;
                        if (inp && this.alphabet.includes(inp))
                            symbol_map[inp] = edge.id;
                    }
            }
        }

        //check if all symbols have self-loop at same state
        let loop_state = symbol_map[this.alphabet[0]] || null;

        for (let symbol of this.alphabet) {
            if (loop_state !== symbol_map[symbol]) {
                return null;
            }
        }
        return loop_state;
    }

    acceptsAllStrings() {
        let loop_state = this.hasLoopState(this.pda);
        if (loop_state != null) {

            let free_start = this.hasFreePath(0, loop_state);
            let free_end = this.acceptStates.map(i =>
                this.hasFreePath(loop_state, i)).includes(true);

            if (free_start && free_end)
                return true;
        }
        return this.hasNoCycles(this.pda) ? false : null;
    }
}


function main() {

    const pdas = [new AcceptsAll(automaton_all()),
        new AcceptsAll(automaton_freePath()),
        new AcceptsAll(automaton_noCycle()),
        new AcceptsAll(automaton_freeLoopPath())
    ];

    for (let pda of pdas)
        console.log(pda.acceptsAllStrings())

}

main();