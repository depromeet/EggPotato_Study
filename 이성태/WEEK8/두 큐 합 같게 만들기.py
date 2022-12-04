from collections import deque
queue1 = [1, 1]
queue2 = [1, 5]
'''
불능 조건
- (두 리스트의 총 합 // 2) 보다 큰 원소가 리스트에 존재하는 경우 불가함
- 두 큐의 초기 길이는 같기 때문에 위의 조건만 고려하면 됨.
- 총 가능한 순회 횟수는 q 길이의 * 3 - 2
  => 모든 리스트를 n만큼 옮기고 다시 2n만큼 분배하는 최대의 경우가 있어서 총 3n, 리스트에 최소 한 개의 원소가 있어야 하므로 2를 빼줌
필수 조건
- deque 라이브러리 사용할 것.
- 최솟값은 전역 변수로 설정하며, 이 전역변수가 넘어가면 바로 return 하여 시간 복잡도를 줄인다.
'''


def solution(queue1, queue2):
    queue1, queue2 = deque(queue1), deque(queue2)
    min_depth = len(queue1) * 3 - 2
    sum1, sum2 = sum(queue1), sum(queue2)
    depth = 0

    while depth < min_depth:
        try:
            if sum1 > sum2:
                element = queue1.popleft()
                queue2.append(element)
                sum1, sum2 = sum1 - element, sum2 + element
            elif sum1 < sum2:
                element = queue2.popleft()
                queue1.append(element)
                sum1, sum2 = sum1 + element, sum2 - element
            else:
                return depth
        except:
            break
        depth += 1
    else:
        return -1


if __name__ == '__main__':
    print(solution(queue1, queue2))
