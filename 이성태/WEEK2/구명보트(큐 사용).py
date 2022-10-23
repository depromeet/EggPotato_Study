from collections import deque
def solution(people, limit):
    q = deque(sorted(people))
    answer = 0
    
    while q:
        if len(q) == 1:
            answer += 1
            break
        if q[0] + q[-1] <= limit:
            q.popleft()
        q.pop()
        answer += 1
        
    return answer

'''
테스트 1 〉	    통과 (2.06ms, 10.1MB)
테스트 2 〉	    통과 (1.08ms, 10.2MB)
테스트 3 〉	    통과 (1.37ms, 10.1MB)
테스트 4 〉	    통과 (0.92ms, 10.3MB)
테스트 5 〉	    통과 (0.47ms, 10.1MB)
테스트 6 〉	    통과 (0.46ms, 10.1MB)
테스트 7 〉	    통과 (0.67ms, 10.1MB)
테스트 8 〉	    통과 (0.04ms, 10.2MB)
테스트 9 〉	    통과 (0.12ms, 10.4MB)
테스트 10 〉	통과 (1.36ms, 10.4MB)
테스트 11 〉	통과 (0.63ms, 10.1MB)
테스트 12 〉	통과 (1.10ms, 10.1MB)
테스트 13 〉	통과 (1.30ms, 10.1MB)
테스트 14 〉	통과 (1.07ms, 10.2MB)
테스트 15 〉	통과 (0.09ms, 10.2MB)
'''