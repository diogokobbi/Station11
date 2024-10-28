using Domain;
using System.Linq;

namespace Application;

public class CoordinatesCalculator: ICoordinatesCalculator
{
    public Coordinates? GetCoordinates(Point point, IList<Point> polylinePoints)
    {
        var polyline = new Polyline(polylinePoints);
        Vector? closestVector = polyline.ClosestVector(point);
        
        var stationPolyline = _buildStationPolyline(polylinePoints, closestVector, point);

        return closestVector != null
        ? new Coordinates(point, polyline.Points, closestVector.Location(point), closestVector.Offset(point), stationPolyline.Station)
            : null;
        
        Polyline? _buildStationPolyline(IList<Point> polylinePoints, Vector? shortestVector, Point? point)
        {
            var shortestLocation = shortestVector.Location(point);
            var stationPolylinePoints = new List<Point>();
            foreach (var polylinePoint in polylinePoints)
            {
                if (polylinePoint.X == shortestVector.B.X && polylinePoint.Y == shortestVector.B.Y)
                {
                    stationPolylinePoints.Add(shortestLocation);
                    break;
                }
                else
                {
                    stationPolylinePoints.Add(polylinePoint);
                }
            }
            return stationPolylinePoints.Any() 
                                        ? new Polyline(stationPolylinePoints) 
                                        : null;
            
        }
    }
}