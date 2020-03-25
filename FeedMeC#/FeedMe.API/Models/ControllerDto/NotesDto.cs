using System;
namespace FeedMe.API.Models.ControllerDto
{
    public class NotesDto
    {
        /// <summary>
        /// note about a recipe
        /// </summary>
        public string notes { get; set; }
        /// <summary>
        /// id of recipe this note is for
        /// </summary>
        public int favorited_id { get; set; }
        /// <summary>
        /// id of user writing this note
        /// </summary>
        public int user_id { get; set; }
    }
}
