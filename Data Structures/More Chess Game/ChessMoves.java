import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;
//Claire Ruffing
//cmruffin
//HW3 Maintaining Your Chess Board
//To create a program using linked list1s. The input file consists 
//of a query chess piece's position and then other chess piece types 
//with their positions. The output file needs to consist of the type 
//of the query chess piece position and a y if it attacks another 
//chess piece or a n if it does not attack another chesspiece. The 
//chess board is not valid if there are two chesspiece in the same position 
//on the chess board. Otherwise, it is a valid chess board. 
public class ChessMoves {

	public static void main(String[] args) throws IOException {

		int c, r, c2, r2;
		//base case: checks if number of command line arguments is not two, then exit
		if(args.length != 2){
			System.out.println("Usage: java -jar ChessMoves.jar <input file> <output file>");
			System.exit(1);
		}
		//input file name
		Scanner in = new Scanner(new File(args[0]));
		//output file name
		PrintWriter out = new PrintWriter(new FileWriter(args[1]));

		ChessPiece illegalSource =  new ChessPiece();
		ChessPiece illegalDestination = new ChessPiece();

		// read lines from in, extract and print token1s from each line
		while( in.hasNextLine() ){
			//trims the leading and trailing white spaces, adding a white space at the end
			String line = in.nextLine().trim() + " ";
			//checks if the line being checked is empty 
			if(line.length() <= 1) {
				out.println();
				continue;
			}

			boolean legal = true;
			boolean previsBlack = false;

			int colonPos = line.indexOf(':');
			String firstPart = line.substring(0, colonPos);
			String secondPart = line.substring(colonPos+1).trim();

			//split line around white spaces in the input string
			String[] token1 = firstPart.split("(\\s)+");
			String[] token2 = secondPart.split("(\\s)+");

			LinkedList list1 = new LinkedList();
			//iterating through string token1 starting at token1[2]  and the rest of the types
			for(int i = 0; i < token1.length; i = i + 3) {
				switch (token1[i].charAt(0)) {   //switch cases of the types in the input string
				case 'q': {
					//inserting the queen position at c, r into linked list1
					Queen q = new Queen(Integer.valueOf(token1[i+1]), Integer.valueOf(token1[i+2]), "white", 'q');
					list1.insert(q);
					break;
				}
				case 'Q': {
					Queen Q = new Queen(Integer.valueOf(token1[i+1]), Integer.valueOf(token1[i+2]), "black", 'Q');
					list1.insert(Q);
					break;
				}
				case 'r': {
					//inserting the rook position at c, r into linked list1
					Rook rook = new Rook(Integer.valueOf(token1[i+1]), Integer.valueOf(token1[i+2]), "white", 'r');
					list1.insert(rook);
					break;
				}
				case 'R': {
					Rook R = new Rook(Integer.valueOf(token1[i+1]), Integer.valueOf(token1[i+2]), "black", 'R');
					list1.insert(R);
					break;
				}
				case 'b': {
					//inserting the bishop position at c, r into linked list1
					Bishop b = new Bishop(Integer.valueOf(token1[i+1]), Integer.valueOf(token1[i+2]), "white", 'b');
					list1.insert(b);
					break;
				}
				case 'B': {
					Bishop B = new Bishop(Integer.valueOf(token1[i+1]), Integer.valueOf(token1[i+2]), "black", 'B');
					list1.insert(B);
					break;
				}
				case 'k': {
					//inserting the king position at c, r into linked list1
					King k = new King(Integer.valueOf(token1[i+1]), Integer.valueOf(token1[i+2]), "white", 'k');
					list1.insert(k);
					break;
				}
				case 'K': {
					King K = new King(Integer.valueOf(token1[i+1]), Integer.valueOf(token1[i+2]), "black", 'K');
					list1.insert(K);
					break;
				}
				case 'n': {
					//inserting the knight position at c, r into linked list1
					Knight n = new Knight(Integer.valueOf(token1[i+1]), Integer.valueOf(token1[i+2]), "white", 'n');
					list1.insert(n);
					break;
				}
				case 'N': {
					Knight N = new Knight(Integer.valueOf(token1[i+1]), Integer.valueOf(token1[i+2]), "black", 'N');
					list1.insert(N);
					break;
				}
				case 'p': {
					Pawn p = new Pawn(Integer.valueOf(token1[i+1]), Integer.valueOf(token1[i+2]), "white", 'p');
					list1.insert(p);
					break;
				}
				case 'P': {
					Pawn P = new Pawn(Integer.valueOf(token1[i+1]), Integer.valueOf(token1[i+2]), "black", 'P');
					list1.insert(P);
					break;
				}

				}
			}

			//displaying the linked list1 in the console
			//list1.display();

			//creating the source and destination chess pieces from list2
			for(int i = 0; i < token2.length; i = i + 4) {
				if (!legal) break;
				ChessPiece source = new ChessPiece(Integer.valueOf(token2[i]), Integer.valueOf(token2[i+1]));
				ChessPiece destination = new ChessPiece(Integer.valueOf(token2[i+2]), Integer.valueOf(token2[i+3]));

				//setting c and r to the source chess piece's values
				c = source.col;
				r = source.row;

				//finding the source chess piece in list1
				ChessPiece foundSource = list1.find(c, r);
				

				if(foundSource == null) {
					legal = false;
					illegalSource.col = source.col;
					illegalSource.row = source.row;
					illegalDestination.col = destination.col;
					illegalDestination.row = destination.row;
					break;
					//out.println(source.col + " " + source.row + " " + destination.col + " " + destination.row + " " + "illegal");
					//break;
				}
				else {
					ChessPiece inputPiece = null;
					switch (foundSource.type) {
					case 'Q':
						inputPiece = new Queen(foundSource.col, foundSource.row, foundSource.color, foundSource.type);
						break;
					case 'q':
						inputPiece = new Queen(foundSource.col, foundSource.row, foundSource.color, foundSource.type);
						break;
					case 'R':
						inputPiece = new Rook(foundSource.col, foundSource.row, foundSource.color, foundSource.type);
						break;
					case 'r':
						inputPiece = new Rook(foundSource.col, foundSource.row, foundSource.color, foundSource.type);
						break;
					case 'B':
						inputPiece = new Bishop(foundSource.col, foundSource.row, foundSource.color, foundSource.type);
						break;
					case 'b':
						inputPiece = new Bishop(foundSource.col, foundSource.row, foundSource.color, foundSource.type);
						break;
					case 'K':
						inputPiece = new King(foundSource.col, foundSource.row, foundSource.color, foundSource.type);
						break;
					case 'k':
						inputPiece = new King(foundSource.col, foundSource.row, foundSource.color, foundSource.type);
						break;
					case 'N':
						inputPiece = new Knight(foundSource.col, foundSource.row, foundSource.color, foundSource.type);
						break;
					case 'n':
						inputPiece = new Knight(foundSource.col, foundSource.row, foundSource.color, foundSource.type);
						break;
					case 'P':
						inputPiece = new Pawn(foundSource.col, foundSource.row, foundSource.color, foundSource.type);
						break;
					case 'p':
						inputPiece = new Pawn(foundSource.col, foundSource.row, foundSource.color, foundSource.type);
						break;
					}			
					//***checks if the previous inputPiece is the same color as the current inputPiece
					boolean tempPrevIsBlack = previsBlack;
					if(inputPiece.color.equals("black")) {
						previsBlack = true; }
					else {
						previsBlack = false; }	
					if (i != 0) {
						// Check if current piece is same color as previous piece.
						if((inputPiece.color.equals("black") &&  tempPrevIsBlack == true) || (inputPiece.color.equals("white") && tempPrevIsBlack == false)) {						
							legal = false;
							illegalSource.col = source.col;
							illegalSource.row = source.row;
							illegalDestination.col = destination.col;
							illegalDestination.row = destination.row;
							break;
						}
					}  //***
					//if the first move is a black piece, illegal move
					if(inputPiece.color.equals("black") && i == 0) {
						legal = false;
						illegalSource.col = source.col;
						illegalSource.row = source.row;
						illegalDestination.col = destination.col;
						illegalDestination.row = destination.row;
						break;
					}
					
					//if source piece is found in list1
					int tempcol, temprow;
					c2 = destination.col;
					r2 = destination.row;
					ChessPiece foundDestination = list1.find(c2, r2);
					//if the destination spot is empty, has no chess piece in it
					if(foundDestination == null) {
						if(inputPiece.canMove(destination, list1)) {
							// k 2 3 K 1 1: 2 3 3 4
							//move the source to the destination by changing the source's coordinates to the destination's coordinates
							tempcol = destination.col;
							foundSource.col = tempcol;
							c = foundSource.col;

							temprow = destination.row;
							foundSource.row = temprow;
							r = foundSource.row;
							//source.col and source.row are now the destination's col and row
							//list1.display();
							//out.println(Integer.valueOf(c));
							//out.println(Integer.valueOf(r));
							//out.println(foundSource.type);
							//out.println("Legal");
							Node currentPiece = list1.head;
							ChessPiece foundWhiteKing = list1.findKing("white");
							ChessPiece foundBlackKing = list1.findKing("black");
							/*if (inputPiece.color.equals("white") && foundWhiteKing != null) {
								// need to check if foundWhiteKing or foundBalckKing is null, then don't do while loop.
								// if (foundWhiteKing != null || foundBlackKing != null ) {
								while(currentPiece != null || !legal) {
									if((currentPiece.val.canMove(foundWhiteKing, list1)) || (currentPiece.val.canMove(foundBlackKing, list1))) {
										legal = false;
										illegalSource.col = source.col;
										illegalSource.row = source.row;
										illegalDestination.col = destination.col;
										illegalDestination.row = destination.row;
										break;
									}
									else {
										currentPiece = currentPiece.next;
									}
								}
							}
						else if (inputPiece.color.equals("black") && foundBlackKing != null) {
								// need to check if foundWhiteKing or foundBalckKing is null, then don't do while loop.
								// if (foundWhiteKing != null || foundBlackKing != null ) {
								while(currentPiece != null || !legal) {
									if((currentPiece.val.canMove(foundWhiteKing, list1)) || (currentPiece.val.canMove(foundBlackKing, list1))) {
										legal = false;
										illegalSource.col = source.col;
										illegalSource.row = source.row;
										illegalDestination.col = destination.col;
										illegalDestination.row = destination.row;
										break;
									}
									else {
										currentPiece = currentPiece.next;
									}
								}
							}*/
							if (inputPiece.color.equals("white") && foundWhiteKing != null) {
								// need to check if foundWhiteKing or foundBalckKing is null, then don't do while loop.
								// if (foundWhiteKing != null || foundBlackKing != null ) {
								while(currentPiece != null || !legal) {
									if(currentPiece.val.canMove(foundWhiteKing, list1)) {
										legal = false;
										illegalSource.col = source.col;
										illegalSource.row = source.row;
										illegalDestination.col = destination.col;
										illegalDestination.row = destination.row;
										break;
									}
									else {
										currentPiece = currentPiece.next;
									}
								}
							}
						else if (inputPiece.color.equals("black") && foundBlackKing != null) {
								// need to check if foundWhiteKing or foundBalckKing is null, then don't do while loop.
								// if (foundWhiteKing != null || foundBlackKing != null ) {
								while(currentPiece != null || !legal) {
									if(currentPiece.val.canMove(foundBlackKing, list1)) {
										legal = false;
										illegalSource.col = source.col;
										illegalSource.row = source.row;
										illegalDestination.col = destination.col;
										illegalDestination.row = destination.row;
										break;
									}
									else {
										currentPiece = currentPiece.next;
									}
								}
							}
						}
						else {
							legal = false;
							illegalSource.col = source.col;
							illegalSource.row = source.row;
							illegalDestination.col = destination.col;
							illegalDestination.row = destination.row;
							break;
							//out.println(source.col + " " + source.row + " " + destination.col + " " + destination.row + " " + "illegal");
							//break;
						}
					}
					else { 
						//a king cannot capture a king
						if((inputPiece.type == 'k' && foundDestination.type == 'K' && inputPiece.canMove(foundDestination, list1)) || (inputPiece.type == 'K' && foundDestination.type == 'k' && inputPiece.canMove(foundDestination, list1))) {
							legal = false;
							illegalSource.col = source.col;
							illegalSource.row = source.row;
							illegalDestination.col = destination.col;
							illegalDestination.row = destination.row;
							break;
						}
						
						//if the destination spot has a chess piece in it already
						//check if the source can attack the destination and capture it
						if(inputPiece.canMove(foundDestination, list1)) {
							//k 2 3 K 3 4: 2 3 3 4
							list1.delete(foundDestination);// delete the captured piece.
							//list1.display();
							//move the source to the destination by changing the source's coordinates to the destination's coordinates
							tempcol = destination.col;
							foundSource.col = tempcol;
							c = foundSource.col;

							temprow = destination.row;
							foundSource.row = temprow;
							r = foundSource.row;

							//list1.delete(foundDestination);// delete the captured piece.
							//source.col and source.row are now the destination's col and row
							//list1.display();
							//out.println(Integer.valueOf(c));
							//out.println(Integer.valueOf(r));
							//out.println(foundSource.type);
							//out.println("Legal");

							ChessPiece foundWhiteKing = list1.findKing("white");
							ChessPiece foundBlackKing = list1.findKing("black");
							Node currentPiece = list1.head;

							if (inputPiece.color.equals("white") && foundWhiteKing != null) {
								// need to check if foundWhiteKing or foundBalckKing is null, then don't do while loop.
								// if (foundWhiteKing != null || foundBlackKing != null ) {
								while(currentPiece != null || !legal) {
									if(currentPiece.val.canMove(foundWhiteKing, list1)) {
										legal = false;
										illegalSource.col = source.col;
										illegalSource.row = source.row;
										illegalDestination.col = destination.col;
										illegalDestination.row = destination.row;
										break;
									}
									else {
										currentPiece = currentPiece.next;
									}
								}
							}
						else if (inputPiece.color.equals("black") && foundBlackKing != null) {
								// need to check if foundWhiteKing or foundBalckKing is null, then don't do while loop.
								// if (foundWhiteKing != null || foundBlackKing != null ) {
								while(currentPiece != null || !legal) {
									if(currentPiece.val.canMove(foundBlackKing, list1)) {
										legal = false;
										illegalSource.col = source.col;
										illegalSource.row = source.row;
										illegalDestination.col = destination.col;
										illegalDestination.row = destination.row;
										break;
									}
									else {
										currentPiece = currentPiece.next;
									}
								}
							}
						}
						else {
							legal = false;
							illegalSource.col = source.col;
							illegalSource.row = source.row;
							illegalDestination.col = destination.col;
							illegalDestination.row = destination.row;
							break;
							//out.println(source.col + " " + source.row + " " + destination.col + " " + destination.row + " " + "illegal");
							//break;
						}
					}
				}	

			} //for
			if(legal == false) {
				out.println(illegalSource.col + " " + illegalSource.row + " " + illegalDestination.col + " " + illegalDestination.row + " " + "illegal");
			}
			else {
				out.println("legal");
			}
		} //while
		//close files
		in.close();
		out.close();
	}
	//private 
}
