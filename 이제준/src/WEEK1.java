import java.util.*;

class Solution {
    public int solution(String s) {
        int answer = 0;
        String str = s;

        for (int i = 0; i < s.length(); i++) {
            if (checkBracket(str)) {
                answer++;
            }
            str = str.substring(1, s.length()) + str.charAt(0);
        }
        return answer;
    }

    private boolean checkBracket(String str) {
        Stack<Character> s = new Stack<>();
        char[] arr = str.toCharArray();

        for (char c : arr) {
            if (s.isEmpty()) {
                s.push(c);
            } else {
                if (s.peek() == '[' && c == ']' || s.peek() == '(' && c == ')' || s.peek() == '{' && c == '}') {
                    s.pop();
                } else {
                    s.push(c);
                }
            }
        }
        return s.isEmpty();
    }
}