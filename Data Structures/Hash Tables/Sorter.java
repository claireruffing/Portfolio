import java.util.Comparator;

//class that sorts wordobj value by their frequencies, and then sorts wordobj words alphabetically
public class Sorter implements Comparator<WordObj>{

			@Override
			public int compare(WordObj obj1, WordObj obj2) {
				//descending order by frequency
				int val = obj2.frequency - obj1.frequency;
				if(val == 0) {
					//sorting words alphabetically
					return obj1.word.compareTo(obj2.word);
				}
				return val;
			} 
}
