from bisect import bisect_left


def solution(info, query):
    wmap = {'-': 0, 'cpp': 1, 'java': 2, 'python': 3,
            'backend': 1, 'frontend': 2,
            'junior': 1, 'senior': 2,
            'chicken': 1, 'pizza': 2}

    slist = [[] for _ in range(4*3*3*3)]

    for string in info:
        w = string.split()
        arr = (wmap[w[0]] * 3 * 3 * 3,
               wmap[w[1]] * 3 * 3,
               wmap[w[2]] * 3,
               wmap[w[3]])
        score = int(w[4])

        for i in range(1 << 4):
            idx = 0
            for j in range(4):
                if i & (1 << j):
                    idx += arr[j]
            slist[idx].append(score)

    for i in range(4 * 3 * 3 * 3):
        slist[i] = sorted(slist[i])

    answer = []
    for string in query:
        w = string.split()
        idx = wmap[w[0]]*3*3*3 + wmap[w[2]]*3*3 + wmap[w[4]]*3 + wmap[w[6]]
        score = int(w[7])
        answer.append(len(slist[idx]) - bisect_left(slist[idx], score))

    return answer
