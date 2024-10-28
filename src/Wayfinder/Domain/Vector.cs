namespace Domain;

public class Vector
{
    public Point A { get; set; }
    public Point B { get; set; }
    public double Distance => Math.Sqrt(((A.X - B.X) * (A.X - B.X)) + ((A.Y - B.Y) * (A.Y - B.Y)));
    public double? Offset(Point point) {
        var pointsAreValid = point != null && A != null && B != null;
        if (pointsAreValid) {
            var A = point.X - this.A.X;
            var B = point.Y - this.A.Y;
            var C = this.B.X - this.A.X;
            var D = this.B.Y - this.A.Y;
        
            double dot = A * C + B * D;
            double len_sq = C * C + D * D;
            double param = -1;
            if (len_sq != 0) //in case of 0 length line
                param = dot / len_sq;
        
            double xx;
            double yy;
        
            if (param < 0) {
                xx = this.A.X;
                yy = this.A.Y;
            }
            else if (param > 1) {
                xx = this.B.X;
                yy = this.B.Y;
            }
            else {
                xx = this.A.X + param * C;
                yy = this.A.Y + param * D;
            }
        
            var dx = point.X - xx;
            var dy = point.Y - yy;
            return Math.Sqrt(dx * dx + dy * dy);
        }

        return null;
    }

    public Point? Location(Point point)
    {
        var pointsAreValid = point != null && A != null && B != null;
        if (pointsAreValid)
        {
            var A = point.X - this.A.X;
            var B = point.Y - this.A.Y;
            var C = this.B.X - this.A.X;
            var D = this.B.Y - this.A.Y;

            double dot = A * C + B * D;
            double len_sq = C * C + D * D;
            double param = -1;
            if (len_sq != 0) //in case of 0 length line
                param = dot / len_sq;

            double xx;
            double yy;

            if (param < 0)
            {
                xx = this.A.X;
                yy = this.A.Y;
            }
            else if (param > 1)
            {
                xx = this.B.X;
                yy = this.B.Y;
            }
            else
            {
                xx = this.A.X + param * C;
                yy = this.A.Y + param * D;
            }
            return new Point(xx, yy);
        }
        return null;
    }

    public Vector(Point a, Point b)
    {
        this.A = a;
        this.B = b;
    }
    
}