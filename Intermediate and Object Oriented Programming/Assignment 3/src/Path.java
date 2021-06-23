class Path {
    //int pathPoint;
    int[][] path;
  
    //Creates an empty path (without any point). The length of an empty path is zero.
    Path() {
        path = new int[][] {}; //empty array
    }
  

    //Adds a 2D point with (x, y) dimensions to the end of the path and returns the updated path object. Remember that you do not need to create a new path, you just need to update the path by adding another point and returning the updated path. With this technique you can add multiple points to a path in one line: myPath.addPoint(7, 2).addPoint(2, 6);
    Path addPoint(int x, int y) {
        int[][] newPath = new int[path.length + 1][2];//creating an array that's bigger by 1
       
        System.arraycopy(path, 0, newPath, 0, path.length); // copy everything that's in the current path into the larger newPath      
		newPath[path.length][0] = x; //assigns x value of the added point into the last row and first column of the larger newPath
		newPath[path.length][1] = y; //assigns y value of the added point into the last row and second column of the larger newPath
        path = newPath;
     
        return this;
    }

    /*Returns one string in the format of “(x, y)” which x and y are dimensions of i-th point in the
        path.*/
    String getPoint(int i) {
		return "(" + path[i][0] + ", " + path[i][1] + ")"; //returns the i-th row of the path, which is the i-th point 
    }

    //Returns the number of points in the path.
    int numOfPoints() {
        return path.length; // return the number of rows which is the number of points in the path
    }

    //Removes i-th point from the path. Indexing of the points on the path starts from zero. If the ith point does not exist, it returns false, otherwise, returns true.
    boolean removePoint(int i) {
        if(i < path.length) {
        	int[][] newPath = new int [path.length - 1][2]; //creating a new path array that is smaller by 1
			System.arraycopy(path, 0, newPath, 0, i); //copies all elements from 0 until point i into newPath
			System.arraycopy(path, i + 1, newPath, i, path.length - i - 1); //copies all elements after point i into newPath
			path = newPath;            
            return true;
        }
        else {
            return false;
        }
   }

    //Adds path p to the current path by adding all the points of path p to the end of the current path object by keeping the order of the points in path p.
    void addPath(Path p) {
        for(int i = 0; i < p.numOfPoints(); i++) {
            this.addPoint(p.path[i][0], p.path[i][1]); // keep adding points to the current path since addPoint() returns the new path each time
        }
    }

    //Returns the length of the path by summing all the distance between any two consecutive points.
    double getLength() {
        double sum = 0;
        for(int i = 0; i < path.length-1; i++) {
            sum = sum + Math.sqrt(Math.pow(path[i][0]-path[i+1][0], 2) + Math.pow(path[i][1]-path[i+1][1], 2));
        }
        return sum;
    }

    //Returns the distance between the first and last point on the path.
    double getDistance() {
        return Math.sqrt(Math.pow(path[0][0] - path[path.length-1][0], 2) + Math.pow(path[0][1] - path[path.length-1][1], 2));
    }

    //Returns true if length of the current path object is greater than the length of the the object passed as an argument.
    boolean isLonger(Path p) {
        if(this.getLength() > p.getLength()) {
            return true;
        }
        else {
            return false;
        }
    }
}