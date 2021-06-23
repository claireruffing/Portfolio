import java.util.Scanner;

public class Series {

	public static void main(String[] args) {
		Scanner s = new Scanner(System.in);
		int a = 0, b = 0;

		a = s.nextInt(); // prints inputs a and b
		b = s.nextInt();

		float answer = addTerms(a, b);
		System.out.printf("%.2f", answer);

		s.close();
	}

	static float power(int k, int j) {
		float result = 1;
		float product = 1;
		for (int i = 0; i < j; i++) { // exponent
			result = result * k;
		}
		for (; j > 1; j--) {
			product = product * j; // factorial
		}
		return (result / product);
	}

	static float addTerms(int w, int n) {
		float sum = 0;
		float[] terms = new float[n];
		terms[0] = 1;
		if (n == 1) {
			return terms[0];
		}
		terms[1] = (float) w;

		for (int i = 2; i < n; i++) {
			terms[i] = power(w, i);
		}
		for (int i = 0; i < terms.length; i++) {
			sum = sum + terms[i]; // adds all terms in array together
		}
		return sum;

	}

}
