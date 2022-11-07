function solution(info, edges) {
  let answer = 0;

  // tree라고 볼 수없지만 뭐라고 쓸지 애매해서 tree
  const tree = edges.reduce((arg, cur) => {
    if (!arg[cur[0]]) arg[cur[0]] = [cur[1]];
    else arg[cur[0]].push(cur[1]);
    return arg;
  }, {});

  answer = dfs(0, 1, 0, [], tree, info);

  return answer;
}

/**
 * @link 프로그래머스/learn/courses/30/lessons/92343
 * @param {number} id
 * @param {number} s sheep count
 * @param {number} w wolf count
 * @param {number[]} connects 갈 수 있는 노드 id
 * @param {Object} tree { 'id' : numbers[]}
 * @param {number[]} info 그냥 info 넘겨줌
 * @return {number} max 결국 max값 리턴
 */
function dfs(id, s, w, connects, tree, info) {
  // 방문해야될 이니까 connects보다는 nodesToVisit 정도가 변수명을 적당할 듯...
  const child = tree[id] || [];

  // NOTE: 기존 connects에서 자신을 지우고 자식 노드 array에 넣어서 들을 연결 시켜줍니다.
  const newConnects = connects.filter((_id) => _id !== id).concat([...child]);
  let max = s;

  // NOTE: 갈 수있는 노드들을 순회하면서 갈 수 있는 길을 최대한 깊이들어가도록합니다.
  for (let nextId of newConnects) {
    const isWolf = info[nextId]; // !!info[nextId] 이렇게 했을면 더 좋았을듯

    // NOTE: 양은 늑대보다 많아야 늑대 칸으로 갈 수 있읍니다.
    const isCanGoWolf = isWolf && s > w + 1; // can 자체가 boolean에 대한 것을 담을 수 있음으로 is를 지우고 canGoWolf 가 더 적당할듯합니다.
    let count = s;

    if (isWolf && isCanGoWolf) {
      //isCanGoWolf 만써도될텐데 코드...내 코드지만 킹받네요
      count = dfs(nextId, s, w + 1, newConnects, tree, info);
    }
    if (!isWolf) {
      count = dfs(nextId, s + 1, w, newConnects, tree, info);
    }

    max = Math.max(count, max);
  }

  return max;
}
