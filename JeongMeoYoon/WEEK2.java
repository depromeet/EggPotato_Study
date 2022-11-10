import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;

public class Main {

	static int[] dx = {0,1,0,-1};
	static int[] dy = {1,0,-1,0};
	
	static char[][] map;
	static boolean[][] graph;
	static ArrayList<Point> pArr;
	
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		
		map = new char[14][8];
		
		for(int i = 0; i<14; i++) {
			Arrays.fill(map[i], '.');
		}
		for(int i=1; i<=12; i++) {
			String input = br.readLine().trim();
			for(int j=1; j<=6; j++) {
				map[i][j]=input.charAt(j-1);
			}
		}//INPUT
		boolean run = true;
		int count = 0;
		while(run) {
			graph = new boolean[14][8];
			int tmp = find();
			if(!(tmp>0)) {
				run = false;
			}else {
				count++;
			}
		}
//		print();
		System.out.println(count);
	}
	
	public static int find() {
		ArrayList<Point> tArr = new ArrayList<>();
		for(int i=1; i<=12; i++) {
			for(int j=1; j<=6; j++) {
				if(map[i][j] != '\u0000'&&map[i][j]!='.'&&!graph[i][j]) {
					pArr = new ArrayList<>();
					graph[i][j] = true;
					pArr.add(new Point(i,j));
					dfs(i,j,map[i][j]);
					//여기서 사이즈가 4이상인지를 검사
					//이상이면 팡 
					if(pArr.size()>=4) {
//						System.out.println(pArr);
						for(Point p : pArr) {
							tArr.add(p);
						}
					}
				}
			}
		}//find
		//터트려야되
		if(tArr.size()>0) {
			destroy(tArr);
		}
		return tArr.size();
	}
	public static void destroy(ArrayList<Point> tArr) {
		for(Point p : tArr) {
			map[p.x][p.y] = '.';
		}
		for(int i=1; i<=6; i++) {
			int count = 12;
			for(int j=12; j>=1; j--) {
				if(map[j][i]!='.'&&count!=j) {
					map[count--][i]=map[j][i];
					map[j][i] = '.';
				}else if(map[j][i]!='.'&&count==j) {
					count--;
				}
			}
		}
		
	}
	
	public static void dfs(int x, int y, int v) {
		
		for(int d=0; d<4; d++) {
			int nX = x+dx[d];
			int nY = y+dy[d];
			if(map[nX][nY]==v&&!graph[nX][nY]) {
				graph[nX][nY] = true;
				pArr.add(new Point(nX,nY));
				dfs(nX, nY, v);
			}
		}
	}
	
	public static class Point{
		int x;
		int y;
		public Point(int x, int y){
			this.x = x;
			this.y = y;
		}
		@Override
		public String toString() {
			return "[" + x + ", " + y + "]";
		}
	}
	
	public static void print() {
		for(int i=0; i<=13; i++) {
			for(int j=0; j<=7; j++) {
				System.out.print(map[i][j]);
//				System.out.print(graph[i][j]+"\t");
			}
			System.out.println();
		}
	}//print();
}