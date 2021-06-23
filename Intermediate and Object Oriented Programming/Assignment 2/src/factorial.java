import java.util.Scanner;

public class factorial {

	public static void main(String[] args) {
		Scanner s = new Scanner(System.in);
		int a = 0;

		System.out.print(' ');
		a = s.nextInt();

		int answer1 = factorial(a);
		System.out.println("The answer is " + answer1);

		s.close();

	}

	static int factorial(int n) {
		int product = 1;
		for (; n > 1; n = n - 1) {
			product = product * n;
		}
		return product;
	}

}