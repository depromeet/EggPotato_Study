function solution(citations) {
  let answer = 0;

  citations.sort((x, y) => x - y); // 일단 정렬을 진행한다.
  citations.forEach((value, index) => {
    const n = Math.min(citations.length - index, value);
    answer = Math.max(answer, n);
  });
  return answer;
}
