
public class Pawn extends ChessPiece{

	Pawn(int c, int r, String color, char type) {
		super(c, r, color, type);
	}

	boolean isAttacking(LinkedList list) {
		Node current = list.head;
		while(current != null) {
			//current is the pawns being checked if its attacking the query chess piece
			if(this.color != current.val.color) {
				//values for the possible other chess piece positions 
				int r1 = current.val.row - 1;
				int r2 = current.val.row + 1;
				int c1 = current.val.col - 1;
				int c2 = current.val.col + 1;

				//white pawns
				//attacks on the diagonals upwards (increasing row)
				if(this.type == 'p') {
					if((this.col == c2 && this.row == r2) || (this.col == c1 && this.row == r2)) {
						return true;
					}
				}
				//black pawns
				//attacks on the diagonals downwards (decreasing row)
				if(this.type == 'P') {
					if((this.col == c2 && this.row == r1) || (this.col == c1 && this.row == r1)) {
						return true;
					}
				}

				
			}
			current = current.next;
		}
		return false;
	}
}
