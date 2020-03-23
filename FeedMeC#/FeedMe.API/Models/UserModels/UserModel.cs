using System;

namespace FeedMe.Api.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
        public Guid RefreshToken { get; set; }
    }
}