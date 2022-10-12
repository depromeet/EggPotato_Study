// 최종 풀이 1
function solution(s) {
  let answer = 0;
  let arr = ["()", "[]", "{}"];

  for (let i = 0; i < s.length; i++) {
    let stack = []; // 전역에서 선언한 후 for문 돌면서 계속 재할당하는게 나은지 for문 안에서 계속 새로 선언하는게 나은지?
    for (let x of s) {
      arr.includes(stack.at(-1) + x) ? stack.pop() : stack.push(x);
    }
    if (!stack.length) answer++;
    s = (s + s[0]).slice(1);
  }
  return answer;
}

// 최종 풀이 2

// s  = s.replace(/(\(\)|{}|\[\])/g, '');
