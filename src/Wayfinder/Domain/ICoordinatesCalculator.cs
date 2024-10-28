namespace Domain;

public interface ICoordinatesCalculator
{
    public Coordinates? GetCoordinates(Point point, IList<Point> PolylinePoints);
}