using System.ComponentModel.DataAnnotations;
public class ReservationDetails
{
    public int Id { get; set; }
    public Movie Movie { get; set; } = null!;
    public string Hour { get; set; } = null!;
    public string Day { get; set; } = null!;
    public List<int>? Seats { get; set; }
}