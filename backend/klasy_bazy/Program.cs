using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using System.Text.Json;
public class Program
{
    public static void Main(string[] args)
    {
        var MyAllowSpecificOrigins = "AllowAllOrigins";
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAllOrigins",
            builder =>
            {
                builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
            });
        });
        builder.Services.AddControllers().AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.MaxDepth = int.MaxValue;
    });
        builder.Services.AddControllers();
        builder.Services.AddSwaggerGen();
        // Baza 
        builder.Services.AddDbContext<KinoDbContext>(options =>
        {
            options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
        });
        var app = builder.Build();
        app.UseCors(MyAllowSpecificOrigins);
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseHttpsRedirection();
        app.MapControllers();
        app.Run();
    }


}