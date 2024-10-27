/*
https://adventofcode.com/2015/day/6
You just finish implementing your winning light pattern when you realize you mistranslated Santa's message from Ancient Nordic Elvish.

The light grid you bought actually has individual brightness controls; each light can have a brightness of zero or more. The lights all start at zero.

The phrase turn on actually means that you should increase the brightness of those lights by 1.

The phrase turn off actually means that you should decrease the brightness of those lights by 1, to a minimum of zero.

The phrase toggle actually means that you should increase the brightness of those lights by 2.

What is the total brightness of all lights combined after following Santa's instructions?

For example:

turn on 0,0 through 0,0 would increase the total brightness by 1.
toggle 0,0 through 999,999 would increase the total brightness by 2000000.
*/

let s = document.body.textContent,
    sa = s.split('\n'),
    a = {},
    b = 0;

for (let ins of sa) {
    if (!ins) continue;
    let t = ins.includes('off') ? 0 :
        ins.includes('on') ? 1 : 2;
    let from = ins.match(/([0-9]).+?(?= t)/)[0].split(','),
        to = ins.match(/([^h ]*$)/)[0].split(',');
    for (let y = Number(from[1]); y <= Number(to[1]); y++) {
        for (let x = Number(from[0]); x <= Number(to[0]); x++) {
            let p = [x, y].join(',');
            if (!a[p]) a[p] = 0;
            if (t == 0) {
                a[p]--;
                if (a[p] < 0) a[p] = 0;
            }
            else if (t == 1)
                a[p]++;
            else
                a[p] += 2;
        }
    }
}
Object.values(a).forEach(v => b += v);
console.log(b);