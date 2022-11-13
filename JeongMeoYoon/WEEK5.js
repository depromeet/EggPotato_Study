function solution(n, paths, gates, summits) {
  let answer = [];
  let intensity = Number.MAX_SAFE_INTEGER;
  let minList = [];

  const graph = new Array(n + 1)
    .fill(null)
    .map(() => new Array(n + 1).fill(-1));
  const gateG = new Array(n + 1).fill(false);
  const summitG = new Array(n + 1).fill(false);

  paths.forEach((item) => {
    const [a, b, value] = item;
    graph[a][b] = value;
    graph[b][a] = value;
  });

  const pq = new PQ();
  // 처음에는 모든 출구에서 시작을 한다.
  gates.forEach((a) => {
    gateG[a] = true;
    graph[a].forEach((b, index) => {
      if (b > 0) {
        pq.enQ({ current: index, gate: a, visited: [index], max: b });
      }
    });
  });

  summits.forEach((a) => {
    summitG[a] = true;
  });

  while (pq.list.length !== 0) {
    // 봉우리에 도착하는 순간 => visited배열을 초기화한다.
    // 조건은
    // 가장 최소가 되는 값을 구하고 그이상의 값은 시도하지않는다.
    // 출구에서 출구로는 가지 않는다.
    // 봉우리에서 봉우리로는 가지 않는다.
    // 봉우리에서 다른 출구로는 가지 않는다.
    const item = pq.deQ();

    if (item.max > intensity) continue; //한번돌았는데 그보단 큰 정점은 안간다.
    if (intensity === item.max && minList.includes(item.summit)) continue; // 이미 최소로 도착한 정점들의 가지는 실행할 필요없음
    if (item.summit && item.current === item.gate) {
      if (intensity === item.max) minList.push(Number(item.summit));
      else minList = [Number(item.summit)];
      intensity = item.max;
    }
    if (summitG[item.current]) {
      item.visited = [];
      item.summit = item.current;
    }
    graph[item.current].forEach((w, index) => {
      if (
        w > 0 &&
        (!summitG[index] || !item.summit) &&
        (!gateG[index] || item.gate === index) &&
        !item.visited.includes(index)
      ) {
        pq.enQ({
          ...item,
          current: index,
          visited: [...item.visited, index],
          max: Math.max(w, item.max),
        });
      }
    });
  }

  answer = [Math.min(...minList), intensity];

  return answer;
}

class PQ {
  constructor() {
    this.list = [];
  }

  enQ(item) {
    /**
            current,
            gate,
            summit,
            visited,
            max
        */
    this.list.push(item);
  }
  deQ() {
    const item = this.list.reduce(
      (acg, item, index) => {
        if (acg?.max > item.max) return { ...item, index };
        else if (acg?.max === item.max && acg?.summit > item?.summit)
          return { ...item, index };
        else return acg;
      },
      { max: Number.MAX_SAFE_INTEGER }
    );

    this.list.splice(item.index, 1);

    delete item.index;
    return item;
  }
}

// graph를 만들고
// PQ를 구현보고
// Q의 원소로는
// 시작점, visited배열, 봉우리, maxValue
// 봉우리에 도착하는 순간 => visited배열을 초기화한다.
// 조건은
// 가장 최소가 되는 값을 구하고 그이상의 값은 시도하지않는다.
// 출구에서 출구로는 가지 않는다.
// 봉우리에서 봉우리로는 가지 않는다.
// 봉우리에서 다른 출구로는 가지 않는다.

/**
    n개의 지ㅁ
    1 ~ n까지 번호 잇음
    출입구 쉼터 산봉우리임
    양방향 통행 가능
    
    출입구에서 시작 산봉우리 중 한 곳만을 방문 다시 원래 출입구로 돌아오는 등산코스를 짜야된다.
    시작 -> 봉우리 -> 시작으로 오는 길
    
    // Req
    n - 지점수
    paths - 등산정보 2차원 배열
    gates - 출입구
    summites - 산봉우리
    
    
    // res
    *intensity - 휴시없이 이동해야되는 최대 시간
    intensity가 최소가 되는 산봉우리 번호와 intensity의 최솟값을 반환하라
    [봉우리, intensity]
    
    봉우리가 여러개라면 가장 번호가 가장 낮은 등산코스를 선택하시오.
*/
