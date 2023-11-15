using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BCryptNet = BCrypt.Net.BCrypt;

namespace CineplusDB.Models
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Manager> Managers { get; set; }
        public DbSet<TicketSeller> Sellers { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<MovieProgramming> ScheduledMovies { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Actor> Actors { get; set; }
        public DbSet<ActorByFilm> ActorsByFilms { get; set; }
        public DbSet<Gender> Genders { get; set; }
         public DbSet<GenderByFilm> GendersByFilms { get; set; }
        
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
                .HasForeignKey<Client>(c => c.UserId) // Clave foránea en la clase Client
                .IsRequired(false);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Manager)
                .WithOne(m => m.User)
                .HasForeignKey<Manager>(m => m.UserId)
                .IsRequired(false);
            
            modelBuilder.Entity<User>()
                .HasOne(u => u.TicketSeller)
                .WithOne(s => s.User)
                .HasForeignKey<TicketSeller>(s => s.UserId)
                .IsRequired(false);
        
            modelBuilder.Entity<Client>()
                .HasOne(c => c.User)
                .WithOne(u => u.Client)
                .IsRequired();

            modelBuilder.Entity<Manager>()
                .HasOne(m => m.User)
                .WithOne(u => u.Manager)
                .IsRequired();
          
            modelBuilder.Entity<TicketSeller>()
                .HasOne(s => s.User)
                .WithOne(u => u.TicketSeller)
                .IsRequired();
                
            modelBuilder.Entity<MovieProgramming>()
                .HasKey(mp => new { mp.RoomId, mp.MovieId, mp.DateTimeId });
            
            modelBuilder.Entity<ActorByFilm>()
                .HasKey(x => new { x.ActorId, x.MovieId});

            modelBuilder.Entity<ActorByFilm>()
                .HasOne(a => a.Actor)
                .WithMany(x => x.ActorsByFilms)
                .HasForeignKey(a => a.ActorId);

            modelBuilder.Entity<ActorByFilm>()
                .HasOne(m => m.Movie)
                .WithMany(x => x.ActorsByFilms)
                .HasForeignKey(m => m.MovieId);

            modelBuilder.Entity<GenderByFilm>()
                .HasKey(x => new { x.GenderId, x.MovieId});

            modelBuilder.Entity<GenderByFilm>()
                .HasOne(g => g.Gender)
                .WithMany(x => x.GendersByFilms)
                .HasForeignKey(g => g.GenderId);

            modelBuilder.Entity<GenderByFilm>()
                .HasOne(m => m.Movie)
                .WithMany(x => x.GendersByFilms)
                .HasForeignKey(m => m.MovieId);
            
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