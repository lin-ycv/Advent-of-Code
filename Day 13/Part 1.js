/*
https://adventofcode.com/2015/day/13
--- Day 13: Knights of the Dinner Table ---
In years past, the holiday feast with your family hasn't gone so well. Not everyone gets along! This year, you resolve, will be different. You're going to find the optimal seating arrangement and avoid all those awkward conversations.

You start by writing up a list of everyone invited and the amount their happiness would increase or decrease if they were to find themselves sitting next to each other person. You have a circular table that will be just big enough to fit everyone comfortably, and so each person will have exactly two neighbors.

For example, suppose you have only four attendees planned, and you calculate their potential happiness as follows:

Alice would gain 54 happiness units by sitting next to Bob.
Alice would lose 79 happiness units by sitting next to Carol.
Alice would lose 2 happiness units by sitting next to David.
Bob would gain 83 happiness units by sitting next to Alice.
Bob would lose 7 happiness units by sitting next to Carol.
Bob would lose 63 happiness units by sitting next to David.
Carol would lose 62 happiness units by sitting next to Alice.
Carol would gain 60 happiness units by sitting next to Bob.
Carol would gain 55 happiness units by sitting next to David.
David would gain 46 happiness units by sitting next to Alice.
David would lose 7 happiness units by sitting next to Bob.
David would gain 41 happiness units by sitting next to Carol.
Then, if you seat Alice next to David, Alice would lose 2 happiness units (because David talks so much), but David would gain 46 happiness units (because Alice is such a good listener), for a total change of 44.

If you continue around the table, you could then seat Bob next to Alice (Bob gains 83, Alice gains 54). Finally, seat Carol, who sits next to Bob (Carol gains 60, Bob loses 7) and David (Carol gains 55, David gains 41). The arrangement looks like this:

     +41 +46
+55   David    -2
Carol       Alice
+60    Bob    +54
     -7  +83
After trying every other seating arrangement in this hypothetical scenario, you find that this one is the most optimal, with a total change in happiness of 330.

What is the total change in happiness for the optimal seating arrangement of the actual guest list?
*/

let sa = document.body.textContent.trim().split("\n"),
     r = {};

// Find net happines between each pair
for (let i of sa) {
     let w = i.split(" ");
     let p1 = w[0],
          p2 = w[w.length - 1],
          n = (w[2] == 'gain' ? 1 : -1) * Number(w[3]);
     p2 = p2.substring(0, p2.length - 1);
     if (!r[p1]) r[p1] = {};
     if (!r[p1][p2]) r[p1][p2] = n;
     else r[p1][p2] += n;
     if (!r[p2]) r[p2] = {};
     if (!r[p2][p1]) r[p2][p1] = n;
     else r[p2][p1] += n;
}

let seating = [Object.keys(r)[0]];
console.log(iterate(seating, 0))

/**
 * 
 * @param {Array} state 
 * @param {Number} value 
 * @returns 
 */
function iterate(state, value) {
     let from = state[state.length - 1];
     if (state.length == Object.keys(r).length) {
          // Include net from last to first
          return [state, value += r[from][state[0]]];
     }
     let nState = [...state], nV = value;
     for (let to in r[from]) {
          if (state.includes(to)) continue;
          let tempS = [...state, to],
               tempV = value + r[from][to];
          [tempS, tempV] = iterate([...state, to], tempV);
          if (tempV > nV) {
               nState = tempS;
               nV = tempV;
          }
     }
     return [nState, nV];
}