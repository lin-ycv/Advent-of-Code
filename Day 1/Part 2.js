/*
https://adventofcode.com/2015/day/1
Now, given the same instructions, find the position of the first character that causes him to enter the basement (floor -1). The first character in the instructions has position 1, the second character has position 2, and so on.

For example:

) causes him to enter the basement at character position 1.
()()) causes him to enter the basement at character position 5.
What is the position of the character that causes Santa to first enter the basement?
*/

let s = document.body.textContent,
    f = 0;

for (let i = 0; i < s.length; i++) {
    if (s[i] == '(') f++;
    else if (s[i] == ')') f--;
    if (f == -1) {
        console.log(i);
        break;
    }
}