from collections import deque

p = {"]": "[", "}": "{", ")": "("}


def is_valid(arr):
    stack = []
    for i in arr:
        if i not in p:
            stack.append(i)
        else:
            if not stack or stack[-1] != p[i]:
                return False
            stack.pop()

    if stack:
        return False
    else:
        return True


def solution(s):
    s = deque(s)  # vp: valid parentheses
    ans = 0

    if len(s) % 2:
        return ans

    for _ in range(len(s)):
        ans += is_valid(s)
        s.append(s.popleft())

    return ans


'''
테스트 1 〉	통과 (6.36ms, 10.2MB)
테스트 2 〉	통과 (3.34ms, 10.3MB)
테스트 3 〉	통과 (3.34ms, 10.4MB)
테스트 4 〉	통과 (8.80ms, 10.3MB)
테스트 5 〉	통과 (17.52ms, 10.3MB)
테스트 6 〉	통과 (6.92ms, 10.3MB)
테스트 7 〉	통과 (10.22ms, 10.3MB)
테스트 8 〉	통과 (13.15ms, 10.3MB)
테스트 9 〉	통과 (28.95ms, 10.3MB)
테스트 10 〉통과 (39.10ms, 10.2MB)
테스트 11 〉통과 (61.41ms, 10.2MB)
테스트 12 〉통과 (0.00ms, 10.4MB)
테스트 13 〉통과 (0.00ms, 10.3MB)
테스트 14 〉통과 (0.01ms, 10.2MB)
'''
