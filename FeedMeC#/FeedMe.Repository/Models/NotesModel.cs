using System;
namespace FeedMe.Repository.Models
{
    public class NotesModel
    {
       public int id { get; set; }
        public string notes { get; set; }
        public int favorited_id { get; set; }
        public int user_id { get; set; }
    }
}
