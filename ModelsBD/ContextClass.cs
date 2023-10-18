using Microsoft.EntityFrameworkCore;

namespace CineplusDB.Models
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Clients> Client { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connectionstring = "Server=localhost;Database=cineplus_DB;User=root;Password=Cc68594*;"; //Cadena de conexión con la BD
            optionsBuilder.UseMySQL(connectionstring);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Clients>()
            .HasKey(c => c.Idc)
            .HasAnnotation("MySql:AutoIncrement", true);
            modelBuilder.Entity<Clients>()
            .Property(p => p.Nick)
            .IsRequired();
            modelBuilder.Entity<Clients>()
            .Property(p => p.CreditCard)
            .IsRequired();
            modelBuilder.Entity<Clients>()
            .Property(p => p.DNI)
            .IsRequired();
            modelBuilder.Entity<Clients>()
            .Property(p => p.Password)
            .IsRequired();


        }
    }
}