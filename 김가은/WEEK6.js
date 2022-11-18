function solution(fees, records) {
  let obj = {};
  let answerObj = {};
  let answerArr = [];

  records.forEach((a, i) => {
    const [time, num, state] = a.split(" ");
    const sliceTime = time.slice(0, 2) * 60 + time.slice(3, 5) * 1;

    if (state === "IN") obj[num] = sliceTime;
    else {
      answerObj[num] =
        sliceTime - obj[num] + (answerObj[num] ? answerObj[num] : 0);
      delete obj[num];
    }
  });

  for (const [key, value] of Object.entries(obj)) {
    answerObj[key] =
      23 * 60 + 59 - value + (answerObj[key] ? answerObj[key] : 0);
  }

  for (let [key, value] of Object.entries(answerObj)) {
    answerArr.push([key * 1, value]);
  }

  answerArr.sort((a, b) => a[0] - b[0]);

  return answerArr.map((a) => {
    const b = Math.max(0, Math.ceil((a[1] - fees[0]) / fees[2]) * fees[3]);
    return fees[1] + b;
  });
}
