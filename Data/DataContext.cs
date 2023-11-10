namespace CineplusDB.Models
{
    public class DataContext : DbContext
    {
        public DbSet<Client> Clients { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Room> Rooms { get; set; }
        protected readonly IConfiguration Configuration;

        public DataContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
            var connectionString = Configuration.GetConnectionString("DefaultConnection"); 
            optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Client>(entity =>
            {
                entity.HasKey(k => k.Idc);
                entity.Property(e => e.Nick).IsRequired();
                entity.Property(e => e.Password).IsRequired();
                entity.Property(e => e.DNI).IsRequired();
                entity.Property(e => e.CreditCard).IsRequired();
            });


            // Seed🌱
            modelBuilder.Entity<Client>().HasData(
                new Client
                {
                    Idc = 1,
                    Nick = "John Doe",
                    Password = "secretpass",
                    DNI = "00000000000",
                    CreditCard = "0000000000000000"
                },
                new Client
                {
                    Idc = 2,
                    Nick = "Jane Doe",
                    Password = "secretpass2",
                    DNI = "00000000001",
                    CreditCard = "0000000000000001"
                }
            );
        }
    }
}