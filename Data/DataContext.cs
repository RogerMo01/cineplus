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
        public DbSet<Genre> Genres { get; set; }
        public DbSet<GenreByFilm> GenresByFilms { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        
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
            
            modelBuilder.Entity<MovieProgramming>()
                .HasMany(mp => mp.Tickets)
                .WithOne(t => t.MovieProgramming)
                .HasForeignKey(t => new { t.RoomId, t.MovieId, t.DateTimeId });
                        
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

            modelBuilder.Entity<GenreByFilm>()
                .HasKey(x => new { x.GenreId, x.MovieId});

            modelBuilder.Entity<GenreByFilm>()
                .HasOne(g => g.Genre)
                .WithMany(x => x.GenresByFilms)
                .HasForeignKey(g => g.GenreId);

            modelBuilder.Entity<GenreByFilm>()
                .HasOne(m => m.Movie)
                .WithMany(x => x.GenresByFilms)
                .HasForeignKey(m => m.MovieId);
            
            modelBuilder.Entity<Room>()
                .HasMany(s => s.SeatsByRoom)
                .WithOne(seatbyroom => seatbyroom.Room)
                .HasForeignKey(seatbyroom => seatbyroom.RoomId);
            
            modelBuilder.Entity<Seat>()
                .HasMany(s => s.Tickets)
                .WithOne(t => t.Seat)
                .HasForeignKey(t => t.SeatId);

            modelBuilder.Entity<Ticket>()
                .HasKey(x => new {x.RoomId, x.MovieId, x.DateTimeId, x.SeatId});

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.MovieProgramming)
                .WithMany(mp => mp.Tickets)
                .HasForeignKey(t => new { t.RoomId, t.MovieId, t.DateTimeId });

            modelBuilder.Entity<Ticket>()
            .HasOne(t => t.Seat)
            .WithMany(s => s.Tickets)
            .HasForeignKey(t => t.SeatId);


            SeedDataMovies(modelBuilder);
            SeedDataClients(modelBuilder);
            SeedDataDiscounts(modelBuilder);
            SeedDataProgramming(modelBuilder);
            SeedDataSchedule(modelBuilder);
            SeedDataRooms(modelBuilder);
            SeedDataSeats(modelBuilder);

            base.OnModelCreating(modelBuilder);

        }

        //Seed🌱
        private void SeedDataMovies(ModelBuilder modelBuilder)
        {
            // Películas
            var movie1 = new Movie { MovieId = 1, Title = "Inception", Year = 2010, Country = "USA", Director = "Christopher Nolan", Duration = 148 };
            var movie2 = new Movie { MovieId = 2, Title = "The Shawshank Redemption", Year = 1994, Country = "USA", Director = "Frank Darabont", Duration = 142 };

            // Actores
            var actor1 = new Actor { ActorId = 1, Name = "Leonardo DiCaprio" };
            var actor2 = new Actor { ActorId = 2, Name = "Tom Hardy" };
            var actor3 = new Actor { ActorId = 3, Name = "Joseph Gordon-Levitt" };
            var actor4 = new Actor { ActorId = 4, Name = "Morgan Freeman" };

            // Géneros
            var genre1 = new Genre { GenreId = 1, Name = "Ciencia Ficción" };
            var genre2 = new Genre { GenreId = 2, Name = "Drama" };
            var genre3 = new Genre { GenreId = 3, Name = "Comedia" };

            // Relaciones Actor - Película
            var actorByFilm1 = new ActorByFilm { ActorId = 1, MovieId = 1 };
            var actorByFilm2 = new ActorByFilm { ActorId = 2, MovieId = 1 };
            var actorByFilm3 = new ActorByFilm { ActorId = 3, MovieId = 1 };

            var actorByFilm4 = new ActorByFilm { ActorId = 1, MovieId = 2 };
            var actorByFilm5 = new ActorByFilm { ActorId = 4, MovieId = 2 };

            // Relaciones Género - Película
            var genreByFilm1 = new GenreByFilm { GenreId = 1, MovieId = 1 };
            var genreByFilm2 = new GenreByFilm { GenreId = 2, MovieId = 2 };

            modelBuilder.Entity<Movie>().HasData(movie1, movie2);
            modelBuilder.Entity<Actor>().HasData(actor1, actor2, actor3, actor4);
            modelBuilder.Entity<Genre>().HasData(genre1, genre2, genre3);
            modelBuilder.Entity<ActorByFilm>().HasData(actorByFilm1, actorByFilm2, actorByFilm3, actorByFilm4, actorByFilm5);
            modelBuilder.Entity<GenreByFilm>().HasData(genreByFilm1, genreByFilm2);
        }

        private void SeedDataClients(ModelBuilder modelBuilder)
        {
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

        private void SeedDataDiscounts(ModelBuilder modelBuilder)
        {
            var discount1 = new Discount
            {
                DiscountId = 1,
                Concept = "Descuento de Cumpleaños",
                Percent = 0.10f // 10%
            };

            var discount2 = new Discount
            {
                DiscountId = 2,
                Concept = "Oferta Especial de Verano",
                Percent = 0.15f // 15%
            };

            var discount3 = new Discount
            {
                DiscountId = 3,
                Concept = "Descuento a la Tercera Edad",
                Percent = 0.20f // 10%
            };

            var discount4 = new Discount
            {
                DiscountId = 4,
                Concept = "Día del Estudiante",
                Percent = 0.15f // 15%
            };

            modelBuilder.Entity<Discount>().HasData(discount1, discount2, discount3, discount4);
        }

        public void SeedDataRooms(ModelBuilder modelBuilder)
        {
           modelBuilder.Entity<Room>().HasData(
                new Room
                {
                    RoomId = 1,
                    Name = "Sala A",
                    SeatsCount = 1
                },

                new Room
                {
                    RoomId = 2,
                    Name = "Sala B",
                    SeatsCount = 1
                },

                new Room
                {
                    RoomId = 3,
                    Name = "Sala VIP",
                    SeatsCount = 1
                },

                new Room
                {
                    RoomId = 4,
                    Name = "Sala 3D",
                    SeatsCount = 1
                }
            );  
        }

        public void SeedDataSeats(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Seat>().HasData(
                new Seat
                {
                    SeatId = 1, 
                    RoomId = 1, 
                    Code = "A-1"
                },

                new Seat
                {
                    SeatId = 2, 
                    RoomId = 2, 
                    Code = "B-1"
                },

                new Seat
                {
                    SeatId = 3, 
                    RoomId = 3, 
                    Code = "VIP-1"
                },

                new Seat
                {
                    SeatId = 4, 
                    RoomId = 4, 
                    Code = "3D-1"
                }
            );  
        }
       
        private void SeedDataProgramming(ModelBuilder modelBuilder)
        {
            var movieProgramming1 = new MovieProgramming
            {
                Identifier = Guid.NewGuid(),
                RoomId = 2,
                MovieId = 1, 
                DateTimeId = DateTime.Parse("2023-11-16 18:30:00"),
                Price = 4.99m, 
                PricePoints = 20 
            };

            var movieProgramming2 = new MovieProgramming
            {
                Identifier = Guid.NewGuid(),
                RoomId = 1,
                MovieId = 2,
                DateTimeId = DateTime.Parse("2023-11-16 21:30:00"),
                Price = 3.00m,
                PricePoints = 15
            };

            modelBuilder.Entity<MovieProgramming>().HasData(movieProgramming1, movieProgramming2);
        }

        private void SeedDataSchedule(ModelBuilder modelBuilder)
        {
            var schedule1 = new Schedule
            {
                DateTime = DateTime.Parse("2023-11-16 18:30:00")
            };

            var schedule2 = new Schedule
            {
                DateTime = DateTime.Parse("2023-11-16 21:30:00")
            };

            modelBuilder.Entity<Schedule>().HasData(schedule1, schedule2);
        }

    }
}