// 최종 풀이
function solution(queue1, queue2) {
  let num = 0;
  let p1 = 0;
  let p2 = queue1.length;

  const leng = queue1.length * 3;
  const sumArr = [...queue1, ...queue2];

  let sum1 = queue1.reduce((p, c) => p + c);
  let sum2 = queue2.reduce((p, c) => p + c);

  for (let i = 0; i < leng; i++) {
    if (sum1 === 0 || sum2 === 0) return -1;

    if (sum1 > sum2) {
      sum2 += sumArr[p1];
      sum1 -= sumArr[p1];
      p1 = p1 + 1 > 0 ? (p1 + 1) % sumArr.length : sumArr.length - (p1 + 1);
      num++;
    } else if (sum1 < sum2) {
      sum1 += sumArr[p2];
      sum2 -= sumArr[p2];
      p2 = p2 + 1 > 0 ? (p2 + 1) % sumArr.length : sumArr.length - (p2 + 1);
      num++;
    } else return num;
  }
  return -1;
}

// 실패한 풀이 (queue 사용)
function solution(queue1, queue2) {
  let num = 0;
  const leng = queue1.length * 3;

  let sum1 = queue1.reduce((p, c) => p + c);
  let sum2 = queue2.reduce((p, c) => p + c);

  for (let i = 0; i < leng; i++) {
    if (sum1 === 0 || sum2 === 0) {
      num = -1;
      break;
    }

    if (sum1 > sum2) {
      sum2 += queue1[0];
      sum1 -= queue1[0];
      queue2.push(queue1.shift());
      num++;
    } else if (sum1 < sum2) {
      sum1 += queue2[0];
      sum2 -= queue2[0];
      queue1.push(queue2.shift());
      num++;
    } else break;
  }
  return num;
}
