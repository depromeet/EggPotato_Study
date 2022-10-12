p = {"]": "[", "}": "{", ")": "("}


def is_valid(arr, idx, l):
    stack = []
    for j in range(l):
        i = (j + idx) % l
        val = arr[i]
        if val not in p:
            stack.append(val)
        else:
            if not stack or stack[-1] != p[val]:
                return False
            stack.pop()

    if stack:
        return False
    else:
        return True


def solution(s):
    l = len(s)
    ans = 0

    if len(s) % 2:
        return ans

    for i in range(l):
        ans += is_valid(s, i, l)

    return ans


'''
테스트 1 〉	통과 (10.81ms, 10.2MB)
테스트 2 〉	통과 (5.62ms, 10.2MB)
테스트 3 〉	통과 (5.74ms, 10.3MB)
테스트 4 〉	통과 (8.44ms, 10.3MB)
테스트 5 〉	통과 (31.32ms, 10.2MB)
테스트 6 〉	통과 (11.76ms, 10.4MB)
테스트 7 〉	통과 (16.30ms, 10.3MB)
테스트 8 〉	통과 (22.19ms, 10.3MB)
테스트 9 〉	통과 (48.60ms, 10.4MB)
테스트 10 〉통과 (64.66ms, 10MB)
테스트 11 〉통과 (103.69ms, 10.2MB)
테스트 12 〉통과 (0.00ms, 10.3MB)
테스트 13 〉통과 (0.00ms, 10.2MB)
테스트 14 〉통과 (0.01ms, 10.2MB)
'''
