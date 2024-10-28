using System.Collections.Immutable;

namespace Domain;

public class Polyline
{
    public IList<Point> Points { get; }
    public IList<Vector> Vectors { get; }
    public Double Station => this.Vectors.Sum(v => v.Distance);

    public Polyline(IList<Point> points)
    {
        this.Points = points;
        this.Vectors = new List<Vector>();
        for (int i = 0; i < Points.Count-1; i++)
        {
            Vectors.Add(new Vector(points[i], points[i+1]));
        }
    }
}