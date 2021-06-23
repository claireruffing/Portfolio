
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

	boolean canMove(ChessPiece piece, LinkedList list) {
		LinkedList path = new LinkedList();
		//this is the source piece if its a queen, and piece is whatever the destination piece is
		if(!this.color.equals(piece.color)) {
			//vertical: if the column of the source queen is in the same column as another chess piece
			if(this.col == piece.col) { // vertical
				//if there is nothing in the path, the source can move. if there is something in the path, source cannot move
				return !this.isBlockedVertically(piece, list, path); 
			}
			//horizontal: if the row of the source queen is in the same row as another chess piece
			else if ( this.row == piece.row) { // horizontal
				return !this.isBlockedHorizontally(piece, list, path);
			}
			//diagonal from top left to bottom right and vice versa
			else if((this.row - this.col) == (piece.row - piece.col)) {
				return !isBlockedDiagonaly1(piece, list, path);
			}
			//diagonal from top right to bottom left and vice versa
			if((this.row + this.col) == (piece.row + piece.col)) {
				return !isBlockedDiagonaly2(piece, list, path);
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

	//
	boolean isBlockedDiagonaly1(ChessPiece piece, LinkedList list, LinkedList path) {
		int i = 0; //***
		for (int col = this.col-1; col > piece.col; col--) {
			i--; //***
			for (int row = this.row-Math.abs(i); row > piece.row; row--) { //***changed int row = this.row-1 to the decrementing counter i to add all of the spots available to the path of the queen. Before the change, the column would decrement every iteration, but the row would decrement starting at the initial position-1 instead of the previous position just placed in path. I did the same exact changes with the *** in the following for loop, the other method for the diagonal, and the Bishop's diagonal functions.
				path.insert(new ChessPiece(col, row));
				break; //***
			}
		}
		 
		for (int col = this.col+1; col < piece.col; col++) {
			i--; //***
			for (int row = this.row+Math.abs(i); row < piece.row; row++) { //***
				path.insert(new ChessPiece(col, row)); 
				break; //***
			}
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

		return false;
	}
	
	boolean isBlockedDiagonaly2(ChessPiece piece, LinkedList list, LinkedList path) {
		int i = 0; //***
		// if piece.col < this.col do a for loop that decrements i
		//if the other piece is left of (in a lower column) the source queen 
		for (int col = this.col-1; col > piece.col; col--) {
			i--; //***
			for (int row = this.row+Math.abs(i); row < piece.row; row++) { //***
				path.insert(new ChessPiece(col, row)); 
				break; //***
			}
		}
		// if piece.col > this.col do a for loop that increments i
		//if the other piece is right of (in a higher column) the source queen 
		for (int col = this.col+1; col < piece.col; col++) {
			i--; //***
			for (int row = this.row-Math.abs(i); row > piece.row; row--) { //***
				path.insert(new ChessPiece(col, row)); 
				break; //***
			}
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

		return false;
	}
}
