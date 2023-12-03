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
        public DbSet<Membership> Memberships { get; set; }

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
            
            //--------------------------Membership-----------------------------------------------------

            modelBuilder.Entity<Membership>()
                .HasKey(m => m.MembershipCode);

            modelBuilder.Entity<Membership>()
                .HasOne(m => m.Client)
                .WithOne(c => c.Membership)
                .HasForeignKey<Client>(c => c.ClientId)
                .IsRequired(false);

            modelBuilder.Entity<Client>()
                .HasOne(c => c.Membership)
                .WithOne(m => m.Client)
                .HasForeignKey<Membership>(m => m.ClientId)
                .IsRequired(false); 

            // ---------------- Relacion uno muchos opcional e/ venta en taquilla y socios ---------------------
            
            modelBuilder.Entity<BoxOfficeSales>()
                .HasOne(m => m.Membership)
                .WithMany(x => x.BoxOfficeSales)
                .HasForeignKey(m => m.MemberCode)
                .IsRequired(false);

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
            var movie8 = new Movie { MovieId = 8, Title = "Fresa y Chocolate", Year = 1993, Country = "Cuba", Director = "Tomás Gutiérrez Alea", Duration = 108 };
            var movie9 = new Movie { MovieId = 9, Title = "Juan de los muertos", Year = 2011, Country = "Cuba", Director = "Alejandro Brugués", Duration = 100 };
            var movie10 = new Movie { MovieId = 10, Title = "Conducta", Year = 2014, Country = "Cuba", Director = "Ernesto Daranas", Duration = 108 };
            var movie11 = new Movie { MovieId = 11, Title = "Lista de espera", Year = 2000, Country = "Cuba", Director = "Juan Carlos Tabío", Duration = 110 };
            var movie12 = new Movie { MovieId = 12, Title = "Oppenheimer", Year = 2023, Country = "USA", Director = "Christopher Nolan", Duration = 180 };
            var movie13 = new Movie { MovieId = 13, Title = "Leo", Year = 2023, Country = "USA", Director = "Robert Marianetti", Duration = 102 };
            var movie14 = new Movie { MovieId = 14, Title = "Blended", Year = 2014, Country = "USA", Director = "Frank Coraci", Duration = 117 };
            var movie15 = new Movie { MovieId = 15, Title = "E.T.", Year = 1982, Country = "USA", Director = "Steven Spielberg", Duration = 114 };
            var movie16 = new Movie { MovieId = 16, Title = "Jurassic Park", Year = 1993, Country = "USA", Director = "Steven Spielberg", Duration = 127 };
            var movie17 = new Movie { MovieId = 17, Title = "Harry Potter and the Chamber of Secrets", Year = 2002, Country = "UK", Director = "Chris Columbus", Duration = 161 };
            var movie18 = new Movie { MovieId = 18, Title = "8 Mile", Year = 2002, Country = "USA", Director = "Curtis Hanson", Duration = 111 };
            var movie19 = new Movie { MovieId = 19, Title = "Jungle", Year = 2017, Country = "Australia", Director = "Greg McLean", Duration = 115 };
            var movie20 = new Movie { MovieId = 20, Title = "Hacksaw Ridge", Year = 2016, Country = "USA", Director = "Mel Gibson", Duration = 139 };

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
            var actor10 = new Actor { ActorId = 10, Name = "Jorge Perugorría" };
            var actor11 = new Actor { ActorId = 11, Name = "Vladimir Cruz" };
            var actor12 = new Actor { ActorId = 12, Name = "Alexis Díaz de Villegas" };
            var actor13 = new Actor { ActorId = 13, Name = "Armando Valdés Freire" };
            var actor14 = new Actor { ActorId = 14, Name = "Alina Rodríguez" };
            var actor15 = new Actor { ActorId = 15, Name = "Cillian Murphy" };
            var actor16 = new Actor { ActorId = 16, Name = "Adam Sandler" };
            var actor17 = new Actor { ActorId = 17, Name = "Drew Barrymore" };
            var actor18 = new Actor { ActorId = 18, Name = "Sam Neill" };
            var actor19 = new Actor { ActorId = 19, Name = "Laura Dern" };
            var actor20 = new Actor { ActorId = 20, Name = "Daniel Radcliffe" };
            var actor21 = new Actor { ActorId = 21, Name = "Emma Watson" };
            var actor22 = new Actor { ActorId = 22, Name = "Rupert Grint" };
            var actor23 = new Actor { ActorId = 23, Name = "Eminem" };
            var actor24 = new Actor { ActorId = 24, Name = "Andrew Garfield" };

            // Géneros
            var genre1 = new Genre { GenreId = 1, Name = "Ciencia Ficción" };
            var genre2 = new Genre { GenreId = 2, Name = "Drama" };
            var genre3 = new Genre { GenreId = 3, Name = "Comedia" };
            var genre4 = new Genre { GenreId = 4, Name = "Acción" };
            var genre5 = new Genre { GenreId = 5, Name = "Romance" };
            var genre6 = new Genre { GenreId = 6, Name = "Aventura" };
            var genre7 = new Genre { GenreId = 7, Name = "Suspenso" };
            var genre8 = new Genre { GenreId = 8, Name = "Animado" };
            var genre9 = new Genre { GenreId = 9, Name = "Terror" };
            var genre10 = new Genre { GenreId = 10, Name = "Biográfico" };
            var genre11 = new Genre { GenreId = 11, Name = "Fantástico" };
            var genre12 = new Genre { GenreId = 12, Name = "Bélico" };

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
            var actorByFilm12 = new ActorByFilm { ActorId = 10, MovieId = 8 };
            var actorByFilm13 = new ActorByFilm { ActorId = 11, MovieId = 8 };
            var actorByFilm14 = new ActorByFilm { ActorId = 12, MovieId = 9 };
            var actorByFilm15 = new ActorByFilm { ActorId = 13, MovieId = 10 };
            var actorByFilm16 = new ActorByFilm { ActorId = 14, MovieId = 10 };
            var actorByFilm17 = new ActorByFilm { ActorId = 11, MovieId = 11 };
            var actorByFilm18 = new ActorByFilm { ActorId = 10, MovieId = 11 };
            var actorByFilm19 = new ActorByFilm { ActorId = 15, MovieId = 12 };
            var actorByFilm20 = new ActorByFilm { ActorId = 16, MovieId = 13 };
            var actorByFilm21 = new ActorByFilm { ActorId = 16, MovieId = 14 };
            var actorByFilm22 = new ActorByFilm { ActorId = 17, MovieId = 14 };
            var actorByFilm23 = new ActorByFilm { ActorId = 17, MovieId = 15 };
            var actorByFilm24 = new ActorByFilm { ActorId = 18, MovieId = 16 };
            var actorByFilm25 = new ActorByFilm { ActorId = 19, MovieId = 16 };
            var actorByFilm26 = new ActorByFilm { ActorId = 20, MovieId = 17 };
            var actorByFilm27 = new ActorByFilm { ActorId = 21, MovieId = 17 };
            var actorByFilm28 = new ActorByFilm { ActorId = 22, MovieId = 17 };
            var actorByFilm29 = new ActorByFilm { ActorId = 23, MovieId = 18 };
            var actorByFilm30 = new ActorByFilm { ActorId = 20, MovieId = 19 };
            var actorByFilm31 = new ActorByFilm { ActorId = 24, MovieId = 20 };

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
            var genreByFilm12 = new GenreByFilm { GenreId = 2, MovieId = 8 };
            var genreByFilm13 = new GenreByFilm { GenreId = 9, MovieId = 9 };
            var genreByFilm14 = new GenreByFilm { GenreId = 2, MovieId = 10 };
            var genreByFilm15 = new GenreByFilm { GenreId = 3, MovieId = 11 };
            var genreByFilm16 = new GenreByFilm { GenreId = 10, MovieId = 12 };
            var genreByFilm17 = new GenreByFilm { GenreId = 7, MovieId = 12 };
            var genreByFilm18 = new GenreByFilm { GenreId = 8, MovieId = 13 };
            var genreByFilm19 = new GenreByFilm { GenreId = 3, MovieId = 14 };
            var genreByFilm20 = new GenreByFilm { GenreId = 1, MovieId = 15 };
            var genreByFilm21 = new GenreByFilm { GenreId = 1, MovieId = 16 };
            var genreByFilm22 = new GenreByFilm { GenreId = 11, MovieId = 17 };
            var genreByFilm23 = new GenreByFilm { GenreId = 10, MovieId = 18 };
            var genreByFilm24 = new GenreByFilm { GenreId = 6, MovieId = 19 };
            var genreByFilm25 = new GenreByFilm { GenreId = 2, MovieId = 19 };
            var genreByFilm26 = new GenreByFilm { GenreId = 12, MovieId = 20 };
            var genreByFilm27 = new GenreByFilm { GenreId = 10, MovieId = 20 };

            modelBuilder.Entity<Movie>().HasData(movie1, movie2, movie3, movie4, movie5, movie6,
             movie7, movie8, movie9, movie10, movie11, movie12, movie13, movie14, movie15, movie16,
             movie17, movie18, movie19, movie20);

            modelBuilder.Entity<Actor>().HasData(actor1, actor2, actor3, actor4, actor5, actor6,
             actor7, actor8, actor9, actor10, actor11, actor12, actor13, actor14, actor15, actor16,
             actor17, actor18, actor19, actor20, actor21, actor22, actor23, actor24);
             
            modelBuilder.Entity<Genre>().HasData(genre1, genre2, genre3, genre4, genre5, genre6,
             genre7, genre8, genre9, genre10, genre11, genre12);

            modelBuilder.Entity<ActorByFilm>().HasData(actorByFilm1, actorByFilm2, actorByFilm3, actorByFilm4, actorByFilm5, actorByFilm6,
             actorByFilm7, actorByFilm8, actorByFilm9, actorByFilm10, actorByFilm11, actorByFilm12, actorByFilm13, actorByFilm14, actorByFilm15,
             actorByFilm16, actorByFilm17, actorByFilm18, actorByFilm19, actorByFilm20, actorByFilm21, actorByFilm22, actorByFilm23, actorByFilm24,
             actorByFilm25, actorByFilm26, actorByFilm27, actorByFilm28, actorByFilm29, actorByFilm30, actorByFilm31);

            modelBuilder.Entity<GenreByFilm>().HasData(genreByFilm1, genreByFilm2, genreByFilm3, genreByFilm4, genreByFilm5, genreByFilm6,
             genreByFilm7, genreByFilm8, genreByFilm9, genreByFilm10, genreByFilm11, genreByFilm12, genreByFilm13, genreByFilm14, genreByFilm15,
             genreByFilm16, genreByFilm17, genreByFilm18, genreByFilm19, genreByFilm20, genreByFilm21, genreByFilm22, genreByFilm23, genreByFilm24,
             genreByFilm25, genreByFilm26, genreByFilm27);
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
                    Password = BCryptNet.HashPassword("secretpass", salt2),
                    Salt = salt2
                },
                new User
                {
                    UserId = 3,
                    Nick = "Taquillero",
                    Password = BCryptNet.HashPassword("secretpass", salt3),
                    Salt = salt3
                },
                new User
                {
                    UserId = 4,
                    Nick = "Gerente",
                    Password = BCryptNet.HashPassword("secretpass", salt4),
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
                Percent = 0 // 0%
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
                Percent = 0.40f // 40%
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
                Percent = 0.25f // 25%
            };

            modelBuilder.Entity<Discount>().HasData(discount0, discount1, discount2, discount3, discount4, discount5);
        }

        public void SeedDataRooms(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Room>().HasData(
                 new Room
                 {
                     RoomId = 1,
                     Name = "Sala Plus+",
                     SeatsCount = 1
                 },

                 new Room
                 {
                     RoomId = 2,
                     Name = "Sala Clásica",
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
                    Code = "PLUS-1"
                },

                new Seat
                {
                    SeatId = 2,
                    RoomId = 2,
                    Code = "CLAS-1"
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
                MovieId = 4,
                DateTimeId = DateTime.Parse("2023-12-10 18:00:00"),
                Price = 4.99,
                PricePoints = 25
            };

            var movieProgramming2 = new MovieProgramming
            {
                Identifier = Guid.NewGuid(),
                RoomId = 2,
                MovieId = 15,
                DateTimeId = DateTime.Parse("2023-12-10 21:00:00"),
                Price = 4.00,
                PricePoints = 20
            };

            var movieProgramming3 = new MovieProgramming
            {
                Identifier = Guid.NewGuid(),
                RoomId = 2,
                MovieId = 16,
                DateTimeId = DateTime.Parse("2023-12-11 18:00:00"),
                Price = 4.00,
                PricePoints = 20
            };

            var movieProgramming4 = new MovieProgramming
            {
                Identifier = Guid.NewGuid(),
                RoomId = 2,
                MovieId = 8,
                DateTimeId = DateTime.Parse("2023-12-11 21:00:00"),
                Price = 2.00,
                PricePoints = 15
            };

            var movieProgramming5 = new MovieProgramming
            {
                Identifier = Guid.NewGuid(),
                RoomId = 1,
                MovieId = 10,
                DateTimeId = DateTime.Parse("2023-12-8 18:00:00"),
                Price = 2.00,
                PricePoints = 15
            };

            var movieProgramming6 = new MovieProgramming
            {
                Identifier = Guid.NewGuid(),
                RoomId = 1,
                MovieId = 1,
                DateTimeId = DateTime.Parse("2023-12-8 21:00:00"),
                Price = 4.00,
                PricePoints = 25
            };

            var movieProgramming7 = new MovieProgramming
            {
                Identifier = Guid.NewGuid(),
                RoomId = 1,
                MovieId = 13,
                DateTimeId = DateTime.Parse("2023-12-9 18:00:00"),
                Price = 2.00,
                PricePoints = 15
            };

            var movieProgramming8 = new MovieProgramming
            {
                Identifier = Guid.NewGuid(),
                RoomId = 1,
                MovieId = 9,
                DateTimeId = DateTime.Parse("2023-12-9 21:00:00"),
                Price = 4.00,
                PricePoints = 25
            };

            var movieProgramming9 = new MovieProgramming
            {
                Identifier = Guid.NewGuid(),
                RoomId = 3,
                MovieId = 5,
                DateTimeId = DateTime.Parse("2023-12-8 18:00:00"),
                Price = 5.00,
                PricePoints = 30
            };

            var movieProgramming10 = new MovieProgramming
            {
                Identifier = Guid.NewGuid(),
                RoomId = 3,
                MovieId = 12,
                DateTimeId = DateTime.Parse("2023-12-8 21:00:00"),
                Price = 6.00,
                PricePoints = 35
            };

            var movieProgramming11 = new MovieProgramming
            {
                Identifier = Guid.NewGuid(),
                RoomId = 3,
                MovieId = 19,
                DateTimeId = DateTime.Parse("2023-12-9 18:00:00"),
                Price = 5.00,
                PricePoints = 30
            };

            var movieProgramming12 = new MovieProgramming
            {
                Identifier = Guid.NewGuid(),
                RoomId = 3,
                MovieId = 20,
                DateTimeId = DateTime.Parse("2023-12-9 21:00:00"),
                Price = 6.00,
                PricePoints = 35
            };

            var movieProgramming13 = new MovieProgramming
            {
                Identifier = Guid.NewGuid(),
                RoomId = 4,
                MovieId = 6,
                DateTimeId = DateTime.Parse("2023-12-8 18:00:00"),
                Price = 5.00,
                PricePoints = 30
            };

            var movieProgramming14 = new MovieProgramming
            {
                Identifier = Guid.NewGuid(),
                RoomId = 3,
                MovieId = 16,
                DateTimeId = DateTime.Parse("2023-12-8 21:00:00"),
                Price = 6.00,
                PricePoints = 35
            };

            var movieProgramming15 = new MovieProgramming
            {
                Identifier = Guid.NewGuid(),
                RoomId = 3,
                MovieId = 7,
                DateTimeId = DateTime.Parse("2023-12-9 18:00:00"),
                Price = 5.00,
                PricePoints = 30
            };

            var movieProgramming16 = new MovieProgramming
            {
                Identifier = Guid.NewGuid(),
                RoomId = 3,
                MovieId = 3,
                DateTimeId = DateTime.Parse("2023-12-9 21:00:00"),
                Price = 6.00,
                PricePoints = 35
            };


            modelBuilder.Entity<MovieProgramming>().HasData(movieProgramming1, movieProgramming2, movieProgramming3, movieProgramming4, movieProgramming5, movieProgramming6, movieProgramming7, movieProgramming8, movieProgramming9, movieProgramming10, movieProgramming11, movieProgramming12, movieProgramming13, movieProgramming14, movieProgramming15, movieProgramming16);
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