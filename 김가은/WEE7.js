// 최종 풀이
const func = (string) => {
  const str = string.toUpperCase();
  const arr = [];

  for (let i = 0; i < str.length; i++) {
    const a = str[i - 1] + str[i];

    if (/[A-Z][A-Z]/g.test(a)) {
      if (arr.includes(a))
        arr.push(a + " " + arr.filter((e) => e.split(" ")[0] === a).length);
      else arr.push(a);
    }
  }
  return arr;
};

function solution(str1, str2) {
  const arr1 = func(str1);
  const arr2 = func(str2);

  const all = [...new Set([...arr1, ...arr2])];
  const kyo = arr1.length + arr2.length - all.length;

  if (kyo === 0 && all.length === 0) return 65536;
  else if (kyo === 0) return 0;
  else return Math.floor((kyo / all.length) * 65536);
}
