namespace Domain;

public class Vector
{
    public Point A { get; set; }
    public Point B { get; set; }
    
    public Double Distance => Math.Sqrt(((A.X - B.X) * (A.X - B.X)) + ((A.Y - B.Y) * (A.Y - B.Y)));
}