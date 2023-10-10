using Microsoft.EntityFrameworkCore;

namespace CineplusDB.Models
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Client> Clients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuración adicional de las entidades y relaciones
        }
    }
}