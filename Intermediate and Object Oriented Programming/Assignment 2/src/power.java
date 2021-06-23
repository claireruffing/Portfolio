import java.util.Scanner;

public class power {

	public static void main(String[] args) {
		Scanner s = new Scanner(System.in);
		int a = 0, b = 0;

		System.out.print(' ');
		a = s.nextInt();
		b = s.nextInt();

		float answer2 = power(a, b);
		System.out.printf("The answer is %.2f", answer2);

		// int answer3 = function(d, f);
		// System.out.println("The answer is " + answer3);

		s.close();
	}

	static float power(int w, int j) {
		float result = 1;
		float product = 1;
		for (int i = 0; i < j; i = i + 1) {
			result = result * w;
		}
		for (; j > 1; j = j - 1) {
			product = product * j;
		}
		return (result / product);
	}
	/*
	 * static int function(int d, int f) {
	 * 
	 * }
	 */

	// if(overall == '3') {
	// e = 1 + w + (power(w, 2)/factorial(2)) + (power(w, 3)/factorial(3));
	// }

}
