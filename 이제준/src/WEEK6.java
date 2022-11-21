import java.util.*;

class Solution {

    public Map<String, Integer> temp = new HashMap<>();
    public Map<String, Integer> parkTime;

    public int[] solution(int[] fees, String[] records) {

        // 해시맵 정렬
        Comparator<String> comparator = (o1, o2) -> o1.compareTo(o2);
        parkTime = new TreeMap<>(comparator);

        for (int i = 0; i < records.length; i++) {
            String[] data = records[i].split(" ");
            // 출차등록
            if (data[2].equals("IN")) {
                int time = parsingTime(data[0]);
                temp.put(data[1], time);
                // 시간등록
            } else {
                int end = parsingTime(data[0]);
                int start = temp.get(data[1]);
                parkTime.put(data[1], parkTime.getOrDefault(data[1], 0) + end - start);
                temp.remove(data[1]);
            }
        }
        // 입차시간만 있는것 처리
        for (String car : temp.keySet()) {
            int start = temp.get(car);
            int end = parsingTime("23:59");
            parkTime.put(car, parkTime.getOrDefault(car, 0) + end - start);
        }


        int[] answer = new int[parkTime.size()];
        int idx = 0;
        //주차요금 계산
        for (String car : parkTime.keySet()) {
            int pay = countFee(fees, parkTime.get(car));
            answer[idx++] = pay;
        }
        return answer;
    }

    // 요금계산 함수
    public int countFee(int[] fees, int time) {
        if (time <= fees[0]) {
            return fees[1];
        } else {
            time -= fees[0];
            return fees[1] + ((int) Math.ceil((double) time / fees[2]) * fees[3]);
        }
    }

    // 시간인트반환 함수
    public int parsingTime(String times) {
        String[] time = times.split(":");
        return Integer.parseInt(time[0]) * 60 + Integer.parseInt(time[1]);
    }
}