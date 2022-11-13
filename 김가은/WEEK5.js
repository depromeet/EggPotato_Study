// 실패한 풀이
function solution(n, paths, gates, summits) {
  let answer = [50000, 200000];

  gates.map((a) => {
    summits.map((b) => {
      let arr = Array.from({ length: n }, (x, i) => (i + 1 === a ? 0 : 200000));
      let order = [a];
      let newPaths = [...paths];
      let tempNum = 0;

      for (let i = 0; i < n; i++) {
        let num = order[tempNum];
        newPaths.map((c, k) => {
          if (c[0] === num) {
            arr[num - 1] = Math.min(
              arr[num - 1],
              Math.max(arr[c[1] - 1], c[2])
            );
            if (!order.includes(c[1])) order.push(c[1]);
          }

          if (c[1] === num) {
            arr[num - 1] = Math.min(
              arr[num - 1],
              Math.max(arr[c[0] - 1], c[2])
            );
            if (!order.includes(c[0])) order.push(c[0]);
          }
        });

        tempNum++;
      }

      let aa = [b, arr[b - 1]];
      if (aa[1] < answer[1]) answer = aa;
      else if (aa[1] === answer[1] && aa[0] < answer[0]) answer = aa;
    });
  });
  return answer;
}
