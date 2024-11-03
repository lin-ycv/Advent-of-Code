/*
Uh oh - the Accounting-Elves have realized that they double-counted everything red.

Ignore any object (and all of its children) which has any property with the value "red". Do this only for objects ({...}), not arrays ([...]).

[1,2,3] still has a sum of 6.
[1,{"c":"red","b":2},3] now has a sum of 4, because the middle object is ignored.
{"d":"red","e":[1,2,3,4],"f":5} now has a sum of 0, because the entire structure is ignored.
[1,"red",5] has a sum of 6, because "red" in an array has no effect.
{"d":["red", 4, 6]} = 10
*/

let j = JSON.parse(document.body.textContent.trim());

console.log(getValues(Object.values(j), false));

function getValues(o) {
    let sum = 0;
    switch (o.constructor) {
        case Array:
            o.forEach(e => {
                sum += getValues(e);
            });
            break;
        case Object:
            if(Object.values(o).some(e=>e=='red')) break;
            sum += getValues(Object.values(o));
            break;
        case Number:
            sum += o;
            break
    }
    return sum;
}