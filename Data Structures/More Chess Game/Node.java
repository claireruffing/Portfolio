public class Node {

	ChessPiece val;
	Node next;
	
	Node(ChessPiece newval){
		val = newval; 
		next = null;
	}
	
	Node(ChessPiece newval, Node nextNode){
		val = newval;
		next = nextNode;
	}
}
