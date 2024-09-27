using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Linq;
using System.Runtime.Intrinsics.Arm;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
[Route("api/[controller]")]
[ApiController]
public class ReservationController : ControllerBase
{
    private readonly KinoDbContext _context;
    public ReservationController(KinoDbContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<ActionResult<Collection<Reservation>>> GetReservations()
    {
        var reservations = await _context.Reservations
            .Include(r => r.User)
            .Include(r => r.ReservationDetails)
            .ThenInclude(rd => rd.Movie)
            .ToListAsync();

        return Ok(reservations);
    }

    [HttpPost]
    public async Task<IActionResult> CreateReservation([FromBody] Reservation reservation)
    {
        if (reservation == null || reservation.User == null || reservation.ReservationDetails == null)
        {
            return BadRequest("Invalid reservation data.");
        }
        var existingUser = await _context.Users.FindAsync(reservation.User.Id);
        if (existingUser == null)
        {
            _context.Users.Add(reservation.User);
        }
        else
        {
            reservation.User = existingUser;
        }

        var reservationDetails = reservation.ReservationDetails;

        var existingMovie = await _context.Movies.FindAsync(reservationDetails.Movie.Id);
        if (existingMovie == null)
        {
            _context.Movies.Add(reservationDetails.Movie);
        }
        else
        {
            reservationDetails.Movie = existingMovie;
        }

        _context.ReservationDetails.Add(reservationDetails);

        await _context.SaveChangesAsync();

        _context.Reservations.Add(reservation);
        await _context.SaveChangesAsync();

        return Ok();
    }
    [HttpGet("movie/{movieId}/date/{date}/hour/{hour}")]
    public async Task<IActionResult> GetReservationDetails(int movieId, string date, string hour)
    {
        var reservationDetails = await _context.ReservationDetails
            .Where(rd => rd.Movie.Id == movieId && rd.Day == date && rd.Hour == hour)
            .Select(rd => rd.Seats)
            .ToListAsync();

        if (reservationDetails == null || !reservationDetails.Any())
        {
            return NotFound();
        }
        var reservedSeats = reservationDetails
       .SelectMany(seats => seats)
       .Distinct()
       .ToList();

        return Ok(reservedSeats);

    }

}

