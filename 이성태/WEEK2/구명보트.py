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