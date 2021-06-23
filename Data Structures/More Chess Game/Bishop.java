
public class Bishop extends ChessPiece{

	Bishop(int c, int r, String color, char type) {
		super(c, r, color, type);
	}

	boolean isAttacking(LinkedList list) {
		Node current = list.head;
		while(current != null) {
			//current is the bishop being checked if its attacking the query chess piece
			if(this.color != current.val.color) {
				//diagonal from top left to bottom right
				//d1 takes the position of query bishop and subtracts its values
				int d1 = this.row - this.col;
				//d2 takes position of another chess piece and subtracts its values
				int d2 = current.val.row - current.val.col;
				//if the bishop position has the same value as another chess piece 
				if(d1 == d2) {
					return true;
				}
				//diagonal from top right to bottom left
				//d3 takes the position of the query bishop and adds its values
				int d3 = this.row + this.col;
				//d4 takes the position of the another chess piece and adds its values
				int d4 = current.val.row + current.val.col;
				//if the bishop position has the same value as another chess piece
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
		if(!this.color.equals(piece.color)) {
			//diagonal from top left to bottom right
			//d1 takes the position of source bishop and subtracts its values
			int d1 = this.row - this.col;
			//d2 takes position of another chess piece and subtracts its values
			int d2 = piece.row - piece.col;
			//if the bishop position has the same value as another chess piece 
			if(d1 == d2) {
				return !isBlockedDiagonaly1(piece, list, path);
			}
			//diagonal from top right to bottom left
			//d3 takes the position of the source bishop and adds its values
			int d3 = this.row + this.col;
			//d4 takes the position of the another chess piece and adds its values
			int d4 = piece.row + piece.col;
			//if the bishop position has the same value as another chess piece
			if(d3 == d4) {
				return !isBlockedDiagonaly2(piece, list, path);
			}
		}
		return false;
	}
	
	//diagonal from top left to bottom right
		boolean isBlockedDiagonaly1(ChessPiece piece, LinkedList list, LinkedList path) {
			int i = 0; //***
			for (int col = this.col-1; col > piece.col; col--) {
				i--; //***
				for (int row = this.row-Math.abs(i); row > piece.row; row--) { //***
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
			for (int col = this.col-1; col > piece.col; col--) {
				i--; //***
				for (int row = this.row+Math.abs(i); row < piece.row; row++) { //***
					path.insert(new ChessPiece(col, row)); 
					break; //***
				}
			}
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

