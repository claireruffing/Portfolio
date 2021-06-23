# Claire Ruffing
# cmruffin
# Makefile for HW1 NQueens problem

NQueens: NQueens.class 
	echo Main-class: NQueens > Manifest
	jar cvfm NQueens.jar Manifest NQueens.class Queen.class NQueensSortByColumn.class
	del Manifest

NQueens.class: NQueens.java 
	javac -Xlint NQueens.java

Queen.class: Queen.java
	javac -Xlint Queen.java

clean:
	del -f NQueens.jar NQueens.class



