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
public class MovieController : ControllerBase
{
    private readonly KinoDbContext _context;
    public MovieController(KinoDbContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<IActionResult> GetMovies()
    {
        var movies = await _context.Movies.ToListAsync();
        if (movies == null) { return NotFound("Nie znaleziono filmów w bazie"); }
        return Ok(movies);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetMovieById(int id)
    {
        var movie = await _context.Movies.FindAsync(id);
        if (movie == null) { return NotFound($"Nie istnieje film o id : {id}"); }
        return Ok(movie);
    }
    [HttpPost]
    public async Task<IActionResult> AddNewMovie([FromBody] Movie movie)
    {
        var movieExists = await _context.Movies.AnyAsync(m => m.Title == movie.Title);
        var movie_imgExists = await _context.Movies.AnyAsync(m => m.Image == movie.Image);
        if (movieExists) { return Conflict("Film o podanym tytule już istnieje"); }
        if (movie_imgExists) { return Conflict("Zły adres obrazu"); }
        if (movie.Title is string && movie.Image is string && movie.Synopsis is string && movie.Genre is string &&
         movie.Title != null && movie.Image != null && movie.Synopsis != null && movie.Genre != null)
        {
            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMovieById), new { id = movie.Id }, movie);
        }
        return BadRequest("Wszystkie pola muszą być teksetm");
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMovieById(int id)
    {
        var movie = await _context.Movies.FindAsync(id);
        if (movie == null)
        {
            return NotFound("Nie znaleziono filmu o podanym id");
        }
        _context.Movies.Remove(movie);
        await _context.SaveChangesAsync();
        return Ok($"Usunięto film o id : {id} ");

    }
    [HttpDelete]
    public async Task<IActionResult> DeleteAllMovies()
    {
        var movies = await _context.Movies.ToListAsync();
        if (movies == null)
        {
            return NotFound("Nie znaleziono filmów w bazie");
        }
        _context.Movies.RemoveRange(movies);
        await _context.SaveChangesAsync();
        return Ok($"Usunięto {movies.Count()} filmów");
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMovieInfo(int id, [FromBody] Movie updatedMovie)
    {
        if (id != updatedMovie.Id)
        {
            return BadRequest("Błędne ID");
        }
        var movie = await _context.Movies.FindAsync(id);
        if (movie == null)
        {
            return NotFound("Nie znaleziono filmu o podanym id");
        }
        movie.Title = updatedMovie.Title;
        movie.Genre = updatedMovie.Genre;
        movie.Image = updatedMovie.Image;
        movie.Synopsis = updatedMovie.Synopsis;
        await _context.SaveChangesAsync();
        return NoContent();

    }
}