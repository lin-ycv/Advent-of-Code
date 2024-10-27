/*
https://adventofcode.com/2015/day/6
--- Day 6: Probably a Fire Hazard ---
Because your neighbors keep defeating you in the holiday house decorating contest year after year, you've decided to deploy one million lights in a 1000x1000 grid.

Furthermore, because you've been especially nice this year, Santa has mailed you instructions on how to display the ideal lighting configuration.

Lights in your grid are numbered from 0 to 999 in each direction; the lights at each corner are at 0,0, 0,999, 999,999, and 999,0. The instructions include whether to turn on, turn off, or toggle various inclusive ranges given as coordinate pairs. Each coordinate pair represents opposite corners of a rectangle, inclusive; a coordinate pair like 0,0 through 2,2 therefore refers to 9 lights in a 3x3 square. The lights all start turned off.

To defeat your neighbors this year, all you have to do is set up your lights by doing the instructions Santa sent you in order.

For example:

turn on 0,0 through 999,999 would turn on (or leave on) every light.
toggle 0,0 through 999,0 would toggle the first line of 1000 lights, turning off the ones that were on, and turning on the ones that were off.
turn off 499,499 through 500,500 would turn off (or leave off) the middle four lights.
After following the instructions, how many lights are lit?
*/

let s = document.body.textContent,
    sa = s.split('\n'),
    a = new Set();

for (let ins of sa) {
    if (!ins) continue;
    let t = ins.includes('off') ? 0 :
        ins.includes('on') ? 1 : 2;
    let from = ins.match(/([0-9]).+?(?= t)/)[0].split(','),
        to = ins.match(/([^h ]*$)/)[0].split(',');
    for (let y = Number(from[1]); y <= Number(to[1]); y++) {
        for (let x = Number(from[0]); x <= Number(to[0]); x++) {
            let p= [x,y].join(',');
            if(t==0)
                a.delete(p);
            else if(t==1)
                a.add(p);
            else{
                if(a.has(p))
                    a.delete(p);
                else
                    a.add(p);
            }
        }
    }
}
console.log(a.size);