using Domain;

namespace API.Requests;

public class CoordinatesRequest
{
    public Point Point { get; set; }
    public string PolylineFile { get; set; }
}