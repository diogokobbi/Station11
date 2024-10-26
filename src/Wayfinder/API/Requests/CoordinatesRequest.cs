using Domain;

namespace API.Requests;

public class CoordinatesRequest
{
    public Point Point { get; set; }
    public IList<Point> PolylinePoints { get; set; }
}