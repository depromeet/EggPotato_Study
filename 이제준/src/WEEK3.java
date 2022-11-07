import java.util.*;
class Solution {
    static HashMap<String, List<Integer>> map = new HashMap<>();

    public int[] solution(String[] info, String[] query) {
        int[] answer = new int[query.length];
        for(int i=0; i<info.length; i++) {
            dfs("", info[i].split(" "), 0);
        }

        for(String key :map.keySet()) {
            Collections.sort(map.get(key));
        }

        for(int i=0; i<query.length; i++) {
            String temp[] = query[i].replace(" and ", "").split(" ");
            int score = Integer.parseInt(temp[1]);
            answer[i] = binarySearch(temp[0], score);

        }
        return answer;
    }

    private int binarySearch(String string, int score) {
        if(map.containsKey(string)) {
            List<Integer> list = map.get(string);
            int left = 0;
            int right = list.size()-1;
            if(list.get(right) < score) {
                return 0;
            }

            while(left<right) {
                int mid = (left+right)/2;
                if(list.get(mid) < score) {
                    left = mid+1;
                }
                else{
                    right = mid;
                }
            }
            return list.size() - left;
        }
        return 0;
    }

    private void dfs(String s, String[] info, int depth) {
        if(depth == 4) {
            if(map.containsKey(s) == false) {
                List<Integer> list = new ArrayList<Integer>();
                list.add(Integer.parseInt(info[4]));
                map.put(s, list);
            }
            else {
                map.get(s).add(Integer.parseInt(info[4]));
            }
            return;
        }

        dfs(s+"-", info, depth+1);
        dfs(s+info[depth], info, depth+1);
    }
}