using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

public class KinoDbContext : DbContext
{

    public KinoDbContext() { }
    public DbSet<User> Users { get; set; }
    public DbSet<Movie> Movies { get; set; }
    public DbSet<Reservation> Reservations { get; set; }
    public DbSet<ReservationDetails> ReservationDetails { get; set; }

    public KinoDbContext(DbContextOptions<KinoDbContext> options) : base(options)
    {
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=localhost; Database=Kino; Username=postgres; Password=1234");
    }

}