const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "/example.txt");
const inputIng = fs.readFileSync(filePath).toString().split("\n");
const input = inputIng.map((a) => a.substring(0, 6).split(""));

// 틀린 풀이
function solution(input) {
  let answer = 0;

  while (true) {
    answer++;
    let arr = [];

    for (let i = 11; i >= 0; i--) {
      for (let j = 0; j <= 5; j++) {
        if (input[i][j] === ".") continue;
        let tempArr = [];
        let result = count(i, j, input, tempArr);
        // result = result.filter((e, i) => result.indexOf(e) === i);

        if (result.length >= 3) arr = [...arr, ...result, `${i}/${j}`];
        // arr = arr.filter((e, i) => arr.indexOf(e) === i);
      }
    }
    if (!arr.length) break;

    // let t = 11;
    // for (let i = 11; i >= 0; i--) {
    //   for (let j = 0; j <= 5; j++) {
    //     t--;
    //     if (arr.includes(`${i}/${j}`)) {
    //       for (let k = t; k >= 0; k--) {
    //         if (k === 0) input[k][j] = ".";
    //         else {
    //           input[k][j] = input[k - 1][j];
    //         }
    //       }
    //       t++;
    //     }
    //   }
    // }
    console.log(input);
  }

  console.log(answer - 1);
}

function count(row, idx, input, tempArr) {
  if (idx + 1 <= 5 && input[row][idx] === input[row][idx + 1]) {
    tempArr.push(`${row}/${idx + 1}`);
    count(row, idx + 1, input, tempArr);
  }

  if (row - 1 >= 0 && input[row][idx] === input[row - 1][idx]) {
    tempArr.push(`${row - 1}/${idx}`);
    count(row - 1, idx, input, tempArr);
  }

  return tempArr;
}

solution(input);
