
class Point {
	private double x1;
	private double y1;
	
	// Creates an instance of point using its x and y coordinates.
	public Point(double x, double y) {
		this.x1 = x; //x1 = x works too and for y
		this.y1 = y;
	}

	// Returns the x coordinate of the point.
	public double getX() {
		return x1;
	}

	// Returns the y coordinate of the point.
	public double getY() {
		return y1;
	}

	// Returns the Euclidean distance of the point from a given point. (Remember
	// getDistance() method in Assignment 3?)
	public double getDistance(Point point) {
		double xDistance = Math.pow(this.x1 - point.x1, 2);
		double yDistance = Math.pow(this.y1 - point.y1, 2);
		double distance = Math.sqrt(xDistance + yDistance);
		return distance;
	}
}

abstract class Shape {
	// It calculates and returns the area of a shape. Note that the method is
	// abstract and all concrete subclasses of shape should implement it.
	public abstract double getArea();

	// It calculates and returns the perimeter of a shape. Again, this method is
	// abstract and all concrete subclasses of shape should implement it.
	public abstract double getPerimeter();

}


interface Symmetric {

	// Returns an object of type Point which is the point of symmetry (or center of
	// symmetry) of a shape. This method is abstract and each concrete class that
	// implements the interface should implement it.
	Point getPointOfSymmetry();
	
}

class Triangle extends Shape {
	private Point p1, p2, p3;
	
	// Creates a triangle object using 3 points.
	public Triangle(Point firstPoint, Point secondPoint, Point thirdPoint) {
		this.p1 = firstPoint;
		this.p2 = secondPoint;
		this.p3 = thirdPoint;	
	}

	// Returns the ﬁrst point of the triangle which is the ﬁrst point given in the
	// constructor.
	public Point getFirstPoint() {
		return p1;
	}

	// Returns the second point of the triangle which is the second point given in
	// the constructor.
	public Point getSecondPoint() {
		return p2;
	}

	// Returns the third point of the triangle which is the third point given in the
	// constructor.
	public Point getThirdPoint() {
		return p3;
	}
	

	@Override
	public double getArea() {
		double sideA = p1.getDistance(p2);
		double sideB = p2.getDistance(p3);
		double sideC = p3.getDistance(p1);
		double sides = (sideA + sideB + sideC)/2;
		double area = Math.sqrt(sides*(sides-sideA)*(sides-sideB)*(sides-sideC)); //Heron's formula
		return area;
	}

	@Override
	public double getPerimeter() {
		double side1 = p1.getDistance(p2);
		double side2 = p1.getDistance(p3);
		double side3 = p2.getDistance(p3);
		return side1 + side2 + side3;
	}
}

class Rectangle extends Shape {
	private Point topLeftP;
	private double l;
	private double w;
	
	// Creates a rectangle using the top-left corner of the rectangle and its length
	// and width.
	public Rectangle(Point topLeftPoint, double length, double width) {
		this.topLeftP = topLeftPoint;
		this.l = length;
		this.w = width;
	}

	// Returns the top-left corner of the rectangle.
	public Point getTopLeftPoint() {
		return topLeftP;
	}

	// Returns the length of the rectangle.
	public double getLength() {
		return l;
	}

	// Returns the width of the rectangle.
	public double getWidth() {
		return w;
	}

	@Override
	public double getArea() {
		return l * w;
	}

	@Override
	public double getPerimeter() {
		return (l * 2) + (w * 2);
	}
}

class Trapezoid extends Shape {
	private Point topLeftP;
	private Point bottomLeftP;
	private double topS;
	private double bottomS;
	
	// Creates a trapezoid using top-left and bottom-left corners as well as the
	// length of the top and bottom sides.
	public Trapezoid(Point topLeftPoint, Point bottomLeftPoint, double topSide, double bottomSide) {
		this.topLeftP = topLeftPoint;
		this.bottomLeftP = bottomLeftPoint;
		this.topS = topSide;
		this.bottomS = bottomSide;
	}

	// Returns the top-left corner of the trapezoid.
	public Point getTopLeftPoint() {
		return topLeftP;
	}

	// Returns the bottom-left corner of the trapezoid.
	public Point getBottomLeftPoint() {
		return bottomLeftP;
	}

	// Returns the length of the top side of the trapezoid.
	public double getTopSide() {
		return topS;
	}

	// Returns the length of the bottom side of the trapezoid.
	public double getBottomSide() {
		return bottomS;
	}

	@Override
	public double getArea() {
		double height =topLeftP.getY() - bottomLeftP.getY();
		double area = 0.5 * height * (topS + bottomS);
		return area;
	}

	@Override
	public double getPerimeter() {
		double xTopP = topLeftP.getX() + topS;
		double yTopP = topLeftP.getY();
		Point topRightP = new Point(xTopP, yTopP);
		double xBottomP = bottomLeftP.getX() + bottomS;
		double yBottomP = bottomLeftP.getY();
		Point bottomRightP = new Point(xBottomP, yBottomP);
		double rightS = topRightP.getDistance(bottomRightP);
		double leftS = topLeftP.getDistance(bottomLeftP);
		double perimeter = topS + leftS + bottomS + rightS;
		return perimeter;
	}
}

class Circle extends Shape implements Symmetric { 
	private Point centerP;
	private double r;

	// Creates a circle using its center and radius.
	public Circle(Point center, double radius) {
		this.centerP = center;
		this.r = radius;
	}

	// Returns center of the circle.
	public Point getCenter() {
		return centerP;
	}

	// Returns radius of the circle.
	public double getRadius() {
		return r;
	}

	@Override
	public Point getPointOfSymmetry() {
		return centerP;
	}

	@Override
	public double getArea() {
		return Math.PI * Math.pow(r,  2);
	}

	@Override
	public double getPerimeter() {
		return 2 * Math.PI * r;
	}
}

class EquilateralTriangle extends Triangle implements Symmetric {
	private Point topP;
	private double side;
	
	 //Creates an equilateral triangle using the top point and its side length. Note
	 //that the other two corners (points) have the same ‘y’ value. Also,
	 //getFirstPoint(), getSecondPoint(), and getThirdPoint() methods should return
	 //the top, bottom-left, and bottom-right corners, respectively.
	public EquilateralTriangle(Point topPoint, double side) {
		//super(topPoint, this.getRightPoint(topPoint, side), getLeftPoint(topPoint, side));
		super(topPoint, new Point(topPoint.getX() - (side * 0.5), topPoint.getY() - Math.sqrt(Math.pow(side, 2) - Math.pow(side*0.5, 2))),
				new Point(topPoint.getX() + (side * 0.5), topPoint.getY() -  Math.sqrt(Math.pow(side, 2) - Math.pow(side*0.5, 2))));
		this.topP = topPoint;
		this.side = side;
	}

	// Returns the top corner of the equilateral triangle.
	public Point getTopPoint() {
		return topP;
	}

	// Returns the side length of the equilateral triangle.
	public double getSide() {
		return side;
	}

	@Override
	public Point getPointOfSymmetry() {
		double height = Math.sqrt(Math.pow(side, 2) - Math.pow((side * 0.5), 2));
		double radius = (0.6666667) * height;
		double symmetryX = topP.getX(); //x doesn't change
 		double symmetryY = topP.getY() - radius;
 		Point symmetryP = new Point(symmetryX, symmetryY);
		return symmetryP;
	}
}

class Square extends Rectangle implements Symmetric {
	private Point topLeftP;
	private double side;
	
	// Creates a square using the top-left corner and its side length.
	public Square(Point topLeft, double side) {
		super(topLeft, side, side);
		this.topLeftP = topLeft;
		this.side = side;
	}

	// Returns the side length of the square.
	public double getSide() {
		return side;	
	}

	@Override
	public Point getPointOfSymmetry() {
		double radius = side/2;
		double symmetryX = topLeftP.getX() + radius;
		double symmetryY = topLeftP.getY() - radius;
		Point symmetryP = new Point(symmetryX, symmetryY);
		return symmetryP;
	}
}

class Plane {
	private static final int Square = 0;
	private Shape[] shapeArray; 
	
	// Creates an empty plane.
	public Plane() {
		shapeArray = new Shape[] {};
	}

	// Returns an array of shape objects on the plane. The order of objects is not
	// important.
	public Shape[] getShape() {
		return shapeArray;
	}

	// Takes a shape object and adds it to the array of shapes on the plane.
	// (Remember addPoint() method in Assignment 3?)
	public void addShape(Shape shape) {
        Shape[] newShapeArray = new Shape[shapeArray.length + 1];//creating an array that's bigger by 1
		System.arraycopy(shapeArray, 0, newShapeArray, 0, shapeArray.length); // copy everything that's in the current shapeArray into the larger newShapeArray      
		newShapeArray[shapeArray.length] = shape; //puts shape object into newShapeArray
		shapeArray = newShapeArray;
	}

	// Calculates the sum of the areas of all the shapes on the plane. If there is
	// any overlapped area, it will be counted twice.
	public double getSumOfAreas() {
		double sum = 0;
		for(int i = 0; i < shapeArray.length; i++) {
			sum = sum + shapeArray[i].getArea();
		}
		return sum;
		
	}

	// Calculates the sum of the perimeters of all the shapes on the plane.
	public double getSumOfPerimeters() {
		double sum = 0;
		for(int i = 0; i < shapeArray.length; i++) {
			sum = sum + shapeArray[i].getPerimeter();
		}
		return sum;
	}
	
	 //Returns the center of all points of symmetry of symmetric shapes. Center of
	 //symmetry of a set of points is a point with x coordinate being the average of
	 //x coordinate of the points, and y coordinate being the average of y
	 //coordinates of the points. If there is no symmetric shapes on the plane,
	 //returns null. You might need to read about ‘instanceof’ operator to complete
	 //this method (Suggested link). 
	public Point getCenterOfPointOfSymmetries() {
		double xSum = 0;
		double ySum = 0;
		double x = 0;
		double y = 0;
		double averageX = 0;
		double averageY = 0;
		double shapeCount = 0;
		for(int i = 0; i < shapeArray.length; i++) {
			if(shapeArray[i] instanceof Circle) {
				Circle circle = (Circle)shapeArray[i];
				Point cP = circle.getPointOfSymmetry();
				//Point cP = ((Circle)shapeArray[i]).getPointOfSymmetry();
				x = cP.getX();
				y = cP.getY();
				shapeCount++;
				xSum = xSum + x;
				ySum = ySum + y;
			}
			
			else if(shapeArray[i] instanceof EquilateralTriangle) {
				EquilateralTriangle equiTri = (EquilateralTriangle)shapeArray[i];
				Point etP = equiTri.getPointOfSymmetry();
				//Point etP = ((EquilateralTriangle)shapeArray[i]).getPointOfSymmetry();
				x = etP.getX();
				y = etP.getY();
				shapeCount++;
				xSum = xSum + x;
				ySum = ySum + y;
			}
			
			else if(shapeArray[i] instanceof Square) {
				Square square = (Square)shapeArray[i];
				Point sP = square.getPointOfSymmetry();
				//Point sP = ((Square)shapeArray[i]).getPointOfSymmetry();
				x = sP.getX();
				y = sP.getY();
				shapeCount++;
				xSum = xSum + x;
				ySum = ySum + y;
			}
		}
		
		if(shapeCount == 0) {
			return null;
		}
		averageX = xSum / shapeCount;
		averageY = ySum / shapeCount;
		Point centerP = new Point(averageX, averageY);
		return centerP;
		
	}
}
