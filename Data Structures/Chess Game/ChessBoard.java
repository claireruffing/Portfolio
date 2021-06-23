import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;
//Claire Ruffing
//cmruffin
//HW2 Maintaining Your Chess Board
//To create a program using linked lists. The input file consists 
//of a query chess piece's position and then other chess piece types 
//with their positions. The output file needs to consist of the type 
//of the query chess piece position and a y if it attacks another 
//chess piece or a n if it does not attack another chesspiece. The 
//chess board is not valid if there are two chesspiece in the same position 
//on the chess board. Otherwise, it is a valid chess board. 
public class ChessBoard {
	
        public static void main(String[] args) throws IOException {

                int c, r;
                //base case: checks if number of command line arguments is not two, then exit
                if(args.length != 2){
                        System.out.println("Usage: java -jar NQueens.jar <input file> <output file>");
                        System.exit(1);
                }
                //input file name
                Scanner in = new Scanner(new File(args[0]));
                //output file name
                PrintWriter out = new PrintWriter(new FileWriter(args[1]));

                // read lines from in, extract and print tokens from each line
                while( in.hasNextLine() ){
                        //trims the leading and trailing white spaces, adding a white space at the end
                        String line = in.nextLine().trim() + " ";
                        //checks if the line being checked is empty 
                        if(line.length() <= 1) {
                        	out.println();
                        	continue;
                        }
                        //split line around white spaces in the input string
                        String[] token = line.split("(\\s)+");

                        //c and r are integer objects holding the values of the string token
                        c = Integer.valueOf(token[0]);    //the fist number in query position (in example 8)
                        r = Integer.valueOf(token[1].substring(0, 1));    ///second number in query position without the colon 

                        LinkedList list = new LinkedList();
                        //iterating through string token starting at token[2]  and the rest of the types
                        for(int i = 2; i < token.length; i = i + 3) {
                                switch (token[i].charAt(0)) {   //switch cases of the types in the input string
                                case 'q': {
                                        //inserting the queen position at c, r into linked list
                                        Queen q = new Queen(Integer.valueOf(token[i+1]), Integer.valueOf(token[i+2]), "white", 'q');
                                        list.insert(q);
                                        break;
                                }
                                case 'Q': {
                                        Queen Q = new Queen(Integer.valueOf(token[i+1]), Integer.valueOf(token[i+2]), "black", 'Q');
                                        list.insert(Q);
                                        break;
                                }
                                case 'r': {
                                        //inserting the rook position at c, r into linked list
                                        Rook rook = new Rook(Integer.valueOf(token[i+1]), Integer.valueOf(token[i+2]), "white", 'r');
                                        list.insert(rook);
                                        break;
                                }
                                case 'R': {
                                        Rook R = new Rook(Integer.valueOf(token[i+1]), Integer.valueOf(token[i+2]), "black", 'R');
                                        list.insert(R);
                                        break;
                                }
                                case 'b': {
                                        //inserting the bishop position at c, r into linked list
                                        Bishop b = new Bishop(Integer.valueOf(token[i+1]), Integer.valueOf(token[i+2]), "white", 'b');
                                        list.insert(b);
                                        break;
                                }
                                case 'B': {
                                        Bishop B = new Bishop(Integer.valueOf(token[i+1]), Integer.valueOf(token[i+2]), "black", 'B');
                                        list.insert(B);
                                        break;
                                }
                                case 'k': {
                                        //inserting the king position at c, r into linked list
                                        King k = new King(Integer.valueOf(token[i+1]), Integer.valueOf(token[i+2]), "white", 'k');
                                        list.insert(k);
                                        break;
                                }
                                case 'K': {
                                        King K = new King(Integer.valueOf(token[i+1]), Integer.valueOf(token[i+2]), "black", 'K');
                                        list.insert(K);
                                        break;
                                }
                                case 'n': {
                                        //inserting the knight position at c, r into linked list
                                        Knight n = new Knight(Integer.valueOf(token[i+1]), Integer.valueOf(token[i+2]), "white", 'n');
                                        list.insert(n);
                                        break;
                                }
                                case 'N': {
                                        Knight N = new Knight(Integer.valueOf(token[i+1]), Integer.valueOf(token[i+2]), "black", 'N');
                                        list.insert(N);
                                        break;
                                }
                                case 'p': {
                                        Pawn p = new Pawn(Integer.valueOf(token[i+1]), Integer.valueOf(token[i+2]), "white", 'p');
                                        list.insert(p);
                                        break;
                                }
                                case 'P': {
                                        Pawn P = new Pawn(Integer.valueOf(token[i+1]), Integer.valueOf(token[i+2]), "black", 'P');
                                        list.insert(P);
                                        break;
                                }

                                }
                        }

                        //displaying the linked list in the console
                        //list.display();

                        //determining if the linked list is valid or not
                        if(!list.isValid()) {
                                out.println("Invalid");
                        }
                        else {
                                //out.print("Is valid ");
                                //see if there is a chess piece position at the query position (use find method)
                                ChessPiece foundPiece = list.find(c, r);
                                if(foundPiece == null) {
                                        out.println("-");
                                }
                                else {
                                        ChessPiece inputPiece = null;
                                        switch (foundPiece.type) {
                                        case 'Q':
                                                inputPiece = new Queen(foundPiece.col, foundPiece.row, "black", foundPiece.type);
                                                break;
                                        case 'q':
                                                inputPiece = new Queen(foundPiece.col, foundPiece.row, "white", foundPiece.type);
                                                break;
                                        case 'R':
                                                inputPiece = new Rook(foundPiece.col, foundPiece.row, "black", foundPiece.type);
                                                break;
                                        case 'r':
                                                inputPiece = new Rook(foundPiece.col, foundPiece.row, "white", foundPiece.type);
                                                break;
                                        case 'B':
                                                inputPiece = new Bishop(foundPiece.col, foundPiece.row, "black", foundPiece.type);
                                                break;
                                        case 'b':
                                                inputPiece = new Bishop(foundPiece.col, foundPiece.row, "white", foundPiece.type);
                                                break;
                                        case 'K':
                                                inputPiece = new King(foundPiece.col, foundPiece.row, "black", foundPiece.type);
                                                break;
                                        case 'k':
                                                inputPiece = new King(foundPiece.col, foundPiece.row, "white", foundPiece.type);
                                                break;
                                        case 'N':
                                                inputPiece = new Knight(foundPiece.col, foundPiece.row, "black", foundPiece.type);
                                                break;
                                        case 'n':
                                                inputPiece = new Knight(foundPiece.col, foundPiece.row, "white", foundPiece.type);
                                                break;
                                        case 'P':
                                                inputPiece = new Pawn(foundPiece.col, foundPiece.row, "black", foundPiece.type);
                                                break;
                                        case 'p':
                                                inputPiece = new Pawn(foundPiece.col, foundPiece.row, "white", foundPiece.type);
                                                break;
                                        }
                                        if (inputPiece.isAttacking(list)) {
                                                out.println(foundPiece.type + " y");
                                        }
                                        //printing out the type of the found chess piece
                                        else {
                                                out.println(foundPiece.type + " n");
                                        }
                                }
                        }
                }
                //close files
                in.close();
                out.close();
        }
}