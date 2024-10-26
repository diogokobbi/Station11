using System.Collections.Immutable;

namespace Domain;

public class Coordinates
{
    public Point Point { get; }
    public IImmutableList<Vector> Polyline { get; }
    public Point Location { get; }
    public double Offset { get; }
    public double Station { get; }

    public Coordinates(Point point, IImmutableList<Vector> polyline, Point location, double offset, double station)
    {
        this.Point = point;
        this.Polyline = polyline;
        this.Location = location;
        this.Offset = offset;
        this.Station = station;
    }
}