
public class Page87 {

	public static void main(String[] args) {
		int i = 99;
		double squareRoot = Math.sqrt(i);

		System.out.println("the square root of " + i + " is " + squareRoot);
		for (int h = 1; h <= 10; h++) {
			squareRoot = Math.sqrt(h);
			double square = squareRoot * squareRoot;
			System.out.println("the square root of " + h + " is " + squareRoot);
			System.out.println("squaring that yields " + square);
			System.out.println("The final value of sqaure" + " is " + square);

		}
	}

}
