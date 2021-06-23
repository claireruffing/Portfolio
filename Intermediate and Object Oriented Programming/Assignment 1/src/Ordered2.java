import java.util.Scanner;

public class Ordered2 {

	public static void main(String[] args) {

		Scanner s = new Scanner(System.in);
		int x = 0;
		int y = 0;
		int z = 0;
		boolean order = false;

		System.out.printf("Enter three integers: ", order, x, y, z);
		x = s.nextInt();
		y = s.nextInt();
		z = s.nextInt();

		if (x > y && y > z) {
			order = true;
		} else if (x < y && y < z) {
			order = true;
		}

		System.out.println(order);

		s.close();
	}

}
