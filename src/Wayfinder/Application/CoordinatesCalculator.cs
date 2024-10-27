using System.Collections.Immutable;
using System.Data.Common;
using Domain;

namespace Application;

public class CoordinatesCalculator: ICoordinatesCalculator
{
    public Coordinates? Calculate(Point point, IList<Point> PolylinePoints)
    {
        //Todo: replace with build polyline from polyline points
        var polyline = new Polyline(new List<Point>
        {
            new Point(150, 200), 
            new Point(100, 45),
            new Point(20, -40),
            new Point(-100, 75),
            new Point(50, 220),
            new Point(125, 100),
            new Point(200, 150),
            new Point(300, 175)
        });
        
        //TODO: calculate offset
        var offset = 520;
        
        //TODO: calculate location
        var location = new Point(50, 220);
        
        //TODO: build station polyline
        var stationPolyline = new Polyline(new List<Point>
        {
            new Point(150, 200), 
            new Point(100, 45),
            new Point(20, -40),
            new Point(-100, 75),
            new Point(50, 220),
            new Point(125, 100),
            new Point(200, 150),
            new Point(300, 175)
        });
        
        //TODO: calculate station
        var station = stationPolyline.Station;
        
        return new Coordinates(point, polyline.Points, location, offset, station);
    }
}