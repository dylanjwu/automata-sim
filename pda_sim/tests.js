const all_tests = {
    "palindrome": {
        "a": false,
        "b": false,
        "aa": true,
        "bb": true,
        "aabbaa": true,
        "ababa": false,
        "aba": false,
        "aaabbb": false,
        "aabaabaa": true,
        "abba": true,
        "abababa": false,
        "babbab": true,
    },

    "AnBn": {
        "a": false,
        "b": false,
        "aabb": true,
        "bbaa": false,
        "aabbaa": false,
        "ababa": false,
        "aba": false,
        "aaabbb": true,
        "aabaabaa": false,
        "abba": false,
        "abababa": false,
        "babbab": false,
    },

    "abc": {
        "aabbccccc": true,
        "aaab": false,
        "bbb": true,
        "aaabbccc": true,
        "aabbbcc": true,
        "aaabbbbcccc": false,
    },

    "astar": {
        "aa": true,
        "aaa": true,
        "aaaa": true,
        "baa": false,
        "e": true,
    }
}

module.exports = all_tests;