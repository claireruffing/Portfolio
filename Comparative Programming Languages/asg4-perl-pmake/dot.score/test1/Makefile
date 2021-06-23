# $Id: Makefile,v 1.4 2021-02-17 17:59:40-08 - - $

# Check if hello.c is a target. If its not check if its a file
# hello is the first goal

hello : hello.c
	gcc hello.c -o hello

bad : bad.c
	gcc bad.c -o bad

clean :
	- rm -v hello bad
