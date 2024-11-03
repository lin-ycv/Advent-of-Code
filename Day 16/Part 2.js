/*
As you're about to send the thank you note, something in the MFCSAM's instructions catches your eye. Apparently, it has an outdated retroencabulator, and so the output from the machine isn't exact values - some of them indicate ranges.

In particular, the cats and trees readings indicates that there are greater than that many (due to the unpredictable nuclear decay of cat dander and tree pollen), while the pomeranians and goldfish readings indicate that there are fewer than that many (due to the modial interaction of magnetoreluctance).

What is the number of the real Aunt Sue?
*/

let sa = document.body.textContent.trim().split("\n"),
    r = /(\b[a-z]+)\b|(\d+)/g,
    j = [],
    find = {
        children: 3,
        cats: 7,
        samoyeds: 2,
        pomeranians: 3,
        akitas: 0,
        vizslas: 0,
        goldfish: 5,
        trees: 3,
        cars: 2,
        perfumes: 1
    },
    found = [];

for (let a of sa) {
    let p = a.match(r);
    j[p[0]] = {};
    for (let i = 1; i < p.length - 1; i += 2) {
        j[p[0]][p[i]] = Number(p[i + 1]);
    }
}
j.forEach((a, i) => {
    let f = true;
    Object.keys(a).some(k => {
        switch (k) {
            case 'cats':
            case 'trees':
                if (find[k] >= a[k]) {
                    f = false;
                    return true;
                }
                break;
            case 'pomeranians':
            case 'goldfish':
                if (find[k] <= a[k]) {
                    f = false;
                    return true;
                }
                break;
            default:
                if (find[k] != a[k]) {
                    f = false;
                    return true;
                }
        }
    });
    if (f) found.push(i);
});
console.log(found);