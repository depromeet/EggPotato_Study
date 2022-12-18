rows = int(input())
columns = int(input())
queries = [[1, 1, 100, 97]]


def rotate(graph, x1, y1, x2, y2):
    ox, oy = x1 - 1, y1 - 1
    dx, dy = (x2 - x1), (y2 - y1)
    prev_value = graph[x1 - 1][y1 - 1]
    min_value = prev_value
    for _ in range(dy):
        oy += 1
        graph[ox][oy], prev_value = prev_value, graph[ox][oy]
        min_value = min(min_value, graph[ox][oy])
    for _ in range(dx):
        ox += 1
        graph[ox][oy], prev_value = prev_value, graph[ox][oy]
        min_value = min(min_value, graph[ox][oy])
    for _ in range(dy):
        oy -= 1
        graph[ox][oy], prev_value = prev_value, graph[ox][oy]
        min_value = min(min_value, graph[ox][oy])
    for _ in range(dx):
        ox -= 1
        graph[ox][oy], prev_value = prev_value, graph[ox][oy]
        min_value = min(min_value, graph[ox][oy])
    return graph, min_value


def solution(rows, columns, queries):
    matrix = [[(columns * j) + i for i in range(1, columns + 1)]
              for j in range(rows)]
    answer = []
    for query in queries:
        matrix, min_value = rotate(matrix, *query)
        answer.append(min_value)
    return answer


print(solution(rows, columns, queries))
