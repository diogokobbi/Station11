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
        var polylinePoints = _parseFile(request.PolylineFile);
        var newCoordinates = _calculator.GetCoordinates(request.Point, polylinePoints);
        return newCoordinates;
    }

    private IList<Point> _parseFile(string fileContent)
    {
        var errorMessage = "Arquivo inválido";
        var polylinePoints = new List<Point>();
        
        var polylineValues = !String.IsNullOrWhiteSpace(fileContent) ? fileContent.Split("\r\n") : null;
        if (polylineValues != null && polylineValues.Any())
        {
            foreach (var pointValues in polylineValues)
            {
                double x,y;
                var values = pointValues.Split(",");
                
                if (values == null || values.Length != 2)
                    throw new ArgumentException(errorMessage);
                if (!Double.TryParse(values[0], NumberStyles.Float, CultureInfo.InvariantCulture, out x))
                    throw new ArgumentException(errorMessage);
                if (!Double.TryParse(values[1], NumberStyles.Float, CultureInfo.InvariantCulture, out y))
                    throw new ArgumentException(errorMessage);
                
                var point = new Point(x, y);
                polylinePoints.Add(point);
            }
        }
        else {
            throw new ArgumentException(errorMessage);
        }

        return polylinePoints;
    }
}