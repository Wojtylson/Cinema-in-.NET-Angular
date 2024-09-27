using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.Intrinsics.Arm;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
[Route("api/[controller]")]
[ApiController]
public class ReservationDetailsController : ControllerBase
{
    private readonly KinoDbContext _context;
    public ReservationDetailsController(KinoDbContext context)
    {
        _context = context;
    }
    [HttpPost]
    public async Task<IActionResult> BookNewReservation([FromQuery] ReservationDetails details)
    {
        var detailsexist = await _context.ReservationDetails.AnyAsync(d => d.Id == details.Id);
        if (detailsexist)
        {
            return Conflict("Rezerwacja o podanym id już istnieje.");
        }

        _context.ReservationDetails.Add(details);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetReservationById), new { id = details.Id }, details);
    }
    [HttpGet]
    public async Task<IActionResult> GetReservations()
    {
        var details = await _context.ReservationDetails.ToListAsync();
        if (details == null) { return NotFound("Nie znaleziono rezerwacji"); }
        return Ok(details);

    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetReservationById(int id)
    {
        var details = await _context.ReservationDetails.FindAsync(id);
        if (details == null)
        {
            return NotFound("Nie znaleziono rezerwacji o podanym ID");
        }
        return Ok(details);
    }
    [HttpGet("ReservationDetailsIds/{userId}")]
    public async Task<IActionResult> GetReservationDetailsIdsByUserId(int userId)
    {
        var reservations = await _context.Reservations
            .Where(r => r.User.Id == userId)
            .Include(r => r.ReservationDetails)
            .ToListAsync();

        var reservationDetailsIds = reservations
            .Where(r => r.ReservationDetails != null)
            .Select(r => r.ReservationDetails.Id)
            .Distinct()
            .ToList();

        return Ok(reservationDetailsIds);
    }
    [HttpGet("ReservationDetails")]
    public async Task<IActionResult> GetReservationDetailsByIds([FromQuery] List<int> ids)
    {
        if (ids == null || !ids.Any())
        {
            return BadRequest("Błąd, brak ID");
        }

        var reservationDetails = await _context.ReservationDetails.Include(r => r.Movie)
            .Where(rd => ids.Contains(rd.Id))
            .ToListAsync();

        if (!reservationDetails.Any())
        {
            return NotFound();
        }

        return Ok(reservationDetails);
    }









}