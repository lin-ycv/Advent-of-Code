/*
https://adventofcode.com/2015/day/5
Realizing the error of his ways, Santa has switched to a better model of determining whether a string is naughty or nice. None of the old rules apply, as they are all clearly ridiculous.

Now, a nice string is one with all of the following properties:

It contains a pair of any two letters that appears at least twice in the string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
It contains at least one letter which repeats with exactly one letter between them, like xyx, abcdefeghi (efe), or even aaa.
For example:

qjhvhtzxzqqjkmpb is nice because is has a pair that appears twice (qj) and a letter that repeats with exactly one letter between them (zxz).
xxyxx is nice because it has a pair that appears twice and a letter that repeats with one between, even though the letters used by each rule overlap.
uurcxstgmygtbstg is naughty because it has a pair (tg) but no repeat with a single letter between them.
ieodomkazucvgmuy is naughty because it has a repeating letter with one between (odo), but no pair that appears twice.
How many strings are nice under these new rules?
*/
let s = document.body.textContent ,
    sa = s.split('\n'),
    count = 0;

let pair = {};
function pairtwice(str) {
    pair = {};
    for (let i = 0; i < str.length - 1; i++) {
        let c = String(str[i]) + String(str[i + 1]);
        if (pair[c] != null && pair[c] != i - 1) {
            return true;
        }
        if (!pair[c]) {
            pair[c] = i;
        }
    }
    return false;
}

function onethree(str) {
    for (let i = 0; i < str.length - 2; i++) {
        if (str[i] == str[i + 2]) {
            return true;
        }
    }
    return false;
}

for (let str of sa) {
    if (pairtwice(str) && onethree(str)) {
        count++;
    }
}
console.log(count);