// require("colors");
// const generated_a = require("./parse_cnfg.js");
// const automata = require("./automata.js");
// const tests = require("./tests.js");


function printPDA(pda) {
    console.log("\nPDA:".yellow);
    let trans = pda.transitions;
    let dict = {};
    for (let i = 0; i < trans.length; i++) {
        for (let edge of trans[i]) {
            let edge_str = `(${i},${edge.id})`;
            if (!dict[edge_str]) {
                dict[edge_str] = [];
            }
            for (let input of edge.inputs) {
                let epsilon = String.fromCharCode(603);
                let inp = !input.input ? epsilon : input.input;
                let pop = !input.toPop ? epsilon : input.toPop;
                let push = !input.toPush ? epsilon : input.toPush;
                let input_str = `(${inp}, ${pop} -> ${push})`;
                dict[edge_str].push(input_str);
            }
        }
    }
    for (let key of Object.keys(dict)) {
        console.log(key);
        for (let item of dict[key]) {
            console.log("   " + item);
        }
    }
}


//main simulation function
function simulate(inputString, index, automaton, state, stack) {
    let is_accept = automaton.acceptStates.includes(state);
    let trans = automaton.transitions;

    if (index == inputString.length && is_accept) {
        return true;
    }

    if (index > inputString.length)
        return false;

    if (trans[state]) {
        for (let edge of trans[state]) {
            for (let inp of edge.inputs) {

                let indexCopy = index; //copy index
                let stackCopy = [...stack]; //clone stack

                if (inp.input == inputString[index] || !inp.input) {
                    if (inp.toPop == stack[stack.length - 1] || !inp.toPop) {
                        if (inp.toPop) stackCopy.pop();
                        if (inp.toPush) stackCopy.push(inp.toPush)
                        if (inp.input) indexCopy++;
                        let sim = simulate(inputString, indexCopy, automaton, edge.id, stackCopy)
                        if (sim)
                            return true;
                    }
                }
            }
        }
    }
    return false;
}

// testing procedures
function test_all_automata() {
    for (let name of Object.keys(automata)) {
        test_automaton(name, automata[name]);
    }
}

function test_automaton(name, automaton) {
    console.log(`\ntesting automaton: ${name}`.cyan.bold);
    for (let s of Object.keys(tests[name])) {
        let sim = simulate(s, 0, automaton, 0, []);
        if (sim == tests[name][s]) {
            console.log("CORRECT OUTPUT".green);
        } else {
            console.log("WRONG OUTPUT".red);
        }
    }
}


// test_all_automata();

// console.log("\n\nCFG -> PDA Conversion (generated from CNF CFG)".blue.bold);
// console.log("\nCFG:".yellow);
// console.log(generated_a[0]);
// printPDA(generated_a[1]);
// test_automaton("astar", generated_a[1])

module.exports = simulate;