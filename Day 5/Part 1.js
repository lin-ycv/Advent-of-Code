/*
https://adventofcode.com/2015/day/5
--- Day 5: Doesn't He Have Intern-Elves For This? ---
Santa needs help figuring out which strings in his text file are naughty or nice.

A nice string is one with all of the following properties:

It contains at least three vowels (aeiou only), like aei, xazegov, or aeiouaeiouaeiou.
It contains at least one letter that appears twice in a row, like xx, abcdde (dd), or aabbccdd (aa, bb, cc, or dd).
It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the other requirements.
For example:

ugknbfddgicrmopn is nice because it has at least three vowels (u...i...o...), a double letter (...dd...), and none of the disallowed substrings.
aaa is nice because it has at least three vowels and a double letter, even though the letters used by different rules overlap.
jchzalrnumimnmhp is naughty because it has no double letter.
haegwjzuvuyypxyu is naughty because it contains the string xy.
dvszwmarrgswjxmb is naughty because it contains only one vowel.
How many strings are nice?
*/
let s = document.body.textContent ,
    sa = s.split('\n'),
    count = 0,
    a = 'aeiou',
    b = ['ab', 'cd', 'pq', 'xy'];

for (let st of sa) {
    let d = false,
        v = a.includes(st[0]) ? 1 : 0,
        bad = false;
    for (let i = 0; i < st.length - 1; i++) {
        let c = String(st[i]) + String(st[i + 1]);
        if (b.includes(c)) {
            bad = true;
            break; // if bad included, no need to check the rest
        }
        if (c[0] == c[1]) d = true;
        if (a.includes(c[1])) v++;
    }
    if (!bad && d && v >= 3) {
        count++; // count only after the full string is check, to ensure bad is not after d and v conditions met
    }
}
console.log(count);
// Sample: 5