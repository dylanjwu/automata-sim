//terminal is simply a character that is not on the left side of a rule
//no rules of the form A -> empty string
//no duplicates of symbol on the left side


const grammars_to_test = {
    "grammar_1": {
        'C': ['AB', 'BC', 'b'],

    },
    "grammar_2": {

    }
};

//convert to PDA:
//for the above grammar rule: A and B are variables, b is a terminal
//(to state 2)[null, pop: C, push: B], (back to state 1)[null, pop: null, push: A]

//(state 1 self loop)[null, pop: C, push: b], [b, pop: b, push: null]

//(to state 3, accept state)[null, pop: $, push: null]