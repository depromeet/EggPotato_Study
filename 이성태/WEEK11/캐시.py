from collections import deque

cacheSize = int(input())
cities = ["Jeju", "Pangyo", "Seoul", "NewYork", "LA"]


def solution(cacheSize, cities):
    cache = deque(maxlen=cacheSize)
    processing_time = 0

    for city in cities:
        city = city.lower()

        if city in cache:
            cache.remove(city)
            processing_time += 1
        else:
            processing_time += 5

        cache.append(city)

    return processing_time


print(solution(cacheSize, cities))
