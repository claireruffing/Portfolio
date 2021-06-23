
public class Queen extends ChessPiece{

	Queen(int c, int r, String color, char type) {
		super(c, r, color, type);
	}

	boolean isAttacking(LinkedList list) {
		Node current = list.head;
		while(current != null) {
			//current is the queen being checked if its attacking the query chess piece
			if(this.color != current.val.color) {
				//vertical: if the column of the input queen is in the same column as another chess piece
				//horizontal: if the row of the input queen is in the same row as another chess piece
				if(this.col == current.val.col || this.row == current.val.row) { 
					return true;
				}
				//diagonal from top left to bottom right
				//d1 takes the position of input queen and subtracts its values
				int d1 = this.row - this.col;
				//d2 takes position of another chess piece and subtracts its values
				int d2 = current.val.row - current.val.col;
				//if the queens position has the same value as another chess piece
				if(d1 == d2) {
					return true;
				}
				//diagonal from top right to bottom left
				//d3 takes the position of the input queen and adds its values
				int d3 = this.row + this.col;
				//d4 takes the position of another chess piece and adds its values
				int d4 = current.val.row + current.val.col;
				//if the queens position has the same value as another chess piece
				if(d3 == d4) {
					return true;
				}
			}
			current = current.next;
		}
		return false;
	}
}
