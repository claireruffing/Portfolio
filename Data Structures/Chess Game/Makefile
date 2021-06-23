# Claire Ruffing
# cmruffin
# Makefile for HW2 Maintaining Your Chess Board

JAVASRC	   = ChessBoard.java Node.java LinkedList.java ChessPiece.java Rook.java Bishop.java Queen.java King.java Knight.java Pawn.java
SOURCES    = README Makefile $(JAVASRC)
MAINCLASS  = ChessBoard
CLASSES    = ChessBoard.class Node.class LinkedList.class ChessPiece.class Rook.class Bishop.class Queen.class King.class Knight.class Pawn.class
JARFILE    = ChessBoard.jar

all: $(JARFILE)

$(JARFILE): $(CLASSES)	
	echo Main-class: $(MAINCLASS) > Manifest 
	jar cvfm $(JARFILE) Manifest $(CLASSES)
	del Manifest
	
$(CLASSES): $(JAVASRC)
	javac -Xlint $(JAVASRC)	

clean:
	del $(CLASSES) $(JARFILE)



