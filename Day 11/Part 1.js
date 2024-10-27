/*
https://adventofcode.com/2015/day/11
--- Day 11: Corporate Policy ---
Santa's previous password expired, and he needs help choosing a new one.

To help him remember his new password after the old one expires, Santa has devised a method of coming up with a password based on the previous one. Corporate policy dictates that passwords must be exactly eight lowercase letters (for security reasons), so he finds his new password by incrementing his old password string repeatedly until it is valid.

Incrementing is just like counting with numbers: xx, xy, xz, ya, yb, and so on. Increase the rightmost letter one step; if it was z, it wraps around to a, and repeat with the next letter to the left until one doesn't wrap around.

Unfortunately for Santa, a new Security-Elf recently started, and he has imposed some additional password requirements:

Passwords must include one increasing straight of at least three letters, like abc, bcd, cde, and so on, up to xyz. They cannot skip letters; abd doesn't count.
Passwords may not contain the letters i, o, or l, as these letters can be mistaken for other characters and are therefore confusing.
Passwords must contain at least two different, non-overlapping pairs of letters, like aa, bb, or zz.
For example:

hijklmmn meets the first requirement (because it contains the straight hij) but fails the second requirement requirement (because it contains i and l).
abbceffg meets the third requirement (because it repeats bb and ff) but fails the first requirement.
abbcegjk fails the third requirement, because it only has one double letter (bb).
The next password after abcdefgh is abcdffaa.
The next password after ghijklmn is ghjaabcc, because you eventually skip all the passwords that start with ghi..., since i is not allowed.
Given Santa's current password (your puzzle input), what should his next password be?
*/

let sa = document.body.textContent.trim().split(""),
    a = 'abcdefghjkmnpqrstuvwxyz'.split("");

while(true){
    sa = inc(sa);
    if(check(sa)) break;
}
console.log(sa.join(""));

function inc(st) {
    let carry = false;
    let p = a.indexOf(st[7]);
    p++; p >= a.length ? p = 0 : p;
    carry = p == 0;
    st[7] = a[p];
    for (let i = 6; i >= 0; i--) {
        if (carry) {
            let p = a.indexOf(st[i]);
            p++; p >= a.length ? p = 0 : p;
            carry = p == 0;
            st[i] = a[p];
        }
    }
    return st;
}
function check(st) {
    let rd = /([a-z])\1/g, r1 = false, r3 = false;
    for(let i = 0; i<6;i++){
        if(a.indexOf(st[i])+1==a.indexOf(st[i+1]) && a.indexOf(st[i+1])+1==a.indexOf(st[i+2])){
            r1=true;
            break;
        } 
    }
    let r = st.join("").match(rd);
    if (r?.length >= 2) {
        let r3s = new Set();
        r.forEach(e => r3s.add(e[0]));
        r3 = r3s.size >= 2;
    }
    return (r1 && r3);
}