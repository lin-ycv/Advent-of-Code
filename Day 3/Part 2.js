/*
https://adventofcode.com/2015/day/3
The next year, to speed up the process, Santa creates a robot version of himself, Robo-Santa, to deliver presents with him.

Santa and Robo-Santa start at the same location (delivering two presents to the same starting house), then take turns moving based on instructions from the elf, who is eggnoggedly reading from the same script as the previous year.

This year, how many houses receive at least one present?

For example:

^v delivers presents to 3 houses, because Santa goes north, and then Robo-Santa goes south.
^>v< now delivers presents to 3 houses, and Santa and Robo-Santa end up back where they started.
^v^v^v^v^v now delivers presents to 11 houses, with Santa going one direction and Robo-Santa going the other.
*/

let s = document.body.textContent,
    p = [[0,0],[0,0]],
    v = new Set(['0,0']);

for (let i = 0; i < s.length; i++) {
    let sr=i%2;
    switch (s[i]) {
        case '>':
            p[sr][0]++;
            break;
        case '<':
            p[sr][0]--;
            break;
        case '^':
            p[sr][1]++;
            break;
        case 'v':
            p[sr][1]--;
            break;
    }
    v.add(p[sr].join(','));
}
console.log(v.size)