function solution(queue1, queue2) {
  let answer = 0;

  let record1 = sum(queue1);
  let record2 = sum(queue2);

  let i1 = 0;
  let i2 = 0;

  while (answer <= 600000) {
    if (queue1.lenght >= i1 || queue2.lenght >= i2) return -1;
    if (record1 === record2) return answer;

    if (record1 > record2) {
      const tmp = queue1[i1];
      ++i1;
      record1 -= tmp;
      record2 += tmp;
      queue2.push(tmp);
    } else {
      const tmp = queue2[i2];
      ++i2;
      record2 -= tmp;
      record1 += tmp;
      queue1.push(tmp);
    }

    ++answer;
  }
  return -1;
}

function sum(array) {
  return array.reduce((sum, cur) => sum + cur, 0);
}

//결국 원래의 배열과 같아진다면 그만둔다.
