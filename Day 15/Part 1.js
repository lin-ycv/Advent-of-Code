/*
https://adventofcode.com/2015/day/15
--- Day 15: Science for Hungry People ---
Today, you set out on the task of perfecting your milk-dunking cookie recipe. All you have to do is find the right balance of ingredients.

Your recipe leaves room for exactly 100 teaspoons of ingredients. You make a list of the remaining ingredients you could use to finish the recipe (your puzzle input) and their properties per teaspoon:

capacity (how well it helps the cookie absorb milk)
durability (how well it keeps the cookie intact when full of milk)
flavor (how tasty it makes the cookie)
texture (how it improves the feel of the cookie)
calories (how many calories it adds to the cookie)
You can only measure ingredients in whole-teaspoon amounts accurately, and you have to be accurate so you can reproduce your results in the future. The total score of a cookie can be found by adding up each of the properties (negative totals become 0) and then multiplying together everything except calories.

For instance, suppose you have these two ingredients:

Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3
Then, choosing to use 44 teaspoons of butterscotch and 56 teaspoons of cinnamon (because the amounts of each ingredient must add up to 100) would result in a cookie with the following properties:

A capacity of 44*-1 + 56*2 = 68
A durability of 44*-2 + 56*3 = 80
A flavor of 44*6 + 56*-2 = 152
A texture of 44*3 + 56*-1 = 76
Multiplying these together (68 * 80 * 152 * 76, ignoring calories for now) results in a total score of 62842880, which happens to be the best score possible given these ingredients. If any properties had produced a negative total, it would have instead become zero, causing the whole score to multiply to zero.

Given the ingredients in your kitchen and their properties, what is the total score of the highest-scoring cookie you can make?
*/

let sa = document.body.textContent.trim().split("\n"),
     ing = [],
     index = 0,
     ts = 100;

for (let i of sa) {
     let r = i.match(/[A-Z][a-z]+|-?\d/g);
     console.log(r);
     ing[index] = [Number(r[1]), Number(r[2]), Number(r[3]), Number(r[4])];
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
     score.forEach(s => ts *= (s > 0 ? s : 0));
     return ts;
}