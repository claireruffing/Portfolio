import java.util.Scanner;

public class Words {

	public static void main(String[] args) {
		Scanner s = new Scanner(System.in);
		int n = s.nextInt();

		String[] str = new String[n];
		for (int i = 0; i < n; i++) {
			str[i] = s.next(); // word
		}

		int numberOfWords = words(n, str); // number of words without repeats

		System.out.println(numberOfWords);

		s.close();

	}

	private static int words(int n, String[] str) {
		int sumOfWords = 0;
		for (int i = 0; i < n; i++) {
			int[] alphabet = new int[26];
			for (int j = 0; j < str[i].length(); j++) {
				char c = str[i].charAt(j); // first letter(j) in string(i)
				int position = c - 'a'; // position of letter in array
				alphabet[position]++; // incrementing value of 0 by one at the specified position
			}
			boolean repeatFound = false;
			for (int k = 0; k < alphabet.length - 1; k++) {
				if (alphabet[k] > 1) {
					repeatFound = true;
					break; // breaks you out of the for loop
				}
			}
			if (repeatFound == false) { // or if(!repeatFound) {
				sumOfWords++;
			}

		}
		return sumOfWords;
	}
}
