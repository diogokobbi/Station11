namespace Tests;

public class PolylineTests
{
    [Theory]
    [InlineData(1,0)]
    public void Polyline_ReturnCorrectStation(double x, double y)
    {
        Assert.Equal(x, y);
    }
    
    [Theory]
    [InlineData(1,0)]
    public void Polyline_ReturnCorrectOffset(double x, double y)
    {
        Assert.Equal(x, y);
    }
    
    [Theory]
    [InlineData(1,0)]
    public void Polyline_ReturnCorrectLocation(double x, double y)
    {
        Assert.Equal(x, y);
    }
}