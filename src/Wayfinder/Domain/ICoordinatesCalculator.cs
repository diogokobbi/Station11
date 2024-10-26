namespace Domain;

public interface ICoordinatesCalculator
{
    public Coordinates? Calculate(Point point, IList<Point> PolylinePoints);
}