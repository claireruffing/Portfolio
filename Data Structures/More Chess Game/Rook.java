
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

	boolean canMove(ChessPiece piece, LinkedList list) {
		LinkedList path = new LinkedList();
		if(!this.color.equals(piece.color)) {
			//vertical: if the column of the source rook is in the same column as another chess piece 
			if(this.col == piece.col) {
				return !isBlockedVertically(piece, list, path);
			}
			//horizontal: if the row of the source rook is in the same row as another chess piece
			if(this.row == piece.row) {
				return !isBlockedHorizontally(piece, list, path);
			}
		}
		return false;
	}
	
	boolean isBlockedVertically(ChessPiece piece, LinkedList list, LinkedList path) {
		// if piece.row < this.row do a for loop that decrements i
		//if the other piece is above (in a lower row) the source queen 
		for (int row = this.row-1; row > piece.row; row--) {
			path.insert(new ChessPiece(this.col, row)); 
		}
		// if piece.row > this.row do a for loop that increments i
		//if the other piece is below (in a higher row) the source queen 
		for (int row = this.row+1; row < piece.row; row++) {
			path.insert(new ChessPiece(this.col, row)); 
		}
		// Check if any item in path list is also in list. If so, return false, otherwise return true
		Node current = path.head;
		//keep searching until reach end of the list
		while (current != null){
			//if we find a piece that's in path is also on the board, return false because its blocks
			if(list.find(current.val.col, current.val.row) == null) {
				current = current.next;
			}
			else if(list.find(current.val.col, current.val.row) != null) {
				return true;  //something is blocking
			}
		}
		return false; // nothing blocks 	
	}

	boolean isBlockedHorizontally(ChessPiece piece, LinkedList list, LinkedList path) {
		// if piece.col < this.col do a for loop that decrements i
		//if the other piece is left of (in a lower column) the source queen 
		for (int col = this.col-1; col > piece.col; col--) {
			path.insert(new ChessPiece(col, this.row)); 
		}
		// if piece.col > this.col do a for loop that increments i
		//if the other piece is right of (in a higher column) the source queen 
		for (int col = this.col+1; col < piece.col; col++) {
			path.insert(new ChessPiece(col, this.row)); 
		}
		// Check if any item in path list is also in list. If so, return false, otherwise return true
		Node current = path.head;
		//keep searching until reach end of the list
		while (current != null){
			//if we find a piece that's in path is also on the board, return false because its blocks
			if(list.find(current.val.col, current.val.row) == null) {
				current = current.next;
			}
			else if(list.find(current.val.col, current.val.row) != null) {
				return true;  //something is blocking
			}
		}
		return false; // nothing blocks 	
	}
}
