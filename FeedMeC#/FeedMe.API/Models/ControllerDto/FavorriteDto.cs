using System;
namespace FeedMe.API.Models
{
    public class FavoriteDto
    {
        public int Id { get; set; }
        public string FavoritedUrl { get; set; }
        public int UserId { get; set; }
    }
}
