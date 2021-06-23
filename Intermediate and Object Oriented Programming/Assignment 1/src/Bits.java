import java.util.Scanner;

public class Bits {

	public static void main(String[] args) {
		Scanner s = new Scanner(System.in);
		int N = 1;

		System.out.print(" ");
		N = s.nextInt();

		if (N <= 0) {
			System.out.print("Illegal Input");
		}

		else {
			int divisionResult = (N / 2);
			int count = 1;
			while (divisionResult >= 1) {
				divisionResult = divisionResult / 2;
				count++;
			}
			System.out.print(count);
		}

		s.close();
	}
}
