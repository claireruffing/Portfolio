//Claire Ruffing
//cmruffin
//HW1
//To create a recursive program called NQueens.java that uses a file of input with info 
//in arrays with 3 numbers each (the NXN chess board size, the column number of the first 
//queen's position, and the row number of the first queen's position) to print out an 
//array of the newly created queens' positions on the chess board placed where they 
//cannot attack each other. (there are n nXn queens on the chess board)
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Scanner;

public class NQueens {
	int n;
	Queen[] answer;

	//stores n number of queens that can be placed on the board and 
	//the array of the positions of the queens
	public NQueens(int n, Queen[] answer) {
		this.n = n;
		this.answer = answer;
	}

		//passing n queens and an array of queens
		//nextSolutionSlot is the new spot in the answer array that can store a new queen in
		//function: stores the n new queens position in the solution array
		boolean getAnswer(int left_to_place) {
		
			//number of queens minus number of queens left to place
			int placedQueens = this.n - left_to_place;
			//the column available, set at a dummy value of 0
			int availableCol = 0; 
			
			// if all queens were placed, return true
			if(left_to_place == 0) {
				return true;
			}

			boolean available = false;
			
			//checking queen placement starting at column 1
			for(int col = 1; col <= n; col++) {
				// assume that no queen is in this.col
				available = true; 
				
				//iterating over the queens placed already
				for(int i = 0; i < placedQueens; i++) {
					//if a queen is already in a column, then the column is not available to place another queen
					if (answer[i].col == col) {
						available = false;
						break;
					}
				}
				//if the column does not have any queens, then place a queen in that column
				if (available) {
					availableCol = col;
					break;
				}
			}
			
			//checking queen placement starting at row 1
			for(int row=1; row <= n; row++) {			
				//a new queen to place
				Queen newQueen = new Queen(availableCol, row);
				
				boolean isPossible = true;

				//iterating over the queens placed already
				for(int i = 0; i < placedQueens; i++) {
					//checks if any of the previously placed queens can attack the new queen 
					if (answer[i].isAttacking(newQueen)) {
						isPossible = false;
						break;
					}				
				}
				
				//if the new queen can be placed, place it
				if (isPossible) {
					answer[placedQueens] = newQueen;
					//recursive part: iterate through all the queens left to place on the board
					if (getAnswer(left_to_place-1)) {
						return true;
					}
				}	
			}
			return false;
		}

	public static void main(String[] args) throws IOException {

		int n,c,r;
		//base case: checks if number of command line arguments is not two, then exit
		if(args.length != 2){
			System.out.println("Usage: java -jar NQueens.jar <input file> <output file>");
			System.exit(1);
		}
		//input file name
		Scanner in = new Scanner(new File(args[0])); 
		//output file name
		PrintWriter solution = new PrintWriter(new FileWriter(args[1])); 

		// read lines from in, extract and print tokens from each line
		while( in.hasNextLine() ){
			//trims the leading and trailing white spaces, adding a white space at the end 
			String line = in.nextLine().trim() + " ";
			 //checks if the line being checked is empty 
            if(line.length() <= 1) {
            	solution.println();
            	continue;
            }
			//split line around white space 
			String[] token = line.split("\\s+");

			//creates the integer object holding the value of the input string info
			n = Integer.valueOf(token[0]);
			c = Integer.valueOf(token[1]);
			r = Integer.valueOf(token[2]);
			
			//base case the board size n cannot be of size 2 or 3
			if(n == 2 || n == 3) {
				solution.println("No solution");	
				continue;
			}

			//creating the new queen
			Queen inputQueen = new Queen(c, r);
			//array of queens for the solution
			Queen[] answer = new Queen[n];
			//places the first queen into the solution array
			answer[0] = inputQueen;
			//int inputCol = inputQueen.col;
			//int inputRow = inputQueen.row;
			//the new queen placement on n x n board
			NQueens nQueens = new NQueens(n, answer);			
			
			if (nQueens.getAnswer(n-1)) {
				// need to sort the solution array by column
				Arrays.sort(answer, new SortByColumn()); 

				//writing the array of queen positions as column row column row etc
				for(int i = 0; i < answer.length; i++){
					solution.print(answer[i].col + " " + answer[i].row + " ");					
				}
				solution.println();
			}
			//writes no solution if there is no placements for n queens based on the
			//input queen's position
			else {
				solution.println("No solution");			
			}
		}


		//close files
		in.close();
		solution.close();		

	}
}
