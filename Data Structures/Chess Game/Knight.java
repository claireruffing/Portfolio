
public class Knight extends ChessPiece{

	Knight(int c, int r, String color, char type) {
		super(c, r, color, type);
	}

	boolean isAttacking(LinkedList list) {
		Node current = list.head;
		while(current != null) {
			//current is the knight being checked if its attacking the query chess piece
			if(this.color != current.val.color) {
				//if(!color.equals(other.color)) {
				if((current.val.col >= 1 && current.val.col <= 8) && (current.val.row <= 8 && current.val.row >= 1)) {
					//values for the possible other chess piece positions 
					int r1 = current.val.row - 1;
					int r2 = current.val.row + 1;
					int r3 = current.val.row - 2;
					int r4 = current.val.row + 2;
					int c1 = current.val.col - 1;
					int c2 = current.val.col + 1;
					int c3 = current.val.col - 2;
					int c4 = current.val.col + 2;
					//there are eight possibilities for the query knight to attack another chesspiece
					if(this.col == c1 && this.row == r3){
						return true;
					}
					if(this.col == c2 && this.row == r3){
						return true;
					}
					if(this.col == c1 && this.row == r4){
						return true;
					}
					if(this.col == c2 && this.row == r4){
						return true;
					}
					if(this.col == c3 && this.row == r1){
						return true;
					}
					if(this.col == c4 && this.row == r1){
						return true;
					}
					if(this.col == c3 && this.row == r2){
						return true;
					}
					if(this.col == c4 && this.row == r2){
						return true;
					}
				}
			}
			current = current.next;
		}
		return false;
	}
}
