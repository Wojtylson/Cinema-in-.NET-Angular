using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.Arm;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly KinoDbContext _context;
    public UserController(KinoDbContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _context.Users.ToListAsync();
        if (users == null) { return NotFound("Nie znaleziono użytkowników"); }
        return Ok(users);
    }

    [HttpGet("{id}")]//dla admina ale też przy wchodzeniu na profil z danymi(moje dane)
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound("Nie znaleziono użytkownika o podanym ID");
        }
        return Ok(user);
    }
    //logowanie
    [HttpGet("{email}/{haslo}")]
    public async Task<IActionResult> UserExists(string email, string haslo)
    {
        var users = await _context.Users.ToListAsync();

        var user = users.FirstOrDefault(u => u.Email == email);
        if (user == null)
        {
            return NotFound("Nie ma użytkownika o podanym adresie e-mail.");
        }
        if (user.Password != haslo)
        {
            return BadRequest("Podane hasło jest nieprawidłowe.");
        }
        if (user.IsAdmin)
        {
            return Ok(user);
        }
        else
        {
            return Ok(user);
        }
    }
    [HttpPost]
    public async Task<IActionResult> CreateNewUserProfile([FromBody] User user)
    {
        if (!PasswordIsCorrect(user.Password)) { return BadRequest("Podaj poprawne haslo!"); }
        if (!EmailIsCorrect(user.Email)) { return BadRequest("Podaj poprawną nazwę użytkownika"); }
        var userExists = await _context.Users.AnyAsync(u => u.Email == user.Email);
        if (userExists)
        {
            return Conflict("Użytkownik o podanym adresie e-mail już istnieje.");
        }
        if (user.Password is null || user.Email is null)
        {
            return BadRequest("Wypełnij wszystkie pola");
        }
        user.Active = true;
        user.IsAdmin = false;
        user.Reservations = null;
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
    }
    [HttpDelete]
    public async Task<IActionResult> DeleteUsers()
    {
        var users = await _context.Users.ToListAsync();
        if (users == null) { return NotFound(); }
        //if (!user.Active) { return BadRequest(); }
        _context.Users.RemoveRange(users);
        await _context.SaveChangesAsync();
        return Ok($"Usunięto {users.Count()} użytkowników");
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUserAsAdmin(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) { return NotFound(); }
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return Ok($"Usunięto użytkownika{user.Email}");
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUserProfile(int id, [FromBody] User userUpdate)
    {
        if (userUpdate == null)
        {
            return BadRequest("Brak danych do aktualizacji");
        }

        if (id != userUpdate.Id)
        {
            return BadRequest("Błędne ID");
        }

        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound("Nie znaleziono użytkownika o podanym id");
        }
        user.Password = userUpdate.Password;
        user.Email = userUpdate.Email;
        await _context.SaveChangesAsync();
        return NoContent();
    }
    private bool PasswordIsCorrect(string haslo)
    {
        string regex = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$";
        return Regex.IsMatch(haslo, regex);
    }
    private bool EmailIsCorrect(string email)
    {
        string regex = @"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$";
        return Regex.IsMatch(email, regex);
    }


}