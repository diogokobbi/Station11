namespace Tests;
using Domain;

public class PointTests
{
    [Theory]
    [InlineData(2, 4, 4.472)]
    public void Point_ReturnsCorrectMagnitude(double Px, double Py, double Magnitude)
    {
        var point = new Point(Px, Py);
        Assert.Equal(Math.Round(point.Magnitude, 3), Magnitude);
    }
}