import java.util.Comparator;

//class that sorts the columns in increasing order
	public class SortByColumn implements Comparator<Queen> 
	{ 
		public int compare(Queen q1, Queen q2) 
		{ 
			//negative outcome: shows the position earlier in the answer array
			//positive outcome: shows the position later in the answer array
			return q1.col - q2.col; 
		} 
	} 