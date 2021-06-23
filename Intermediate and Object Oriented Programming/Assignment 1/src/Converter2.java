import java.util.Scanner;

public class Converter2 {

	public static void main(String[] args) {
		Scanner s = new Scanner(System.in);
		char temperatureScale = ' ';
		float degree = 0;

		System.out.printf("Are you converting Fahrenheit(f) or Kelvin(k) to Celsius: ");
		temperatureScale = s.next().charAt(0);
		System.out.printf("What is the degree: ");
		degree = s.nextFloat();

		if (temperatureScale == 'f') {
			float celsius = ((degree - 32) * 5) / 9;
			System.out.printf("Conversion to Celsius: %.2f", celsius);
		} else if (temperatureScale == 'k') {
			double celsius = degree - 273.15;
			System.out.printf("Conversion to Celsius: %.2f", celsius);
		} else {
			System.out.println("Invalid temperature scale. You must enter f or k");
		}
		s.close();

	}

}
