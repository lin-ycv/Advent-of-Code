/*
https://adventofcode.com/2015/day/9
--- Day 9: All in a Single Night ---
Every year, Santa manages to deliver all of his presents in a single night.

This year, however, he has some new locations to visit; his elves have provided him the distances between every pair of locations. He can start and end at any two (different) locations he wants, but he must visit each location exactly once. What is the shortest distance he can travel to achieve this?

For example, given the following distances:

London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141
The possible routes are therefore:

Dublin -> London -> Belfast = 982
London -> Dublin -> Belfast = 605
London -> Belfast -> Dublin = 659
Dublin -> Belfast -> London = 659
Belfast -> Dublin -> London = 605
Belfast -> London -> Dublin = 982
The shortest of these is London -> Dublin -> Belfast = 605, and so the answer is 605 in this example.

What is the distance of the shortest route?
*/

let s = document.body.textContent,
    sa = s.split('\n'),
    c = {};

for (let st of sa) {
    if (!st) continue;
    let d = st.split(' ');
    c[d[0]] ??= {};
    c[d[0]][d[2]] = d[4];
    c[d[2]] ??= {};
    c[d[2]][d[0]] = d[4];
}

let shortest = Number.MAX_SAFE_INTEGER,
    cities = Object.keys(c).length,
    i = 0;
for (let start in c) {
    if (i > Math.ceil(cities / 2)) continue;
    solve([start], 0);
    i++;
}
console.log(shortest);

/**
 *
 * @param {[]} state
 * @param {number} distance
 */
function solve(state, distance) {
    let name = state[state.length - 1],
        start = c[name];
    if (state.length == cities) {
        if (distance < shortest) 
            shortest = distance;
        return;
    }
    for (let to in start) {
        if (state.includes(to)) continue;
        let now = [...state];
        now.push(to);
        let newDistance = distance + Number(c[name][to]);
        // console.log(`${state} to ${to}: ${newDistance}`);
        solve(now, newDistance); 
    }
}