from collections import deque
import math
# fees = [기본 시간, 기본 요금, 단위 시간, 단위 요금]
# records = [시각, 차량번호, 내역]

# 맵 자료구조를 사용하며 값은 큐를 사용


def solution(fees, records):
    default_time, default_fee, unit_time, unit_fee = fees

    # { 'car_number': event_queue }'
    in_out_history = dict()

    # records를 읽어와 정리
    for record in records:
        in_out, car_number, _ = record.split()

        # 입출차 기록 저장
        if car_number not in in_out_history:
            event_queue = deque([in_out])
            in_out_history[car_number] = event_queue
        else:
            in_out_history[car_number].append(in_out)

    # 출력은 차량번호를 기준으로 오름차순으로 정리해야 하므로
    history_order = sorted(in_out_history.keys())

    result = []
    for car in history_order:
        # 해당 차량의 모든 입출차 기록
        events = in_out_history[car]

        total_fee = default_fee
        total_time = 0

        # 인덱스 기준으로 짝수면 입차, 홀수면 출차
        for event in range(len(events)):
            if event % 2 == 0:
                entry_time = change_to_minutes(events[event])
            else:
                exit_time = change_to_minutes(events[event])
                total_time += exit_time - entry_time

        if len(events) % 2 != 0:
            total_time += (23 * 60 + 59) - entry_time

        # 기본 시간보다 더 오래 주차했다면 추가 요금을 계산
        if total_time > default_time:
            total_fee += calculate_fee(total_time,
                                       default_time, unit_time, unit_fee)

        result.append(total_fee)

    return result

# 추가 요금 계산 함수


def calculate_fee(usage, base_time, per_time, per_fee):
    time_diff = usage - base_time
    extra_time = math.ceil(time_diff / per_time)
    extra_fee = extra_time * per_fee
    return extra_fee

# 계산하기 편하도록 모두 분으로 통일해주는 함수


def change_to_minutes(timestamp):
    hour, minute = map(int, timestamp.split(':'))
    return hour * 60 + minute


if __name__ == '__main__':
    fees = [180, 5000, 10, 600]
    records = ["05:34 5961 IN", "06:00 0000 IN", "06:34 0000 OUT", "07:59 5961 OUT",
               "07:59 0148 IN", "18:59 0000 IN", "19:09 0148 OUT", "22:59 5961 IN", "23:00 5961 OUT"]
    print(solution(fees, records))
