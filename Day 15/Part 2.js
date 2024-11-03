/*
Your cookie recipe becomes wildly popular! Someone asks if you can make another recipe that has exactly 500 calories per cookie (so they can use it as a meal replacement). Keep the rest of your award-winning process the same (100 teaspoons, same ingredients, same scoring system).

For example, given the ingredients above, if you had instead selected 40 teaspoons of butterscotch and 60 teaspoons of cinnamon (which still adds to 100), the total calorie count would be 40*8 + 60*3 = 500. The total score would go down, though: only 57600000, the best you can do in such trying circumstances.

Given the ingredients in your kitchen and their properties, what is the total score of the highest-scoring cookie you can make with a calorie total of 500?
*/

let sa = document.body.textContent.trim().split("\n"),
     ing = [],
     index = 0,
     ts = 100,
     c = 500;

for (let i of sa) {
     let r = i.match(/[A-Z][a-z]+|-?\d/g);
     console.log(r);
     ing[index] = [Number(r[1]), Number(r[2]), Number(r[3]), Number(r[4]), Number(r[5])];
     index++;
}
let score = combo(ing, 0, ts);
console.log(score);

/**
 * 
 * @param {Array} ings 
 * @param {Number} servings 
*/
function combo(ings, index, servings) {
     if (index == ings.length - 1) {
          let items = JSON.parse(JSON.stringify(ings));
          items[index].push(servings);
          return solve(items);
     }
     let max = 0;
     for (let count = servings; count >= 0; count--) {
          let items = JSON.parse(JSON.stringify(ings));
          items[index].push(count);
          let r = combo(items, index + 1, servings - count);
          if (r > max) max = r;
     }
     return max;
}
function solve(ings) {
     let score = new Array(ings[0].length-1).fill(0);
     for (let i in ings) {
          let count = ings[i][ings[i].length - 1];
          for (let p = 0; p < ings[i].length - 1; p++) {
               score[p] += ings[i][p] * count;
          }
     }
     let ts = 1;
     score[score.length-1] = score[score.length-1]==500? 1:0;
     score.forEach(s => ts *= (s > 0 ? s : 0));
     return ts;
}