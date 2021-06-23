import java.util.Scanner;

public class Matrix1 {

	public static void main(String[] args) {
		Scanner s = new Scanner(System.in);
		int m = 0, n = 0;

		m = s.nextInt();
		n = s.nextInt();
		System.out.println(m + " " + n);

		// Matrix
		int[][] matrix = new int[m][n];
		for (int i = 0; i < m; i++) {
			for (int j = 0; j < n; j++) {
				matrix[i][j] = s.nextInt();
			}
		}
		for (int i = 0; i < m; i++) {
			for (int j = 0; j < n; j++) {
				System.out.print(matrix[i][j] + " ");
			}
			System.out.println();
		}

		// Switch command statement
		char command;
		while ((command = s.next().charAt(0)) != 'Q') {
			switch (command) {
			case 'T': {
				int[][] newMatrix = Transpose(matrix, m, n);
				for (int i = 0; i < n; i++) {
					for (int j = 0; j < m; j++) {
						System.out.print(newMatrix[i][j] + " ");
					}
					System.out.println();
				}
				break;
			}
			case 'R': {
				int[] rowProduct = RowMultiply(matrix, m, n);
				for (int i = 0; i < m; i++) {
					System.out.print(rowProduct[i] + " ");
				}
				System.out.println();
				break;
			}
			case 'C': {
				int[] minValue = ColumnMin(matrix, m, n);
				for (int i = 0; i < n; i++) {
					System.out.print(minValue[i] + " ");
				}
				System.out.println();
				break;
			}
			default: {
				break;
			}
			}
		}

		s.close();
	}

	// Transpose
	private static int[][] Transpose(int[][] matrix, int m, int n) {
		int[][] newMatrix = new int[n][m];
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < m; j++) {
				newMatrix[i][j] = matrix[j][i];
			}
		}
		return newMatrix;
	}

	// RowMultiply
	private static int[] RowMultiply(int[][] matrix, int m, int n) {
		int[] rowProduct = new int[m];
		for (int i = 0; i < m; i++) {
			int product = 1;
			for (int j = 0; j < n; j++) {
				product *= matrix[i][j];
			}
			rowProduct[i] = product;
		}
		return rowProduct;
	}

	// ColumnMin
	private static int[] ColumnMin(int[][] matrix, int m, int n) {
		int[] minValue = new int[n];
		for (int i = 0; i < n; i++) {
			int min = matrix[0][i];
			for (int j = 0; j < m; j++) {
				if (matrix[j][i] <= min) {
					min = matrix[j][i];
				}
			}
			minValue[i] = min;
		}
		return minValue;
	}

}
