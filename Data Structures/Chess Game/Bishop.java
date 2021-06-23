
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

}
