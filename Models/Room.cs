namespace CineplusDB.Models
{
    public class Room
    {
        public Room()
        {
            SeatsByRoom = new List<Seat>();
        }
        
        public int RoomId { get; set; }
        public string Name { get; set; }
        public int SeatsCount { get; set; }

        public ICollection<Seat> SeatsByRoom { get; set; }
    }

    public class RoomDto 
{
    public int id { get; set; } = 0;
    public string name { get; set; }
    public int seats { get; set; }
}
}