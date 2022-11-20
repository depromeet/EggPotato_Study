function solution(fees, records) {
  let answer = [];
  const END_TIME = toM("23:59");
  const [defaultTime, defaultFee, unitTime, unitFee] = fees;

  const map = {};
  const timeStore = {};

  records.forEach((item) => {
    const [HHMM, key] = item.split(" "); // 3번 인자 값은 사용안한다.
    const time = toM(HHMM);
    if (!map[key]) map[key] = [time];
    else if (map[key].length === 0) map[key].push(time);
    else {
      // 해당 key의 stack이 차있고 또들어왔으니 out이다. 따라서 계산한다.
      const inTime = map[key].pop();
      if (timeStore[key]) timeStore[key] += time - inTime;
      else timeStore[key] = time - inTime;
    }
  });

  Object.keys(map).forEach((key) => {
    if (map[key] && map[key].length > 0) {
      // stack이 차있으면 23:59까지 있다고 판단한다.
      const time = map[key][0];
      if (timeStore[key]) timeStore[key] += END_TIME - time;
      else timeStore[key] = END_TIME - time;
    }
  });

  Object.keys(timeStore)
    .sort((a, b) => a - b)
    .forEach((key) => {
      // 작은 순으로 돌면서 값을 계산시킨다.
      const tmp = timeStore[key] - defaultTime;
      if (tmp <= 0) answer.push(defaultFee);
      else {
        answer.push(defaultFee + Math.ceil(tmp / unitTime) * unitFee);
      }
    });

  return answer;
}

function toM(timeString) {
  const [HH, MM] = timeString.split(":");
  const HHtoM = parseInt(HH) * 60;
  const MMtoM = parseInt(MM);

  return HHtoM + MMtoM;
}

/*
주차장에
주차 요금을 나타내는 정수 배열 fees
자동타의 입/출 내역을 나타내는 문자배열 records
가 주어졌을 경우, 차량 번호가 작은 자동차부터 청구할 주차 요금을 차례대로 정수 배열에 담아서 return 하시오.

출차내역이 없다면 23:59를 출차로 한다.
기본 시간 보다 아래면 기본 요금을 징수한다.

기본시간 180 = 5000원 
10분단위 600원

그럼 배열을 순회하면서 in이 2번일 수 없으니까
stack을 하나 두고 같은 key가 들어오면 Out으로 인지하고 pop한다. pop이후 in-out이라 생각하고 바로 계산한다.
이후 stack들을 돌면서 남은 list가 있는 것은 23:59로 판단 계산하게 한다.

*/
