import java.util.Scanner;

public class Ordered3 {

	public static void main(String[] args) {

		Scanner s = new Scanner(System.in);
		int x = 0;
		int y = 0;
		int z = 0;

		System.out.printf(" ", x, y, z);
		x = s.nextInt();
		y = s.nextInt();
		z = s.nextInt();

		if (x > y && y > z) {
			System.out.print("true");
		} else if (x < y && y < z) {
			System.out.print("true");
		} else {
			System.out.print("false");
		}

		s.close();
	}

}
