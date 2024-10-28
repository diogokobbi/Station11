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
        //TODO: validate request
        request.Point = new Point(-22.412260, -42.966400);
        request.PolylinePoints = new List<Point>
        {
            new Point(-22.906847, -43.172897), 
            new Point(-22.509911, -43.175480),
            new Point(-21.764940, -43.348969), 
            new Point(-20.139370, -44.886990),
        };
        var newCoordinates = _calculator.Calculate(request.Point, request.PolylinePoints);
        return newCoordinates;
    }
}