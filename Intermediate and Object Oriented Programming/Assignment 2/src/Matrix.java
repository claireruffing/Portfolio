import java.util.Scanner;

public class Matrix {

	public static void main(String[] args) {
		Scanner s = new Scanner(System.in);
		int m = 0, n = 0;

		m = s.nextInt();
		n = s.nextInt();

		// Matrix
		int[][] matrix = new int[m][n];
		for (int r = 0; r < m; r++) {
			for (int c = 0; c < n; c++) {
				matrix[r][c] = s.nextInt();
			}
		}

		// Switch command statement
		char command;
		while ((command = s.next().charAt(0)) != 'Q') {
			switch (command) {
			case 'T': {
				int[][] newMatrix = Transpose(matrix, m, n);
				String strws = " ";
				for (int c = 0; c < n; c++) {
					for (int r = 0; r < m; r++) {
						if (r == m - 1) { // r and m is column in this case //only execute if j is 2
							System.out.print(newMatrix[c][r]);
						} else {
							System.out.print(newMatrix[c][r] + strws); // execute if j column is 0 and 1
						}
					}
					System.out.println();
				}
				break;
			}
			case 'R': {
				int[] rowProduct = RowMultiply(matrix, m, n);
				String strws = " ";
				for (int r = 0; r < m; r++) {
					if (r == m - 1) {
						System.out.print(rowProduct[r]);
					} else {
						System.out.print(rowProduct[r] + strws);
					}
				}
				System.out.println();
				break;
			}
			case 'C': {
				int[] minValue = ColumnMin(matrix, m, n);
				String strws = " ";
				for (int c = 0; c < n; c++) {
					if (c == n - 1) {
						System.out.print(minValue[c]);
					} else {
						System.out.print(minValue[c] + strws);
					}
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
		for (int c = 0; c < n; c++) {
			for (int r = 0; r < m; r++) {
				newMatrix[c][r] = matrix[r][c];
			}
		}
		return newMatrix;
	}

	// RowMultiply
	private static int[] RowMultiply(int[][] matrix, int m, int n) {
		int[] rowProduct = new int[m];
		for (int r = 0; r < m; r++) {
			int product = 1;
			for (int c = 0; c < n; c++) {
				product *= matrix[r][c];
			}
			rowProduct[r] = product;
		}
		return rowProduct;
	}

	// ColumnMin
	private static int[] ColumnMin(int[][] matrix, int m, int n) {
		int[] minValue = new int[n];
		for (int c = 0; c < n; c++) {
			int min = matrix[0][c];
			for (int r = 0; r < m; r++) {
				if (matrix[r][c] <= min) {
					min = matrix[r][c];
				}
			}
			minValue[c] = min;
		}
		return minValue;
	}

}
