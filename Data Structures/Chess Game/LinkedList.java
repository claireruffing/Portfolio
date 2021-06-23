import java.util.ArrayList;

public class LinkedList {

	//first link in list
	Node head;
	//size of list
	int size = 0;

	//constructor for an empty list
	public LinkedList() {
		head = null;
	}

	//if the list is empty, returns true
	public boolean isEmpty() {
		return (head == null);
	}

	//inserting new node into list
	public void insert(ChessPiece newval){
		Node latest = new Node(newval);     //creating new link
		latest.next = head;   //storing the value of head inside of latest.next
		head = latest;    //storing a reference to the new link latest as the reference in head
		//latest = head;
		//head = latest.next;
		size++;
	}

	//function to find the query chess piece position exists in the input string 
	public ChessPiece find(int col, int row) {
		if (size == 0) {
			return null;
		}    
		//if there is only one node and matches the query position, return that node
		if (head.next == null) {
			if(head.val.col == col && head.val.row == row) {
			return head.val;
			}
		}
		//if there is more than one node, return that node if it matches the query position
		Node current = head;
		//keep searching until reach end of the list
		while (current != null){
			//if the chess piece position matches the query position, return it
			if((current.val.col == col) && (current.val.row == row)) {
				return current.val;
			}
			else{
				//else keep looking through the list
				current = current.next;
			}
		}
		return null;
	}

	/*public void display(){
		//if the board is empty
		if (size == 0) {
			System.out.println("empty");
			return;
		}    
		//if there is only one node, then print that node
		if (head.next == null) {
			System.out.printf("%c%s%d%d", head.val.type, head.val.color, head.val.col, head.val.row);
			return;
		}
		//if there is more than one node, print the value of head
		Node current = head;
		System.out.printf("%c%s%d%d%s", current.val.type, current.val.color, current.val.col, current.val.row, "->");
		current = head.next;
		//keep printing until reach end of the list
		while (current.next != null){
			System.out.printf("%c%s%d%d%s", current.val.type, current.val.color, current.val.col, current.val.row, "->");
			current = current.next;
		}
		//prints the last node
		System.out.printf("%c%s%d%d%s", current.val.type, current.val.color, current.val.col, current.val.row, "\n");
	}*/

	//determines if the linked list is valid if there are no more than one chess piece in one position
	public boolean isValid() {
		Node current = head;
		boolean valid = true;
		ArrayList<String> positions = new ArrayList<String>();
		while (current != null){
			//returning the integers col and row as a string object
			String position = Integer.toString(current.val.col) + Integer.toString(current.val.row);
			//checks if the chess piece position matches a position already in the list
			if(positions.contains(position)){
				valid = false;
				break;
			}
			//adding the position into the array list
			positions.add(position);
			current = current.next;			
		}
		return valid;
	}

}