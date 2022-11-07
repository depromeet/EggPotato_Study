const fs = require("fs");
const input = fs.readFileSync("./dev/stdin.txt").toString().split("\n");

const MAX_ROW = 12;
const MAX_COL = 6;

const DR = [-1, 1, 0, 0]; //상 하 좌 우
const DC = [0, 0, -1, 1];

const 뿌요뿌요 = input.map((row) => row.split(""));

let answer = 0;
while (true) {
  const lastAnswer = answer;
  const 뀨 = [];

  let 팡했엉 = false;

  for (let r = 0; r < MAX_ROW; ++r) {
    for (let c = 0; c < MAX_COL; ++c) {
      if (뿌요뿌요[r][c] !== ".") 뀨.push({ r, c });
    }
  }

  const 방문 = new Array(MAX_ROW)
    .fill(null)
    .map(() => new Array(MAX_COL).fill(false));

  while (뀨.length !== 0) {
    const 뿌요 = 뀨.shift();

    if (방문[뿌요.r][뿌요.c]) continue;

    const 뀨뀨 = [뿌요];
    const 연결된뿌요 = [뿌요]; //난 부터 1일이니까~
    방문[뿌요.r][뿌요.c] = true;

    while (뀨뀨.length > 0) {
      const 연결뿌요 = 뀨뀨.shift();

      for (let d = 0; d < 4; ++d) {
        const nr = 연결뿌요.r + DR[d];
        const nc = 연결뿌요.c + DC[d];
        if (
          nr >= MAX_ROW ||
          nr < 0 ||
          nc >= MAX_ROW ||
          nc < 0 ||
          방문[nr][nc] ||
          뿌요뿌요[연결뿌요.r][연결뿌요.c] !== 뿌요뿌요[nr][nc]
        ) {
          continue;
        }
        const 다음 = { r: nr, c: nc };
        방문[nr][nc] = true;
        뀨뀨.unshift(다음);
        연결된뿌요.push(다음);
      }
    }
    if (연결된뿌요.length >= 4) {
      팡(연결된뿌요);
      팡했엉 = true;
    }
  }

  if (팡했엉) {
    내려();
    answer += 1;
  } else {
    break;
  }
}

function 팡(연결된뿌요) {
  연결된뿌요.forEach((뿌요) => {
    뿌요뿌요[뿌요.r][뿌요.c] = "0";
  });
}

function 내려() {
  for (let c = 0; c < MAX_COL; ++c) {
    const 한줄 = [];

    for (let r = 0; r < MAX_ROW; ++r) {
      한줄.push(뿌요뿌요[r][c]);
    }

    const 팡한줄 = 한줄.filter((item) => item !== "0");
    while (팡한줄.length < MAX_ROW) {
      팡한줄.unshift(".");
    }
    for (let r = 0; r < MAX_ROW; ++r) {
      뿌요뿌요[r][c] = 팡한줄[r];
    }
  }
}

console.log(answer);
