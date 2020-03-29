using System;
namespace FeedMe.Repository.Models
{
    public class FavoriteNotesModel
    {
        public int notes_id { get; set; }
        public int favorited_id { get; set; }
        public int recipe_id { get; set; }
        public string favorited_title { get; set; }
        public string notes { get; set; }
    }
}
