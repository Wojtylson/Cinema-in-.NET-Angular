using System.ComponentModel.DataAnnotations;
public class Reservation
{
    public int Id { get; set; }
    public User User { get; set; } = null!;
    public ReservationDetails ReservationDetails { get; set; } = null!;
}