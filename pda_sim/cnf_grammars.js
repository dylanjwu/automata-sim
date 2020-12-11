const grammars_to_test = {
    "grammar_2": {
        'Q': ['AS', 'BS', 'AA', 'BB'],
        'S': ['AS', 'BS', 'AB', 'BA', 'AA', 'BB'],
        'A': ['a'],
        'B': ['b']
    },
    "AnBn": {
        'S': ['BC', 'DC'],
        'A': ['BC', 'C'],
        'C': ['b'],
        'B': ['DA'],
        'D': ['a']
    },
    "astar": {
        'S': ['BA', 'e'],
        'A': ['BA', 'B'],
        'B': ['a']
    },
    "fromBook": {
        'S': ['AX', 'UB', 'a', 'YA', 'AY'],
        'Y': ['AX', 'UB', 'a', 'YA', 'AY'],
        'A': ['b', 'AX', 'UB', 'a', 'YA', 'AY'],
        'X': ['YA'],
        'U': ['a'],
        'B': ['b']
    },
    "palindrome": {
        'S': ['XA', 'YB', 'AA', 'BB'],
        'T': ['XA', 'YB', 'AA', 'BB'],
        'X': ['AT'],
        'Y': ['BT'],
        'A': ['a'],
        'B': ['b']
    },
    "dummy": {
        'S': ['AA', 'a'],
        'A': ['BB', 'a'],
        'B': ['a'],
    }
};