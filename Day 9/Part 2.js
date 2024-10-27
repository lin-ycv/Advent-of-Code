/*
The next year, just to show off, Santa decides to take the route with the longest distance instead.

He can still start and end at any two (different) locations he wants, and he still must visit each location exactly once.

For example, given the distances above, the longest route would be 982 via (for example) Dublin -> London -> Belfast.

What is the distance of the longest route?
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

let longest = 0,
    cities = Object.keys(c).length,
    i = 0;
for (let start in c) {
    if (i > Math.ceil(cities / 2)) continue;
    solve([start], 0);
    i++;
}
console.log(longest);

function solve(state, distance) {
    let name = state[state.length - 1],
        start = c[name];
    if (state.length == cities) {
        if (distance > longest) 
            longest = distance;
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