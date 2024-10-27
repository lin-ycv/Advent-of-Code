/*
https://adventofcode.com/2015/day/3
--- Day 3: Perfectly Spherical Houses in a Vacuum ---
Santa is delivering presents to an infinite two-dimensional grid of houses.

He begins by delivering a present to the house at his starting location, and then an elf at the North Pole calls him via radio and tells him where to move next. Moves are always exactly one house to the north (^), south (v), east (>), or west (<). After each move, he delivers another present to the house at his new location.

However, the elf back at the north pole has had a little too much eggnog, and so his directions are a little off, and Santa ends up visiting some houses more than once. How many houses receive at least one present?

For example:

> delivers presents to 2 houses: one at the starting location, and one to the east.
^>v< delivers presents to 4 houses in a square, including twice to the house at his starting/ending location.
^v^v^v^v^v delivers a bunch of presents to some very lucky children at only 2 houses.
*/

let s = document.body.textContent,
    p = [0,0],
    v = new Set([p.join(',')]);

for (let i = 0; i < s.length; i++) {
    switch (s[i]) {
        case '>':
            p[0]++;
            break;
        case '<':
            p[0]--;
            break;
        case '^':
            p[1]++;
            break;
        case 'v':
            p[1]--;
            break;
    }
    v.add(p.join(','));
}
console.log(v.size)