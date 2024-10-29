namespace Tests;
using Domain;

public class VectorTests
{
    [Theory]
    [InlineData(3.5, 1.8, 9.0, 4.5, 6.127)]
    public void Vector_ReturnsCorrectDistance(double Ax, double Ay, double Bx, double By, double expectedDistance)
    {
        var pointA = new Point(Ax, Ay);
        var pointB = new Point(Bx, By);
        var vector = new Vector(pointA, pointB);
        Assert.Equal(expectedDistance, vector.Distance);
    }
    
    [Theory]
    [InlineData(-4, -3, 3, 4, 2, 0, 2.121)]
    public void Vector_ReturnsCorrectOffset(double Ax, double Ay, double Bx, double By, double Px, double Py, double Offset)
    {
        var pointA = new Point(Ax, Ay);
        var pointB = new Point(Bx, By);
        var vector = new Vector(pointA, pointB);
        var pointC = new Point(Px, Py);
        var vectorOffset = vector.Offset(pointC);
        Assert.Equal(Math.Round(vectorOffset, 3), Offset);
    }
    
    [Theory]
    [InlineData(-4, -3, 3, 4, 2, 0, 0.5, 1.5)]
    public void Vector_ReturnsCorrectLocation(double Ax, double Ay, double Bx, double By, double Px, double Py, double LX, double LY)
    {
        var pointA = new Point(Ax, Ay);
        var pointB = new Point(Bx, By);
        var vector = new Vector(pointA, pointB);
        var pointC = new Point(Px, Py);
        var location = vector.Location(pointC);
        Assert.NotNull(location);
        Assert.Equal(location.X, LX);
        Assert.Equal(location.Y, LY);
    }
}