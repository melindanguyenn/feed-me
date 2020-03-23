using System;
namespace FeedMe.Repository.Models
{
    public class FavoriteModel
    {
        public int id { get; set; }
        public string favorited_url { get; set; }
        public int user_id { get; set; }
    }
}
