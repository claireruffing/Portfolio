//Claire Ruffing
//cmruffin
//HW1
//To store the input queen's position on the board, create the new queens being placed 
//on the board, and check to see if the new queen is attacking the previous queen placed
//on the board checking the row, column, and the diagonals.

//stores the first queen's position
public class Queen {
	int col;
	int row;
	//stores the new queen's position
	public Queen(int c, int r) {
		this.col = c;
		this.row = r;
	}
	
	boolean isAttacking(Queen q) {
		//vertical: if the column of the first queen is in the same column as the new queen
		//horizontal: if the row of the first queen is in the same row as the new queen
		if(col == q.col || row == q.row) { 
			return true;
		}
		//diagonal from top left to bottom right
		//d1 takes the position of first queen and subtracts its values
		int d1 = row - col;
		//d2 takes position of the new queen and subtracts its values
		int d2 = q.row - q.col;
		//if the new queens position has the same value as d1 when q.row and q.col are subtracted
		if(d1 == d2) {
			return true;
		}
		//diagonal from top right to bottom left
		//d3 takes the position of the first queen and adds its values
		int d3 = row + col;
		//d4 takes the position of the new queen and adds its values
		int d4 = q.row + q.col;
		//if the new queens position has the same value as d4 when q.row and q.col are added
		if(d3 == d4) {
			return true;
		}
		return false;
	}
}
