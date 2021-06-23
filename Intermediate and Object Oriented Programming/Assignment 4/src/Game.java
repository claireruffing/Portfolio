import java.util.Random;

class Game {
	
	public static void main(String[] args){  
		Player[] players = new Player[3];   
		players [0] = new Player("abc");   
		players [1] = new Player("def");  
		players [2] = new Player("ghi");   
		Board myBoard = new Board(5);   
		myBoard.setCellToLadder(7, 17);   
		myBoard.setCellToLadder(5, 14);  
		myBoard.setCellToSnake(19, 8);   
		myBoard.setCellToSnake(16, 4); 
	  Game game = new Game(myBoard, players);  
	  Player p = new Player("jkl");
	  game.addPlayer(p); 
	  boolean b = false;  
	  Random random = new Random();  
	  int n; 
	  while (!b) {   
		  n = random.nextInt(6) + 1;  
		  b = game.play(n);   
		  }   
	  System.out.println(game.currentPlayer().getName()); 
	  }  
	
	
	Player[] gamePlayers;
	Board boardGame;
	
	// Creates a game with the board and players passed to constructor.
	public Game(Board board, Player[] players) {
		gamePlayers = players;
		boardGame = board;		
	}

	// Creates a game with a 10-by-10 board and the players which are passed to it.
	public Game(Player[] players) {
		gamePlayers = players;
		gamePlayers = new Player[10];
	}

	// Speciﬁes the current player.
	public Player currentPlayer() {
		gamePlayers = 
	}

	// Adds a player to the list of players and the player will be placed in the
	// ﬁrst cell.
	public void addPlayer(Player p) {
		
	}

	// Determines whether the current player has reached the last cell.
	public boolean winner() {
		
	}

	// Moves current player ’n’ cells forward.
	public void movePlayer(int n) {
		
	}

	// This is the main method in your game, which moves the current player to the
	// correct cell
	// and also checks whether the game is ﬁnished or not. If found a winner,
	// returns true, otherwise returns false.
	public boolean play(int moveCount) {
		
	}

	// Returns board of the game.
	public Board getBoard() {
		
	}
}

class Player {
	private String playerName;
	private int playerPosition;
	
	// This is the constructor of the player class.
	public Player(String name) {
		this.playerName = name;
	}

	/// Moves the player to the speciﬁed position.
	public void setPosition(int position) {
		this.playerPosition = position;
	}

	// Returns position of the player.
	public int getPosition() {
		return playerPosition;
	}

	// Returns player’s name.
	public String getName() {
		return playerName;
	}

	// Returns “Name @ cell-number”. e.g: narges @ 12.
	public String toString() {
		return playerName + " @ " + playerPosition;
	}
}

class Cell {
	private int num;
	private Cell[] cell;
	private Board ladder;
	
	// Creates a cell and assigns its number.
	public Cell(int number) {
		num = number;
		Cell[] cell = new Cell[num];
	}

	// Fills or releases the cell.
	public void setOccupied(boolean occupied) {
		for(int i = 0; i < cell.length; i++) {
			if(cell[i] > 0) {
				occupied = true;
		}
			else {
				occupied = false;
			}
		}
	}

	// Determines whether this cell is occupied.
	public boolean isOccupied() {
		for(int i = 0; i < cell.length; i++) {
			if(cell[i].isOccupied()) {
				return true;
			}
		}
		return false;
	}

	// Returns the Ladder which is in the current cell. Returns null if there is no
	// Ladder with start in this cell.
	public Ladder getLadder() {
		
	}

	// Returns the Snake which is in the current cell. Returns null if there is no
	// Snake with head in this cell.
	public Snake getSnake() {
		
	}

	// Sets a Ladder with start in the current cell.
	public void setLadder(Ladder ladder) {
		
	}

	// Returns the Snake with head in the current cell.
	public void setSnake(Snake snake) {
		
	}

	// Returns number of the cell.
	public int getNumber() {
		return num;
	}
}

class Board {
	private Cell[][] board;
	private int startP;
	private int endP;
	private int headP;
	private int tailP;
	
	// Creates an n-by-n board.
	public Board(int n) {
		board = new Cell[n][n];
	}

	// Puts a ladder on the map of the game. You need to associate the ladder with
	// the cell at startPosition.
	public void setCellToLadder(int startPosition, int endPosition) {
		this.startP = startPosition;
		this.endP = endPosition;
		Board ladders = board[startP][endP].getLadder();
		//Cell[] allCells = new Cell[endP];
	}

	// Puts a snake on the map of the game. You need to associate the snake with the
	// cell at headPosition.
	public void setCellToSnake(int headPosition, int tailPosition) {
		this.headP = headPosition;
		this.tailP = tailPosition;
		Board snakes = board[headP][tailP].getSnake(headP, tailP);

	}

	// Returns all cells of the board.
	public Cell[] getCells() {
		int sum = 0;
		Cell[] allCells = new Cell[board.length];
		for(int i = 1; i < board.length; i++) {
			for(int j = 0; j < board[i].length; j++) {
				allCells[sum] = board[i][j];
				sum++;
			}
		}
		return allCells;
	}

class Snake {
	private int headP;
	private int tailP;
	
	// Creates a snake with speciﬁed location of head and tail.
	public Snake(int headPosition, int tailPosition) {
		this.headP = headPosition;
		this.tailP = tailPosition;
	}

	// Returns the position of the snake’s tail.
	public int getTail() {
		return this.tailP;
	}

	// Returns: head – tail. e.g: 20 – 11.
	public String toString() {
		return headP + " - " + tailP;
	}
}

class Ladder {
	private int startP;
	private int endP;
	
	// Creates a ladder which connects cells with speciﬁed location of start and end
	// of the ladder.
	public Ladder(int startPosition, int endPosition) {
		this.startP = startPosition;
		this.endP = endPosition;
		
	}

	// Returns position of the top (end) of the ladder.
	public int getTop() {
		return startP;
	}

	// Returns: start – end.. e .g: 10 – 18.
	public String toString() {
		return startP + " - " + endP;
	}
}
}
