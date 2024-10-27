using System.Collections.Immutable;
using System.Data.Common;
using Domain;

namespace Application;

public class CoordinatesCalculator: ICoordinatesCalculator
{
    public Coordinates? Calculate(Point point, IList<Point> polylinePoints)
    {
        //Todo: replace with build polyline from polyline points
        var polyline = new Polyline(polylinePoints);
        
        //TODO: calculate offset
        var offset = 520;
        
        //TODO: calculate location
        var location = new Point(-22.420349, -43.196453);
        
        //TODO: build station polyline
        var stationPolylinePoints = new List<Point>
        {
            new Point(-22.906847, -43.172897), 
            new Point(-22.509911, -43.175480),
            new Point(-21.764940, -43.348969), 
            new Point(-20.139370, -44.886990),
        };
        var stationPolyline = new Polyline(stationPolylinePoints);
        
        //TODO: calculate station
        var station = stationPolyline.Station;
        
        return new Coordinates(point, polyline.Points, location, offset, station);
    }
}