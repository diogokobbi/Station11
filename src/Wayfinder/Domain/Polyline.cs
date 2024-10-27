using System.Collections.Immutable;

namespace Domain;

public class Polyline
{
    public IList<Point> Points { get; }
    private IList<Vector> Vertices { get; }
    public Double Station => this.Vertices.Sum(v => v.Distance);

    public Polyline(IList<Point> points)
    {
        this.Points = points;
        this.Vertices = new List<Vector>();
        for (int i = 0; i < Points.Count-1; i++)
        {
            Vertices.Add(new Vector(points[i], points[i+1]));
        }
    }
}