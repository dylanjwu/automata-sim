const assert = require('assert').strict;

function compute(x) {
    let nums = [];
    while (x > 1) {
        nums.push(x);
        if (x % 2 === 0) {
            x /= 2;
            continue;
        }
        x = (3 * x) + 1;
    }
    nums.push(x);
    return nums;
}

function test() {
    for (let i = 100000; i > 2; i--) {
        let res_arr = compute(i);
        let last_el = res_arr[res_arr.length - 1];
        // console.log(last_el)
        assert.deepStrictEqual(last_el, 1, "last element not equal to 1");
    }
}

function main() {
    let input = process.argv.slice(2)[0];
    if (input) {
        let result = compute(input);
        console.log(result);
    }
}

test();