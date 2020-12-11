const grammar = document.getElementById("rule-set");
const submit_btn = document.getElementById("submit-btn");
const sim_btn = document.getElementById("sim-btn");
const strings = document.getElementById("strings");

const PATH = 'http://localhost:3000';

let pda = false;

function onClickSimBtn() {
    console.log(strings.value)
    let test_strings = strings.value.split("\n").map(s => s.trim());

    console.log(test_strings);
    //if pda exists
    if (pda) {
        //send request to server, with list of strings
        fetch(`${PATH}/api/simulate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(test_strings)
            }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
        // console.log(pda);
    } else {
        console.log("no pda");
    }
}

function onClickSubmitBtn() {
    let result = {}
    let raw_text = grammar.value;
    if (raw_text) {
        let split_lines = raw_text.split("\n");
        let i = 0;
        while (i < split_lines.length) {
            let line = split_lines[i];
            if (line.length == 0) {
                split_lines.splice(i, 1);
            } else {
                let split_LR = line.split('->');
                console.log(split_LR)
                let split_pipes = split_LR[1].split('|');
                let key = split_LR[0].trim();
                if (!result[key]) {
                    result[key] = split_pipes.map(el => el.trim());
                } else {
                    console.log("error!");
                }
                i++;
            }
        }
        console.log(split_lines);
        console.log(result)

        fetch(`${PATH}/api/pda`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(result),
            })
            .then(response => response.json())
            .then(() => pda = true)
            .catch(error => console.error(error));

    }
}

function displayPDA(pda) {
    let content = JSON.stringify(pda);
    console.log(content);

    let para = document.createElement("p");
    // let transitions = document.createTextNode(JSON.stringify(pda.transitions[0][0]["id"]));
    let transitions = pda.transitions;
    for (let i = 0; i < transitions.length; i++) {
        for (let j = 0; j < i.length; j++) {
            console.log(transitions[i][j]["id"]);
        }
    }
    // para.appendChild(transitions);


    // var element = document.getElementById("generated-pda");
    // element.appendChild(para);
}

submit_btn.addEventListener("click", onClickSubmitBtn);
sim_btn.addEventListener("click", onClickSimBtn);