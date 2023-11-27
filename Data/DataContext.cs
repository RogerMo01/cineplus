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
        public DbSet<OnlineSales> OnlineSales { get; set; }
        public DbSet<BoxOfficeSales> BoxOfficeSales { get; set; }
        public DbSet<Criterion> Criteria { get; set; }
        public DbSet<ActiveCriterion> ActiveCriteria { get; set; }
        public DbSet<Likes> Likes { get; set; }

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
            // ------------- Users ----------------------------------------------------

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

            modelBuilder.Entity<Client>()
                .HasMany(c => c.Sales)
                .WithOne(v => v.Client)
                .HasForeignKey(v => v.ClientId);

            modelBuilder.Entity<Manager>()
                .HasOne(m => m.User)
                .WithOne(u => u.Manager)
                .IsRequired();

            modelBuilder.Entity<TicketSeller>()
                .HasOne(s => s.User)
                .WithOne(u => u.TicketSeller)
                .IsRequired();

            modelBuilder.Entity<TicketSeller>()
                .HasMany(ts => ts.Sales)
                .WithOne(v => v.TicketSeller)
                .HasForeignKey(v => v.TicketSellerId);

            //---------------------- Movie Programming -----------------------------------

            modelBuilder.Entity<MovieProgramming>()
                .HasKey(mp => new { mp.RoomId, mp.MovieId, mp.DateTimeId });

            // ------------------- Actors and genres by films --------------------------------------

            modelBuilder.Entity<ActorByFilm>()
                .HasKey(x => new { x.ActorId, x.MovieId });

            modelBuilder.Entity<ActorByFilm>()
                .HasOne(a => a.Actor)
                .WithMany(x => x.ActorsByFilms)
                .HasForeignKey(a => a.ActorId);

            modelBuilder.Entity<ActorByFilm>()
                .HasOne(m => m.Movie)
                .WithMany(x => x.ActorsByFilms)
                .HasForeignKey(m => m.MovieId);

            modelBuilder.Entity<GenreByFilm>()
                .HasKey(x => new { x.GenreId, x.MovieId });

            modelBuilder.Entity<GenreByFilm>()
                .HasOne(g => g.Genre)
                .WithMany(x => x.GenresByFilms)
                .HasForeignKey(g => g.GenreId);

            modelBuilder.Entity<GenreByFilm>()
                .HasOne(m => m.Movie)
                .WithMany(x => x.GenresByFilms)
                .HasForeignKey(m => m.MovieId);

            // ------------------------ seats by room ------------------------------------------

            modelBuilder.Entity<Room>()
                .HasMany(s => s.SeatsByRoom)
                .WithOne(seatbyroom => seatbyroom.Room)
                .HasForeignKey(seatbyroom => seatbyroom.RoomId);

            // ---------------------- tickets ---------------------------------------------------

            modelBuilder.Entity<Ticket>()
                .HasKey(x => new { x.RoomId, x.MovieId, x.DateTimeId, x.SeatId });

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.MovieProgramming)
                .WithMany(mp => mp.Tickets)
                .HasForeignKey(t => new { t.RoomId, t.MovieId, t.DateTimeId });

            modelBuilder.Entity<Ticket>()
            .HasOne(t => t.Seat)
            .WithMany(s => s.Tickets)
            .HasForeignKey(t => t.SeatId);

            // ---------------------- Online sale -----------------------------------------

            modelBuilder.Entity<OnlineSales>()
                .HasKey(x => new { x.ClientId, x.RoomId, x.MovieId, x.DateTimeId, x.SeatId, x.DiscountId });

            modelBuilder.Entity<BoxOfficeSales>()
                .HasKey(x => new { x.TicketSellerId, x.RoomId, x.MovieId, x.DateTimeId, x.SeatId, x.DiscountId });

            // ------------------- Criteria ---------------------------------------------------

            modelBuilder.Entity<Criterion>()
                .HasOne(c => c.ActiveCriterion)
                .WithOne(ac => ac.Criterion)
                .HasForeignKey<ActiveCriterion>(ac => ac.CriterionId)
                .IsRequired(false);

            modelBuilder.Entity<ActiveCriterion>()
                .HasOne(ac => ac.Criterion)
                .WithOne(c => c.ActiveCriterion)
                .IsRequired();

            //  ------------------- Likes ------------------------------------------------

            modelBuilder.Entity<Likes>()
                .HasKey(x => new { x.ClientId, x.MovieId });

            modelBuilder.Entity<Likes>()
                .HasOne(c => c.Client)
                .WithMany(x => x.Likes)
                .HasForeignKey(c => c.ClientId);

            modelBuilder.Entity<Likes>()
                .HasOne(m => m.Movie)
                .WithMany(x => x.Likes)
                .HasForeignKey(m => m.MovieId);

            SeedDataMovies(modelBuilder);
            SeedDataClients(modelBuilder);
            SeedDataDiscounts(modelBuilder);
            SeedDataProgramming(modelBuilder);
            SeedDataSchedule(modelBuilder);
            SeedDataRooms(modelBuilder);
            SeedDataSeats(modelBuilder);
            SeedDataCriterion(modelBuilder);
            SeedDataActiveCriterion(modelBuilder);

            base.OnModelCreating(modelBuilder);

        }

        //Seed🌱
        private void SeedDataMovies(ModelBuilder modelBuilder)
        {
            // Películas
            var movie1 = new Movie { MovieId = 1, Title = "Inception", Year = 2010, Country = "USA", Director = "Christopher Nolan", Duration = 148 };
            var movie2 = new Movie { MovieId = 2, Title = "The Shawshank Redemption", Year = 1994, Country = "USA", Director = "Frank Darabont", Duration = 142 };
            var movie3 = new Movie { MovieId = 3, Title = "The Dark Knight", Year = 2008, Country = "USA", Director = "Christopher Nolan", Duration = 152 };
            var movie4 = new Movie { MovieId = 4, Title = "Forrest Gump", Year = 1994, Country = "USA", Director = "Robert Zemeckis", Duration = 142 };
            var movie5 = new Movie { MovieId = 5, Title = "Nowhere", Year = 2023, Country = "España", Director = "Albert Pintó", Duration = 129 };
            var movie6 = new Movie { MovieId = 6, Title = "Cars", Year = 2006, Country = "USA", Director = "John Lasseter", Duration = 116 };
            var movie7 = new Movie { MovieId = 7, Title = "Cars 2", Year = 2011, Country = "USA", Director = "John Lasseter", Duration = 107 };

            // Actores
            var actor1 = new Actor { ActorId = 1, Name = "Leonardo DiCaprio" };
            var actor2 = new Actor { ActorId = 2, Name = "Tom Hardy" };
            var actor3 = new Actor { ActorId = 3, Name = "Joseph Gordon-Levitt" };
            var actor4 = new Actor { ActorId = 4, Name = "Morgan Freeman" };
            var actor5 = new Actor { ActorId = 5, Name = "Christian Bale" };
            var actor6 = new Actor { ActorId = 6, Name = "Heath Ledger" };
            var actor7 = new Actor { ActorId = 7, Name = "Tom Hanks" };
            var actor8 = new Actor { ActorId = 8, Name = "Anna Castillo" };
            var actor9 = new Actor { ActorId = 9, Name = "Owen Wilson" };

            // Géneros
            var genre1 = new Genre { GenreId = 1, Name = "Ciencia Ficción" };
            var genre2 = new Genre { GenreId = 2, Name = "Drama" };
            var genre3 = new Genre { GenreId = 3, Name = "Comedia" };
            var genre4 = new Genre { GenreId = 4, Name = "Acción" };
            var genre5 = new Genre { GenreId = 5, Name = "Romance" };
            var genre6 = new Genre { GenreId = 6, Name = "Aventura" };
            var genre7 = new Genre { GenreId = 7, Name = "Suspenso" };
            var genre8 = new Genre { GenreId = 8, Name = "Animado" };

            // Relaciones Actor - Película
            var actorByFilm1 = new ActorByFilm { ActorId = 1, MovieId = 1 };
            var actorByFilm2 = new ActorByFilm { ActorId = 2, MovieId = 1 };
            var actorByFilm3 = new ActorByFilm { ActorId = 3, MovieId = 1 };
            var actorByFilm4 = new ActorByFilm { ActorId = 1, MovieId = 2 };
            var actorByFilm5 = new ActorByFilm { ActorId = 4, MovieId = 2 };
            var actorByFilm6 = new ActorByFilm { ActorId = 5, MovieId = 3 };
            var actorByFilm7 = new ActorByFilm { ActorId = 6, MovieId = 3 };
            var actorByFilm8 = new ActorByFilm { ActorId = 7, MovieId = 4 };
            var actorByFilm9 = new ActorByFilm { ActorId = 8, MovieId = 5 };
            var actorByFilm10 = new ActorByFilm { ActorId = 9, MovieId = 6 };
            var actorByFilm11 = new ActorByFilm { ActorId = 9, MovieId = 7 };

            // Relaciones Género - Película
            var genreByFilm1 = new GenreByFilm { GenreId = 1, MovieId = 1 };
            var genreByFilm2 = new GenreByFilm { GenreId = 2, MovieId = 2 };
            var genreByFilm3 = new GenreByFilm { GenreId = 4, MovieId = 3 };
            var genreByFilm4 = new GenreByFilm { GenreId = 5, MovieId = 4 };
            var genreByFilm5 = new GenreByFilm { GenreId = 6, MovieId = 4 };
            var genreByFilm6 = new GenreByFilm { GenreId = 2, MovieId = 5 };
            var genreByFilm7 = new GenreByFilm { GenreId = 7, MovieId = 5 };
            var genreByFilm8 = new GenreByFilm { GenreId = 8, MovieId = 6 };
            var genreByFilm9 = new GenreByFilm { GenreId = 6, MovieId = 6 };
            var genreByFilm10 = new GenreByFilm { GenreId = 8, MovieId = 7 };
            var genreByFilm11 = new GenreByFilm { GenreId = 6, MovieId = 7 };

            modelBuilder.Entity<Movie>().HasData(movie1, movie2, movie3, movie4, movie5, movie6, movie7);
            modelBuilder.Entity<Actor>().HasData(actor1, actor2, actor3, actor4, actor5, actor6, actor7, actor8, actor9);
            modelBuilder.Entity<Genre>().HasData(genre1, genre2, genre3, genre4, genre5, genre6, genre7, genre8);
            modelBuilder.Entity<ActorByFilm>().HasData(actorByFilm1, actorByFilm2, actorByFilm3, actorByFilm4, actorByFilm5, actorByFilm6, actorByFilm7, actorByFilm8, actorByFilm9, actorByFilm10, actorByFilm11);
            modelBuilder.Entity<GenreByFilm>().HasData(genreByFilm1, genreByFilm2, genreByFilm3, genreByFilm4, genreByFilm5, genreByFilm6, genreByFilm7, genreByFilm8, genreByFilm9, genreByFilm10, genreByFilm11);
        }

        private void SeedDataClients(ModelBuilder modelBuilder)
        {
            string salt1 = BCryptNet.GenerateSalt();
            string salt2 = BCryptNet.GenerateSalt();
            string salt3 = BCryptNet.GenerateSalt();
            string salt4 = BCryptNet.GenerateSalt();

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
                },
                new User
                {
                    UserId = 3,
                    Nick = "mario_taquilleroCinemas",
                    Password = BCryptNet.HashPassword("scretpass3", salt3),
                    Salt = salt3
                },
                new User
                {
                    UserId = 4,
                    Nick = "gerenteCine+",
                    Password = BCryptNet.HashPassword("secretpass4", salt4),
                    Salt = salt4
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

            modelBuilder.Entity<TicketSeller>().HasData(
                new TicketSeller
                {
                    TicketSellerId = 1,
                    UserId = 3
                }
            );

            modelBuilder.Entity<Manager>().HasData(
                new Manager
                {
                    ManagerId = 1,
                    UserId = 4
                }
            );
        }

        private void SeedDataDiscounts(ModelBuilder modelBuilder)
        {
            var discount0 = new Discount
            {
                DiscountId = 1,
                Concept = "Ninguno",
                Percent = 0 // 10%
            };
            var discount1 = new Discount
            {
                DiscountId = 2,
                Concept = "Descuento de Cumpleaños",
                Percent = 0.10f // 10%
            };

            var discount2 = new Discount
            {
                DiscountId = 3,
                Concept = "Descuento Especial de Verano",
                Percent = 0.15f // 15%
            };

            var discount3 = new Discount
            {
                DiscountId = 4,
                Concept = "Descuento a la Tercera Edad",
                Percent = 0.40f // 10%
            };

            var discount4 = new Discount
            {
                DiscountId = 5,
                Concept = "Descuento a Universitarios",
                Percent = 0.15f // 15%
            };

            var discount5 = new Discount
            {
                DiscountId = 6,
                Concept = "Descuento a niños (aplicable solo hasta 12 años)",
                Percent = 0.25f // 15%
            };

            modelBuilder.Entity<Discount>().HasData(discount0, discount1, discount2, discount3, discount4, discount5);
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
                DateTimeId = DateTime.Parse("2023-12-5 18:30:00"),
                Price = 4.99,
                PricePoints = 20
            };

            var movieProgramming2 = new MovieProgramming
            {
                Identifier = Guid.NewGuid(),
                RoomId = 1,
                MovieId = 2,
                DateTimeId = DateTime.Parse("2023-12-5 21:30:00"),
                Price = 3.00,
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

        private void SeedDataCriterion(ModelBuilder modelBuilder)
        {
            var criterion1 = new Criterion { CriterionId = 1, Name = "Aleatorio" };
            var criterion2 = new Criterion { CriterionId = 2, Name = "Populares en Cine+" };
            var criterion3 = new Criterion { CriterionId = 3, Name = "Programaciones de la semana" };
            var criterion4 = new Criterion { CriterionId = 4, Name = "Añadidas recientemente" };
            var criterion5 = new Criterion { CriterionId = 5, Name = "Estrenadas hace menos de un año" };
            var criterion6 = new Criterion { CriterionId = 6, Name = "Aclamadas por nuestro público" };

            modelBuilder.Entity<Criterion>().HasData(criterion1, criterion2, criterion3, criterion4, criterion5, criterion6);
        }

        private void SeedDataActiveCriterion(ModelBuilder modelBuilder)
        {
            var activecriterion1 = new ActiveCriterion { ActiveCriterionId = 1, CriterionId = 1 };
            var activecriterion2 = new ActiveCriterion { ActiveCriterionId = 2, CriterionId = 2 };
            var activecriterion3 = new ActiveCriterion { ActiveCriterionId = 3, CriterionId = 3 };
            var activecriterion4 = new ActiveCriterion { ActiveCriterionId = 4, CriterionId = 4 };
            var activecriterion5 = new ActiveCriterion { ActiveCriterionId = 5, CriterionId = 5 };
            var activecriterion6 = new ActiveCriterion { ActiveCriterionId = 6, CriterionId = 6 };

            modelBuilder.Entity<ActiveCriterion>().HasData(activecriterion1, activecriterion2, activecriterion3, activecriterion4, activecriterion5, activecriterion6);
        }
    }

}