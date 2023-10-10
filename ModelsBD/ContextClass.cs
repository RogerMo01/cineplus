using Microsoft.EntityFrameworkCore;

namespace CineplusDB.Models
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Clients> Client { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connectionstring = ""; //Cadena de conexión con la BD
            optionsBuilder.UseMySQL(connectionstring);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuración adicional de las entidades y relaciones
        }
    }
}