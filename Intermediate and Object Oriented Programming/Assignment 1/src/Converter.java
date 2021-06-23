import java.util.Scanner;

public class Converter {

	public static void main(String[] args) {
		Scanner s = new Scanner(System.in);
		char temperatureScale = ' ';
		float degree = 0;

		System.out.print(' ');
		temperatureScale = s.next().charAt(0);
		System.out.print(' ');
		degree = s.nextFloat();

		if (temperatureScale == 'f') {
			float celsius = ((degree - 32) * 5) / 9;
			System.out.printf(" %.2f", celsius);
		} else if (temperatureScale == 'k') {
			double celsius = degree - 273.15;
			System.out.printf(" %.2f", celsius);
		}

		s.close();

	}

}
