//Claire Ruffing
//cmruffin
//1587910
//HW5
//To create a hash table that does a word analysis of all of the compositions of Shakespeare. 
//The input file consists of the word length and the highest rank according to the word's frequency. 
//The output is the word of that length and rank found in shakespeare.txt.

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Hashtable;
import java.util.Scanner;
import java.util.Set;

public class Bard {

	public static void main(String[] args) throws IOException {
		
		int len; //length of word
		int rank; //highest frequency of a word of length len
		
		//base case: checks if number of command line arguments is not two, then exit
		if(args.length != 2){
			System.out.println("Usage: java -jar Bard.jar <input file> <output file>");
			System.exit(1);
		}
		//shakespeare text file name
		Scanner shakespeare = new Scanner(new File("shakespeare.txt"));
		//creating hash table
		Hashtable<String, Integer> ht = new Hashtable<String, Integer>();
		

		// read lines from shakespeare, extract and print tokens from each line
		while(shakespeare.hasNextLine() ){
			//trims the leading and trailing white spaces, adding a white space at the end
			String text = shakespeare.nextLine().trim() + " ";
			//replaces all of the punctuation with whitespaces
			text = text.replaceAll("[?,.!:;]", " ");
			text = text.replace("[", " ");
			text = text.replace("]", " ");
			//changes all of the words to lower case
			text = text.toLowerCase();
			//split line around white spaces in the shakespeare file
			String[] tokens = text.split("(\\s)+");
			//System.out.println(text);
			
			for(int i = 0; i < tokens.length; i++) {
				//if hash table already contains the key, then increment its value (incrementing frequency of the word)
				if(ht.containsKey(tokens[i])) {
					int value = ht.get(tokens[i]);
					value++;
					ht.put(tokens[i], value);
				}
				else {
					//else put the new word in the hash table with a frequency of one
					ht.put(tokens[i], 1);
				}
			}
		}

		//input file name
		Scanner in = new Scanner(new File(args[0]));
		//output file name
		PrintWriter out = new PrintWriter(new FileWriter(args[1]));
		// read lines from in, extract and print token1s from each line
		while( in.hasNextLine() ){
			//trims the leading and trailing white spaces, adding a white space at the end
			String line = in.nextLine().trim() + " ";
			//checks if the line being checked is empty 
			if(line.length() <= 1) {
				out.println();
				continue;
			}
			//split line around white space 
			String[] tokens = line.split("\\s+");

			//creates the integer object holding the value of the input string info
			len = Integer.valueOf(tokens[0]);
			rank = Integer.valueOf(tokens[1]);
			
			//creating array list of word objects 
			ArrayList<WordObj> Words = new ArrayList<WordObj>();
			//the set of all the keys in the hash table
			Set<String> keys = ht.keySet();
			//iterating over the set of keys to build an array list of wordobj whose length matches the input len
			for(String key : keys) {
				if(key.length() == len) {
					int frequency = ht.get(key);
					WordObj theWord = new WordObj(key.toString(), frequency);
					Words.add(theWord);
				}
			}
			
			//sorting the array list Words by frequency and alphabetically
			Collections.sort(Words, new Sorter());
			//if the rank is greater than the array list size
			//if the rank is less than 0, then no word exists of the input rank
			//and if the array list is empty meaning no words were found of that len and rank
			if((rank >= Words.size()) || (rank < 0) || (Words.size() == 0)) {
				out.println("-");
			}
			else {
				//prints the word from the array list at the input rank
				out.println(Words.get(rank).word);
			}
		}

		//close files
		shakespeare.close();
		in.close();
		out.close();
	}
}
