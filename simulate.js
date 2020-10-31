const colors = require("colors");
const a = require("./automata.js");
const test = require("./tests.js");

console.log(a);
//main simulation function
function simulate(inputString, index, automata, state, stack) {
    // console.log("length: " + index, "state: " + state, stack);
    let is_accept = automata.acceptStates.includes(state);
    let trans = automata.transitions;

    if (index == inputString.length && is_accept)
        return true;

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
                        if (simulate(inputString, indexCopy, automata, edge.id, stackCopy)) {
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}


function testAnBn(automata, test) {

    console.log(automata)
    for (let s of Object.keys(test)) {
        // const s = "a";
        let sim = simulate(s, 0, automata, 0, []);
        // console.log(sim);
        if (sim == test[s]) {
            console.log("CORRECT OUTPUT".green.bold);
        } else {
            console.log("WRONG OUTPUT".red.bold);
        }
    }
}


testAnBn(a, test);