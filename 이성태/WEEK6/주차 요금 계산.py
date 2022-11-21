from collections import deque
import math
# fees: 주차 요금을 나타내는 정수 배열
# 기본 시간, 기본 요금, 단위 시간, 단위 요금
# records: 자동차의 입/출차 내역을 나타내는 문자열 배열
# 시각, 차량번호, 내역

# 기본적으로 맵 자료구조를 사용하며 값은
# 큐를 사용하여, 저장 후 뽑아내기


def solution(fees, records):
    default_time, default_fee, unit_time, unit_fee = fees

    # { 'event_car_number': [event_queue, total_fee]}'
    total_fees = dict()

    # records를 읽어와 정리
    for record in records:
        event_time, event_car_number, _ = record.split()
        if event_car_number not in total_fees:
            event_queue = deque([event_time])
            total_fees[event_car_number] = event_queue
        else:
            total_fees[event_car_number].append(event_time)

    result_order = sorted(total_fees.keys())

    result = []
    for car in result_order:
        events = total_fees[car]
        fee = default_fee
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
        if total_time > default_time:
            fee += calculate_fee(total_time, default_time, unit_time, unit_fee)

        result.append(fee)

    return result


def calculate_fee(usage, base_time, per_time, per_fee):
    time_diff = usage - base_time
    extra_time = math.ceil(time_diff / per_time)
    extra_fee = extra_time * per_fee
    return extra_fee


def change_to_minutes(timestamp):
    hour, minute = map(int, timestamp.split(':'))
    return hour * 60 + minute


if __name__ == '__main__':
    fees = [180, 5000, 10, 600]
    records = ["05:34 5961 IN", "06:00 0000 IN", "06:34 0000 OUT", "07:59 5961 OUT",
               "07:59 0148 IN", "18:59 0000 IN", "19:09 0148 OUT", "22:59 5961 IN", "23:00 5961 OUT"]
    print(solution(fees, records))
