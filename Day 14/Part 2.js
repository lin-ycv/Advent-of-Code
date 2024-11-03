/*
Seeing how reindeer move in bursts, Santa decides he's not pleased with the old scoring system.

Instead, at the end of each second, he awards one point to the reindeer currently in the lead. (If there are multiple reindeer tied for the lead, they each get one point.) He keeps the traditional 2503 second time limit, of course, as doing otherwise would be entirely ridiculous.

Given the example reindeer from above, after the first second, Dancer is in the lead and gets one point. He stays in the lead until several seconds into Comet's second burst: after the 140th second, Comet pulls into the lead and gets his first point. Of course, since Dancer had been in the lead for the 139 seconds before that, he has accumulated 139 points by the 140th second.

After the 1000th second, Dancer has accumulated 689 points, while poor Comet, our old champion, only has 312. So, with the new scoring system, Dancer would win (if the race ended at 1000 seconds).

Again given the descriptions of each reindeer (in your puzzle input), after exactly 2503 seconds, how many points does the winning reindeer have?
*/

let sa = document.body.textContent.trim().split("\n"),
     t = 2503,
     r = new Map();

for (let l of sa) {
     let n = l.match(/\b[A-Z][a-z]+\b|\d+/g);
     r.set(n[0], { dist: 0, stress: 0, score: 0, run: true, speed: Number(n[1]), energy: Number(n[2]), rest: Number(n[3]) });
}

let distance = [0, []];
for (let i = 0; i < t; i++) {
     distance[1]=[];
     for (let deer of r) {
          let state = deer[1];
          if (state.run)
               state.dist += Number(state.speed);
          state.stress += 1;
          if (state.stress >= (state.run ? state.energy : state.rest)) {
               state.run = !state.run;
               state.stress = 0;
          }
          if (state.dist > distance[0])
               distance = [state.dist, [deer[0]]];
          else if (state.dist == distance[0])
               distance[1].push(deer[0]);
          r[deer[0]] = state;
     }
     distance[1].forEach(deer => r[deer].score += 1);
}
let max = 0;
r.forEach(d => max = d.score > max ? d.score : max);
console.log(max);