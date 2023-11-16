namespace CineplusDB.Models
{
    public class Room
    {
        public int RoomId { get; set; }
        public string Name { get; set; }
        public int SeatsCount { get; set; }

    }

    public class RoomDto 
{
    public int id { get; set; } = 0;
    public string name { get; set; }
    public int seats { get; set; }
}
}