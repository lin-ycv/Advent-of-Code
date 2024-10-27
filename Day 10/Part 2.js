/*
Neat, right? You might also enjoy hearing John Conway talking about this sequence (that's Conway of Conway's Game of Life fame).
https://www.youtube.com/watch?v=ea7lJkEhytA

Now, starting again with the digits in your puzzle input, apply this process 50 times. What is the length of the new result?
*/

let s = '1321131112',
    regex = /([0-9])\1*/g;

for (let i = 0; i < 50; i++) {
    s = las(s);
}
console.log(s.length);

/**
 * 
 * @param {string} st 
 */
function las(st) {
    let r = st.match(regex);
    let n = "";
    r.forEach(e => n = n.concat(e.length + e[0]));
    return n;
}