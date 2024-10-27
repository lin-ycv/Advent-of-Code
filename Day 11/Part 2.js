/*
Santa's password expired again. What's the next one?
*/

let sa = document.body.textContent.trim().split(""),
    a = 'abcdefghjkmnpqrstuvwxyz'.split(""),
    found = 0;

while (true) {
    sa = inc(sa);
    if (check(sa)) {
        found++;
        if (found > 1) break;
    }
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
    for (let i = 0; i < 6; i++) {
        if (a.indexOf(st[i]) + 1 == a.indexOf(st[i + 1]) && a.indexOf(st[i + 1]) + 1 == a.indexOf(st[i + 2])) {
            r1 = true;
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