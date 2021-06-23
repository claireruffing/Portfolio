
public class Rook extends ChessPiece {

	Rook(int c, int r, String color, char type) {
		super(c, r, color, type);
	}

	boolean isAttacking(LinkedList list) {
		//current is the rook being checked if its attacking the query chess piece
		Node current = list.head;
		while(current != null) {
			//if the query color is not the same as the other chess piece color
			if(!this.color.equals(current.val.color)) {
				//vertical: if the column of the query rook is in the same column as another chess piece 
				if(this.col == current.val.col) {
					return true;
				}
				//horizontal: if the row of the query rook is in the same row as another chess piece
				if(this.row == current.val.row) {
					return true;
				}
			}
			current = current.next;
		}
		return false;
	}
}
