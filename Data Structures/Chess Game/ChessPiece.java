
public class ChessPiece {

	public int col;
	public int row;
	public String color;
	public char type;

	ChessPiece(){
	}

	ChessPiece(int c, int r, String color, char type){
		this.col = c;
		this.row = r;
		this.color = color;
		this.type = type;
	}
	
	boolean isAttacking(LinkedList list) {
		return false;
	}

	//boolean isAttacking(ChessPiece other) {
	/*	ChessPiece[] pieces = new ChessPiece[8];
		pieces[0] = new ChessPiece();
		pieces[1] = new Queen();
		pieces[2] = new Rook();
		pieces[3] = new Bishop();

		for(int i = 0; i < pieces.length; i++) {
			for(int j = i + 1; j < pieces.length; j++) {
				if(pieces[i].isAttacking(pieces[j])) {
					return true;
				}
				//return false;
			}
		}
		return false;
	}*/


}
