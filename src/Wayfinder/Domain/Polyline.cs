using System.Collections.Immutable;

namespace Domain;

public class Polyline
{
    public IList<Point> Points { get; }
    public IList<Vector> Vectors { get; }
    public Double Station => Math.Round(this.Vectors.Sum(v => v.Distance), 3);

    public Polyline(IList<Point> points)
    {
        this.Points = points;
        this.Vectors = new List<Vector>();
        for (int i = 0; i < Points.Count-1; i++)
        {
            Vectors.Add(new Vector(points[i], points[i+1]));
        }
    }

    public Vector? ClosestVector(Point point)
    {
        Vector? closestVector = null;
        double? shortestOffset = null;
        foreach (var vector in Vectors)
        {
            var vectorOffset = vector.Offset(point);
            if (!shortestOffset.HasValue || vectorOffset < shortestOffset.Value)
            {
                shortestOffset = vectorOffset;
                closestVector = vector;
            }
        }
        return closestVector;
    }
}