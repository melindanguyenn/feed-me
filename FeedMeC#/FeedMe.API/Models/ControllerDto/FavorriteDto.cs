using System;
namespace FeedMe.API.Models
{
    public class FavoriteDto
    {
        public int Id { get; set; }
        public int RecipeId { get; set; }
        public string FavoriteTitle { get; set; }
        public int UserId { get; set; }
    }
}
