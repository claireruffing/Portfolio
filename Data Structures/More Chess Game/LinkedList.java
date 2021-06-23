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

	//deleting a previously stored chess piece, delval, from the list
	public ChessPiece delete(ChessPiece delval) {
		Node previous = head;
		Node current = head;
		//keep moving through the list as long as we are not at delval and at the end of the list
		while(current != null) {
			if(current.val.col == delval.col && current.val.row == delval.row) {
				break;
			}
			else {
				previous = current;
				current = current.next;
			}
		}
		//saying delval was not found
		if(current == null) {
			return null;
		}
		//if the first element of the list (head) is deleted
		if(current == head) {
			//previous.next = current.next;
			head = head.next;
		}
		else {
			//setting the link of previous.next to current.next so they are not linked to the delval node anymore
			previous.next = current.next;
		}
		//a reference to the node that is deleted
		return current.val;
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
	
	//function to find the query chess piece position exists in the input string 
		public ChessPiece findKing(String color) {
			if (size == 0) {
				return null;
			}    
			//if there is only one node and matches the query position, return that node
			if (head.next == null) {
				if(head.val.color.equals(color)) {
					return head.val;
				}
			}
			//if there is more than one node, return that node if it matches the query position
			Node current = head;
			//keep searching until reach end of the list
			while (current != null){
				//if the chess piece position matches the query position, return it
				if(current.val.type == 'k' && current.val.color.equals(color)) {
					return current.val;
				}
				else if(current.val.type == 'K' && current.val.color.equals(color)) {
					return current.val;
				}
				else{
					//else keep looking through the list
					current = current.next;
				}
			}
			return null;
		}

	public void display(){
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
	}

	//counting the number of pieces that have the same column and row value
	public int countPieces(int col, int row) {
		Node current = head;
		int counter = 0; 
		while(current != null) {
			if(current.val.col == col && current.val.row == row) {
				counter++;
			}
			current = current.next;
		}
		return counter;

	}

	//determines if the linked list is valid if there are no more than one chess piece in one position
	public boolean isValid() {
		Node current = head;
		boolean valid = true;
		while(current != null) {
			if(countPieces(current.val.col, current.val.row) > 1) {	
				valid = false;
				break;
			}
			else {
				current = current.next;
			}
		}
		return valid;
	}


}