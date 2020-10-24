const colors = require("colors");
const a = require("./automata.js");

console.log(a);
//main simulation function
function simulate(inputString, index, automata, state, stack) {

    let trans = automata.transitions;
    if (index == inputString.length && automata.acceptStates.includes(state)) {
        return true;
    }

    if (trans[state]) {
        for (let edge of trans[state]) {
            for (let inp of edge.inputs) {
                if (inp.input == inputString[index] || inp.input == "e") {

                    let stackCopy = stack;
                    let indexCopy = index;

                    if (inp.toPop == stackCopy[stackCopy.length - 1])
                        stackCopy.pop();
                    else if (inp.toPop != "e") {
                        return false;
                    }

                    if (inp.toPush && inp.toPush != "e")
                        stackCopy.push(inp.toPush);

                    if (inp.input != "e") indexCopy++;
                    return simulate(inputString, indexCopy, automata, edge.id, stackCopy);
                }
            }
        }
    }
    return false;
}

function testAnBn(automata) {
    const expected = {
        "a": false,
        "b": false,
        "ab": true,
        "ba": false,
        "aabb": true,
        "ababa": false,
        "aa": false,
        "aaabbb": true,
        "bbbaaa": false,
    }
    console.log(automata)
    for (let s of Object.keys(expected)) {
        if (simulate(s, 0, automata, 0, []) == expected[s]) {
            console.log("CORRECT OUTPUT".green.bold);
        } else {
            console.log("WRONG OUTPUT".red.bold);
        }
    }
}


testAnBn(a);