import math

# 다중 집합을 위해서 dictionary 자료형 사용


def convert_to_dict(string):
    str_dict = dict()
    for i in range(len(string) - 1):
        str_seg = string[i: i + 2]
        if str_seg.isalpha():
            str_dict[str_seg] = str_dict.get(str_seg, 0) + 1

    return str_dict

# 교집합 원소 개수 계산 함수


def intersection(dict1, dict2):
    inter_len = 0

    dict1_keys = dict1.keys()
    for key in dict1_keys:
        if key in dict2:
            inter_len += min(dict1[key], dict2[key])

    return inter_len

# 합집합 원소 개수 계산 함수


def union(dict1, dict2):
    dict1_keys = dict1.keys()
    for key in dict1_keys:
        if key not in dict2:
            dict2[key] = dict1[key]
        else:
            dict2[key] = max(dict2[key], dict1[key])

    return sum(dict2.values())

# 자카드 유사도 계산 함수


def jaccard_similarity(inter_set, union_set):
    if union_set == 0:
        return 65536
    else:
        val = (inter_set / union_set) * 65536
        return math.floor(val)


def solution(str1, str2):
    str1 = str1.lower()
    str2 = str2.lower()

    dict1 = convert_to_dict(str1)
    dict2 = convert_to_dict(str2)

    inter_set = intersection(dict1, dict2)
    union_set = union(dict1, dict2)

    answer = jaccard_similarity(inter_set, union_set)
    return answer


'''
테스트 1 〉     통과 (0.03ms, 10.3MB)
테스트 2 〉     통과 (0.03ms, 10.5MB)
테스트 3 〉     통과 (0.02ms, 10.3MB)
테스트 4 〉     통과 (0.57ms, 10.3MB)
테스트 5 〉     통과 (0.03ms, 10.3MB)
테스트 6 〉     통과 (0.02ms, 10.3MB)
테스트 7 〉     통과 (0.10ms, 10.3MB)
테스트 8 〉     통과 (0.03ms, 10.2MB)
테스트 9 〉     통과 (0.06ms, 10.3MB)
테스트 10 〉    통과 (0.15ms, 10.3MB)
테스트 11 〉    통과 (0.14ms, 10.5MB)
테스트 12 〉    통과 (0.01ms, 10.3MB)
테스트 13 〉    통과 (0.06ms, 10.3MB)
[0.03, 0.03, 0.02, 0.57, 0.03, 0.02, 0.1, 0.03, 0.06, 0.15, 0.14, 0.01, 0.06]
평균 소요시간: 0.096
'''
