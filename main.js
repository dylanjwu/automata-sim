//prototypes for transition function
function Input(input, toPop, toPush) {
    this.input = input;
    this.toPop = toPop;
    this.toPush = toPush;
}

function Edge(id, inputs) {
    this.id = id;
    this.inputs = inputs;
}

//defining example automata, that accepts language: a^nb^n 

//transition function
const edge1 = new Edge(1, [new Input("e", "e", "e")])
const edge2 = new Edge(1, [new Input("a", "e", "a")])
const edge3 = new Edge(2, [new Input("b", "a", "e")])
const edge4 = new Edge(2, [new Input("b", "a", "e")])
const edge5 = new Edge(3, [new Input("e", "e", "e")])

const transFunc = [
    [edge1],
    [edge2, edge3],
    [edge4, edge5]
];

//other information
const acceptStates = [3];
const alphabet = ["a", "b"];
const as_then_bs = {
    transitions: transFunc,
    acceptStates: acceptStates,
    alphabet: alphabet,
}

//main simulation function
function simulate(inputString, index, automata, state, stack) {

    let trans = automata.transitions;
    console.log(stack)
    console.log(trans[state])

    if (index == inputString.length && automata.acceptStates.includes(state)) {
        return true;
    }

    for (let edge of trans[state]) {
        for (let inp of edge.inputs) {
            console.log(inp.input);
            console.log(inputString[index]);

            if (inp.input == inputString[index] || inp.input == "e") {
                let stackCopy = stack;
                let indexCopy = index;

                if (inp.input != "e") {
                    indexCopy++;
                }


                if (inp.toPop == stackCopy[stackCopy.length - 1] && inp.toPop && inp.toPop != "e") {
                    if (stackCopy.length == 0) {
                        return false;
                    }
                    stackCopy.pop();
                }

                if (inp.toPush && inp.toPush != "e")
                    stackCopy.push(inp.toPush);

                return simulate(inputString, indexCopy, automata, edge.id, stackCopy)
            }
        }
    }
    return false;
}

function main() {
    // console.log(as_then_bs);
    // let state = 0;
    // let trans = as_then_bs.transitions;
    // for (let edge of trans[state]) {
    //     for (let input of edge.inputs) {
    //         console.log(input.input);
    //         console.log(input.toPush)
    //     }
    // }
    let sim = simulate("aab", 0, as_then_bs, 0, []);
    console.log(sim);
}

main()