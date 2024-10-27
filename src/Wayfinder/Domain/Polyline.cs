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
        //Todo: build vertices
    }
}