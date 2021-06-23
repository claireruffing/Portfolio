//Claire Ruffing
//cmruffin
//1587910
//HW4
//To create a recursive program called NQueens.java that uses a file of input with info in arrays 
//with several input queens (the NXN chess board size, the column number of the first queen's position,
//and the row number of the first queen's position) to print out an array of the new created queens' 
//positions on the chess board placed where they cannot attack each other.

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;
import java.util.Stack;

public class NQueens {
	int n;
	ArrayList<Queen> answer = new ArrayList<Queen>();

	//stores n number of queens that can be placed on the board and 
	//the array list answer of the positions of the queens
	public NQueens(int n, ArrayList<Queen> answer) {
		this.n = n;
		this.answer = answer;
	}

	//passing number of input queens and a stack of queens
	//function: 
	boolean getAnswer(int numInputQueens, Stack<Queen> s) {

		int start =  0;
		int col = 1;
		// Make a copy of the answer list into a list of the inputs
		ArrayList<Queen> inputQueens = new ArrayList<Queen>(answer);

		//check if input queens can attack each other	
		for(int i = 0; i < inputQueens.size(); i++){
			for(int j = 0; j < inputQueens.size(); j++){
				if ( i != j && (inputQueens.get(i)).isAttacking(inputQueens.get(j)) ) {
					return false;
				}
			}
		}

		while (col <= n) {		
			boolean skip = false;

			//if col is one of the input queen's cols, skip it
			for(int i = 0; i < inputQueens.size(); i++){
				if ((inputQueens.get(i)).col == col) {
					col++;
					skip = true;
					break;
				}
			}

			if (skip) {
				continue;
			}			
			else {
				if(start == n){
					if(s.empty()) {
						return false;
					}
					answer.remove(answer.size()-1);
					Queen last = s.pop();
					start = last.row;
					col = last.col;					
					//System.out.println("back to ("+col+", "+start+") (2)"); *debug
				}

				boolean placed = false;
				for (int row=start+1; row <= n; row++) {								
					Queen newQueen = new Queen(col, row);
					boolean isPossible = true;
					for(int i = 0; i < answer.size(); i++) {
						if ((answer.get(i)).isAttacking(newQueen)) {
							isPossible = false;
							break;
						}				
					}
					//System.out.println("trying ("+col+", "+row+")"); *debug
					if (isPossible) {
						placed = true;
						answer.add(newQueen);
						s.push(newQueen);
						//System.out.println("placed at ("+col+", "+row+")"); *debug
						col++;
						start = 0;
						break;
					}
					//if the queen cannot be placed and we are in the last row
					if (!placed && row == n) {
						if (s.empty()) {
							return false;
						}
						//backtrack to previous placed queen
						answer.remove(answer.size()-1);
						//the last queen's row and column from the stack, being popped
						Queen last = s.pop();
						start = last.row;
						col = last.col;						
						//System.out.println("back to ("+col+", "+start+")"); *debug
					}
					else{
						start = 0;
					}
				}
			}
		}
		return true;
	}


	public static void main(String[] args) throws IOException {
		//n is board size and number of queens that need to be placed
		int n,c,r;

		//base case: checks if number of command line arguments is not two, then exit
		if(args.length != 2){
			System.out.println("Usage: java -jar NQueens.jar <input file> <output file>");
			System.exit(1);
		}
		//input file name
		Scanner in = new Scanner(new File(args[0])); 
		//output file name
		PrintWriter out = new PrintWriter(new FileWriter(args[1])); 

		// read lines from in, extract and print tokens from each line
		while( in.hasNextLine() ){
			//trims the leading and trailing white spaces, adding a white space at the end 
			String line = in.nextLine().trim() + " ";
			//checks if the line being checked is empty 
			if(line.length() <= 1) {
				out.println();
				continue;
			}
			//split line around white space 
			String[] token = line.split("\\s+");

			n = Integer.valueOf(token[0]);

			//base case: n queens board cannot be of size 2x2 or 3x3
			if(n == 2 || n == 3) {
				out.println("No solution");	
				continue;
			}

			//p is a counter for the number of input queens
			int p = 0;
			//stack of queens
			Stack<Queen> s = new Stack<Queen>();
			//array list of queens for the solution
			ArrayList<Queen> answer = new ArrayList<Queen>();
			for (int i=1; i<token.length; i=i+2) {
				c = Integer.valueOf(token[i]);
				r = Integer.valueOf(token[i+1]);

				//creating a queen from the input file
				Queen inputQueen = new Queen(c, r);

				//places the input queen into the output 
				answer.add(inputQueen);
				p++;
			}

			//the new queen placement on board
			NQueens nQueens = new NQueens(n, answer);

			//number of input queens and the stack of positions of the queens 
			if (nQueens.getAnswer(p, s)) { 
				//sorting the output by increasing columns
				Collections.sort(answer, new SortByColumn()); 

				//writing the array list of queen positions as column row column row etc
				for(int i = 0; i < answer.size(); i++){
					out.print((answer.get(i)).col + " " + (answer.get(i)).row + " ");					
				}
				out.println();
			}
			else {
				out.println("No solution");			
			}	
		}

		//close files
		in.close();
		out.close();		
	}
}
