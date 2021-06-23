
public class ChessPiece {

	public int col;
	public int row;
	public String color="";
	public char type='\0';

	ChessPiece(){
	}

	ChessPiece(int c, int r, String color, char type){
		this.col = c;
		this.row = r;
		this.color = color;
		this.type = type;
	}
	
	ChessPiece(int c, int r){
		this.col = c;
		this.row = r;
	}
	
	boolean isAttacking(LinkedList list) {
		return false;
	}
	
	boolean canMove(ChessPiece piece, LinkedList list) {
		return false;
	}
	
	boolean isBlocked(ChessPiece piece) {
		return false;
	}

}
