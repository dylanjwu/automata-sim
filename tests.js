const expected_palindrome = {
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
}

const expected_anbn = {
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
}

module.exports = expected_palindrome;