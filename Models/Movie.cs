namespace CineplusDB.Models
{
    public class Movie
    {
        public Movie()
        {
            ActorsByFilms = new List<ActorByFilm>();
            GenresByFilms = new List<GenreByFilm>();
        }
        
        public int MovieId { get; set; }
        public string Title { get; set; }
        public int Year { get; set; }
        public string Country { get; set; }
        public string Director { get; set; }
        public int Duration { get; set; }

        public ICollection<ActorByFilm> ActorsByFilms { get; set; }
        public ICollection<GenreByFilm> GenresByFilms { get; set; }
    }

    public class MovieInput
    {
        public int id { get; set; } = 0;
        public string title { get; set; }
        public int year { get; set; }
        public string country { get; set; }
        public string director { get; set; }
        public int duration { get; set; }
        public List<int> actors { get; set; }
        public List<int> genres { get; set; }
    }

    public class MovieGet
    {
        public int id { get; set; }
        public string title { get; set; }
        public int year { get; set; }
        public string country { get; set; }
        public string director { get; set; }
        public int duration { get; set; }
        public List<ActorDto> actors { get; set; }
        public List<GenreDto> genres { get; set; }
    }

}