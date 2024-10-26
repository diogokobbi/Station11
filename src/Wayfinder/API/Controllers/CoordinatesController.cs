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
    public Coordinates? Post([FromBody] Point point, [FromBody] IList<Point> polylinePoints)
    {
        return _calculator.Calculate(point, polylinePoints);
    }
}