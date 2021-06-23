import java.util.Random;

public class Bingo {
	public static void main(String[] args) {
		int[][] numbers1 = {{10, 30, 45, 66, 82}, {3, 25, 11, 63, 78},
				{22, 4, 13, 46, 90}, {5, 23, 12, 6, 85}, {1, 88, 67, 2, 44}};
		//int[][] numbers1 = {{10, 30, 45, 66, 82}, {3, 25, 11, 63, 78},
				//{22, 4, 13, 46, 90}, {5, 23, 12, 6, 85}, {0, 0, 0, 0, 0}};
		Card[] cards1 = new Card[1];
		cards1[0] = new Card(numbers1);
		int[][] numbers2 = {{11, 31, 46, 67, 83}, {4, 26, 12, 64, 79},
				{23, 5, 14, 47, 90}, {6, 24, 13, 7, 86}, {2, 89, 68, 3, 45}};
		Card[] cards2 = new Card[1];
		cards2[0] = new Card(numbers2);
		Player[] players = new Player[2];
		players[0] = new Player("Player1", cards1);
		players[1] = new Player("Player2", cards2);
		Bingo bingo = new Bingo(players);
		Random random = new Random();
		String winners = "";
		while(winners.equals("")){
			int number = random.nextInt(90) + 1;
			winners = bingo.play(number);
		}
		System.out.println(winners);

	}
	
	Player[] bingoPlayers;
	
	//Creates an object of Bingo game by taking an array of players.
	public Bingo(Player[] players) {
		bingoPlayers = players;
	}

	/*This is the main method for playing the game. It takes a number (the number that is called)
			and marks the cells with that number in all players’ cards. It also returns the name of the
			winner, if any. If there is no winner, it return an empty string. If there is more than one
			winner, it returns the name of all winners as one string, separated by space. For example, if
			player1, player2, and player3 win the game in one turn, it returns “player1 player2 player3”.
	 */
	
	public String play(int number) {
		String winners = "";
		for(int i = 0; i < bingoPlayers.length; i++) {
			bingoPlayers[i].markNumber(number);
			if(bingoPlayers[i].isWinner() == true) {
				if(winners.isEmpty()) {
					winners = winners.concat(bingoPlayers[i].getName());
				}
				else {
					winners = winners.concat(" " + bingoPlayers[i].getName());
				}
			}
		}
		return winners;
		}
	}


class Player {
		String playerName;
		Card[] playerCards;
		
	//Creates a player by taking the name of the player and an array of bingo cards for the player.
	public Player(String name, Card[] cards) { //constructor
		playerName = name;
		playerCards = cards;
		//System.out.println(isWinner());
	}

	//Returns the name of the player.
	public String getName() {
		return playerName;
	}

	//Returns player’s bingo cards.
	public Card[] getCards() {
		return playerCards;
	}

	//Checks if the player is a winner.
	public boolean isWinner() {
		for(int i = 0; i < playerCards.length; i++) {	
			if(playerCards[i].isWinner()) {
				return true;
			}
		}
		return false;
	}

	//Takes a number and marks that number in all bingo cards of the player.
	public void markNumber(int number) {
		for(int i = 0; i < playerCards.length; i++) {
			playerCards[i].markNumber(number); //Cards markNumber method
		}
	}
}

	class Card {
		int[][] cardNumbers;
		int numRows = 0;
		int numCols = 0;
		
		//Uses an array of 5 by 5 and fills the bingo card by those numbers.
		public Card(int[][] numbers) { //constructor
			cardNumbers = numbers;
			numRows = numbers.length;
			numCols = numbers[0].length;
		}

		//Returns the number in the cell at row and column of the bingo card.
		public int getNumber(int Row, int Column) {
			return cardNumbers[Row][Column];
		}

		public int getNumRows() {
			return numRows;
		}

		public int getNumCols() {
			return numCols;
		}

		//If the cell at row and column of the card is marked, returns true, otherwise, returns false.
		public boolean isMarked(int row, int column) {
			if(getNumber(row, column) == 0 ) {
			//if(cardNumbers[row][column] == 0) { //means same thing as line above
				return true;
			}
			else {
				return false;
			}
		}

		//Takes a number and if the number exists in the card, marks that cell of the card.
		public void markNumber(int number) {
			for(int i = 0; i < numRows; i++) {
				for(int j = 0; j < numCols; j++) {
					if(getNumber(i, j) == number) {
						//Found the called number. All done!
						cardNumbers[i][j] = 0;
						return;
					}
				}
			}
		}
		
		//Checks if the card is a winner.
		public boolean isWinner() {
			for(int i = 0; i < numRows; i++) { 
				int marked = 0;
				for(int j = 0; j < numCols; j++) { 
					if(isMarked(i, j) == false) {
						break;
					}
					else {
						marked++;
					}
				}
				if(marked == numCols) {
					return true;
				}
			}
			return false;
		}
}


