
public class King extends ChessPiece{

	King(int c, int r, String color, char type) {
		super(c, r, color, type);
	}

	boolean isAttacking(LinkedList list) {
		Node current = list.head;
		while(current != null) {
			//current is the king being checked if its attacking the query chess piece
			if(this.color != current.val.color) {
				//values for the possible other chess piece positions 
				int r1 = current.val.row - 1;
				int r2 = current.val.row + 1;
				int c1 = current.val.col - 1;
				int c2 = current.val.col + 1;

				//vertical: if the column of the query king is in the same column as another chess piece
				if((this.col == current.val.col) && ((this.row == r1) || (this.row == r2))){
					return true;
				}
				//horizontal: if the row of the query king is in the same row as another chess piece
				if((this.row == current.val.row) && ((this.col == c1) || (this.col == c2))) { 
					return true;
				}
				//diagonal from top left to bottom right
				if((this.col == c1 && this.row == r1) || (this.col == c2 && this.row == r2)) {
					return true;
				}
				//diagonal from top right to bottom left
				if((this.col == c2 && this.row == r1) || (this.col == c1 && this.row == r2)) {
					return true;
				}
			}
			current = current.next;
		}
		return false;
	}

	boolean canMove(ChessPiece piece, LinkedList list) {
		//this is the source piece if its a king, and piece is whatever the destination piece is
		if(!this.color.equals(piece.color)) {
			//values for the possible other chess piece positions 
			int r1 = piece.row - 1;
			int r2 = piece.row + 1;
			int c1 = piece.col - 1;
			int c2 = piece.col + 1;

			//vertical: if the column of the source king is in the same column as another chess piece
			if((this.col == piece.col) && ((this.row == r1) || (this.row == r2))){
				return true;
			}
			//horizontal: if the row of the source king is in the same row as another chess piece
			if((this.row == piece.row) && ((this.col == c1) || (this.col == c2))) { 
				return true;
			}
			//diagonal from top left to bottom right
			if((this.col == c1 && this.row == r1) || (this.col == c2 && this.row == r2)) {
				return true;
			}
			//diagonal from top right to bottom left
			if((this.col == c2 && this.row == r1) || (this.col == c1 && this.row == r2)) {
				return true;
			}
		}

		return false;
	}
}
