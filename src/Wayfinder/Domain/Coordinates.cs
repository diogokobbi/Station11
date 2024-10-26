using System.Collections.Immutable;

namespace Domain;

public class Coordinates
{
    public Point Point { get; }
    public IImmutableList<Vector> Polyline { get; }
    public Point Location { get; }
    public decimal Offset { get; }
    public decimal Station { get; }

    public Coordinates(Point point, IImmutableList<Vector> polyline, Point location, decimal offset, decimal station)
    {
        this.Point = point;
        this.Polyline = polyline;
        this.Location = location;
        this.Offset = offset;
        this.Station = station;
    }
}