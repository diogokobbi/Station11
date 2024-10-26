using System.Collections.Immutable;

namespace Domain;

public class Polyline
{
    public IImmutableList<Vector> Vertices { get; }
    public Double Station => this.Vertices.Sum(v => v.Distance);

    public Polyline(IList<Vector> vertices)
    {
        this.Vertices = vertices.ToImmutableList();
    }
}