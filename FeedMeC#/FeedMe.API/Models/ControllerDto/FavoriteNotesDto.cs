using System;
namespace FeedMe.API.Models.ControllerDto
{
    public class FavoriteNotesDto
    {
        public int notes_id { get; set; }
        public int favorited_id { get; set; }
        public int recipe_id { get; set; }
        public int user_id { get; set; }
        public string notes { get; set; }
    }
}
