namespace CineplusDB.Models
{
    public class Movie
    {
        public int MovieId { get; set; }
        public string Title { get; set; }
        public int Year { get; set; }
        public string Country { get; set; }
        public string Director { get; set; }
        public int Duration { get; set; }

        public ICollection<ActorByFilm> ActorsByFilms { get; set; }
         public ICollection<GenreByFilm> GenresByFilms { get; set; }
    }
}