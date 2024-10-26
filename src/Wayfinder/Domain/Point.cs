namespace Domain;
public class Point
{
    public double X { get; set; }
    public double Y { get; set; }
    public double Magnitude => Math.Sqrt((X * X) + (Y * Y));
}