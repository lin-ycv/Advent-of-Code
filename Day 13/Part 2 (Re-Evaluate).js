/*
In all the commotion, you realize that you forgot to seat yourself. At this point, you're pretty apathetic toward the whole thing, and your happiness wouldn't really go up or down regardless of who you sit next to. You assume everyone else would be just as ambivalent about sitting next to you, too.

So, add yourself to the list, and give all happiness relationships that involve you a score of 0.

What is the total change in happiness for the optimal seating arrangement that actually includes yourself?
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
     r[p1]["me"] = 0;
     if (!r[p2]) r[p2] = {};
     if (!r[p2][p1]) r[p2][p1] = n;
     else r[p2][p1] += n;
     if(!r["me"]) r["me"] ={};
     r["me"][p1] = 0;
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