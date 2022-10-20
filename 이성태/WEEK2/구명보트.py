def solution(people, limit):
    people.sort()
    answer = 0
    pl, pr = 0, len(people) - 1
    
    while pl <= pr:
        if people[pl] + people[pr] <= limit:
            pl += 1
        pr -= 1
        answer += 1
        
    return answer

'''
테스트 1 〉	    통과 (0.82ms, 10.1MB)
테스트 2 〉	    통과 (1.09ms, 10.2MB)
테스트 3 〉	    통과 (0.62ms, 10.3MB)
테스트 4 〉	    통과 (0.51ms, 10.1MB)
테스트 5 〉	    통과 (0.32ms, 10MB)
테스트 6 〉	    통과 (0.29ms, 10.3MB)
테스트 7 〉	    통과 (0.30ms, 10.1MB)
테스트 8 〉	    통과 (0.03ms, 10.2MB)
테스트 9 〉	    통과 (0.09ms, 10.2MB)
테스트 10 〉	통과 (0.53ms, 10.1MB)
테스트 11 〉	통과 (0.51ms, 10.2MB)
테스트 12 〉	통과 (0.43ms, 10.2MB)
테스트 13 〉	통과 (0.57ms, 10.3MB)
테스트 14 〉	통과 (0.70ms, 10.1MB)
테스트 15 〉	통과 (0.06ms, 10.3MB)
'''