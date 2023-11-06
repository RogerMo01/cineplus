using BCryptNet = BCrypt.Net.BCrypt;
namespace CineplusDB.Models
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Client> Clients { get; set; }
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
            modelBuilder.Entity<User>()
            .HasOne(u => u.Client)  // Relación opcional: un usuario puede estar asociado con un cliente o no.
            .WithOne(c => c.User)  // Configura la relación inversa en la clase Client.
            .IsRequired(false)
            .HasForeignKey<Client>(c => c.UserId); // Clave foránea en la clase Client
        
            modelBuilder.Entity<Client>()
                .HasOne(c => c.User)
                .WithOne(u => u.Client)
                .IsRequired();
          
            base.OnModelCreating(modelBuilder);

            // Seed🌱
            string salt1 = BCryptNet.GenerateSalt();
            string salt2 = BCryptNet.GenerateSalt();

            modelBuilder.Entity<User>().HasData(

                new User
                {
                    UserId = 1,
                    Nick = "John Doe",
                    Password = BCryptNet.HashPassword("secretpass", salt1),
                    Salt = salt1
                 
                },
                new User
                {
                    UserId = 2,
                    Nick = "Jane Doe",
                    Password = BCryptNet.HashPassword("secretpass2", salt2),
                    Salt = salt2
                }
            );

            modelBuilder.Entity<Client>().HasData(
                new Client
                {
                    ClientId = 1,
                    DNI = "00000000000",
                    CreditCard = "0000000000000000",
                    UserId = 1
                },
                new Client
                {
                    ClientId = 2,
                    DNI = "00000000001",
                    CreditCard = "0000000000000001", 
                    UserId = 2
                 
                }
            );
        }
    }
}