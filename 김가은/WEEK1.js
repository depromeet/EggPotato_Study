// 최종 풀이 1
function solution(s) {
  let answer = 0;
  let arr = ["()", "[]", "{}"];

  for (let i = 0; i < s.length; i++) {
    let stack = [];
    for (let x of s) {
      arr.includes(stack.at(-1) + x) ? stack.pop() : stack.push(x);
    }
    if (!stack.length) answer++;
    s = (s + s[0]).slice(1);
  }
  return answer;
}

// 최종 풀이 2
function solution2(s) {
  let answer = 0;

  for (let i = 0; i < s.length; i++) {
    let tempS = s;

    while (/(\(\)|{}|\[\])/g.test(tempS)) {
      tempS = tempS.replace(/(\(\)|{}|\[\])/g, "");
    }
    if (tempS.length === 0) answer++;
    s = (s + s[0]).slice(1);
  }
  return answer;
}
