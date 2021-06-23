import java.util.*;
import java.text.*;
 
 
public class Linearize {
 
    public static void main(String[] args) {
 
        // Create new Scanner and Random and Decimal objects
        Scanner s = new Scanner (System.in);
        Random g = new Random ();
        DecimalFormat oneplaces = new DecimalFormat (".00");
         
        // Create integers to store user input # of rows and columns
        int rows;
        int columns;
 
        // User prompts
        System.out.print ("How many rows in the array? ");
        rows = s.nextInt();
        System.out.print ("How many columns in the array? ");
        columns = s.nextInt();
         
        // Create Multidimensional array
        double [][] array2d = new double [rows][columns];
         
        // Generate random numbers to fill array 
        for (int i = 0; i < array2d.length; i++){
             
            for (int j = 0; j < array2d[i].length; j++){
                 
                array2d[i][j] = Math.random() * 100;
           // Fill array with decimal numbers between 0 and 100 
            }
        }
        System.out.print ("\nThis 2D array contains: \n");
         
        for (int k = 0; k < array2d.length; k++){
            for (int l = 0; l < array2d[k].length; l++){     
                System.out.print (oneplaces.format(array2d[k][l]) + ", ");
                // Print 2D array of rows and columns
            }
            System.out.println ();
           // Organize array into a chart 
        }
         
        System.out.println ("\nConverted to a 1D array: ");
         
        int count = 0; // Create counter variables
        int count2 = 0;
         
        for (int m = 0; m < array2d.length; m++){
           // Determine length of 2D array
            count += array2d[m].length;
        }
     
            double[] array1d = new double[count];
          // Initialize 1D array
     
            for (int m = 0; m < array2d.length; m++){
                System.arraycopy (array2d[m], 0, array1d, count2, array2d[m].length);
                // Copy 2D array's contents to 1D array elements
                count2 += array2d[m].length;
                System.out.print (oneplaces.format(array1d[m]) + ", ");
               // Print out 1d array with 2d array's variables
            }
            
            /*int sum1 = 0;
    		int sum2 = 0;
    		for(int i = 0; i < board.length; i++) {
    			sum1 = sum1 + board[i].length;
    		}
    		Cell[] allCells = new Cell[sum1];
    		
    		for(int i = 0; i < board.length; i++) {
                System.arraycopy(board[i], 0, allCells, sum2, board[i].length);
    				sum2 = sum2 + board[i].length;
    				allCells[sum2] = ;
    			}
    		allCells
    		return allCells;*/
    }   
}