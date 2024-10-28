using System.Globalization;
using API.Requests;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class CoordinatesController : ControllerBase
{
    private readonly ILogger<CoordinatesController> _logger;
    private readonly ICoordinatesCalculator _calculator;

    public CoordinatesController(ILogger<CoordinatesController> logger, ICoordinatesCalculator calculator)
    {
        _logger = logger;
        _calculator = calculator;
    }

    [HttpPost]
    public Coordinates? Post([FromBody] CoordinatesRequest request)
    {
        //request.Point = new Point(-22.412260, -42.966400);
        var polylinePoints = _parseFile(request.PolylineFile);
        var newCoordinates = _calculator.GetCoordinates(request.Point, polylinePoints);
        return newCoordinates;
    }

    private IList<Point> _parseFile(string fileContent)
    {
        var polylinePoints = new List<Point>();
        var polylineValues = fileContent.Split("\r\n");
        if (polylineValues != null && polylineValues.Any())
        {
            foreach (var pointValues in polylineValues)
            {
                var values = pointValues.Split(",");
                double x,y;
                Double.TryParse(values[0], NumberStyles.Float, CultureInfo.InvariantCulture, out x);
                Double.TryParse(values[1], NumberStyles.Float, CultureInfo.InvariantCulture, out y);
                var point = new Point(x, y);
                polylinePoints.Add(point);
            }
        }

        return polylinePoints;
    }
}