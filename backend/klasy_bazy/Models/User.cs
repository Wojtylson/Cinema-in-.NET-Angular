using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class User
{
    public bool Active { get; set; }

    public string Email { get; set; } = null!;
    public int Id { get; set; }

    public bool IsAdmin { get; set; }

    public string Password { get; set; } = null!;
    public ICollection<Reservation>? Reservations { get; set; }


}