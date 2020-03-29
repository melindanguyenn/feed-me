using System;
using System.Collections.Generic;
using System.Linq;
using FeedMe.Repository.Interfaces;
using FeedMe.Repository.Models;
using Microsoft.AspNetCore.Mvc;

namespace FeedMe.API.Controllers
{
    [Route("api/[controller]")]

    public class FavoriteNotesController : Controller
    {
        #region Properties and Initialization
        private readonly IFavoriteNotesRepository _favoriteNotesRepository;

        public FavoriteNotesController(IFavoriteNotesRepository favoriteNotesRepository)
        {
            _favoriteNotesRepository = favoriteNotesRepository;
        }
        #endregion

        // GET: api/values
        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {
            var favoriteNotes = new List<FavoriteNotesModel>();

            try
            {
                favoriteNotes = _favoriteNotesRepository.Select(userId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(favoriteNotes);
        }

    }
}
