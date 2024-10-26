namespace Domain;
public class Point
{
    public double X { get; }
    public double Y { get; }
    public double Magnitude => Math.Sqrt((X * X) + (Y * Y));

    public Point(double x, double y)
    {
        this.X = x;
        this.Y = y;
    }
}