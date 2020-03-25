using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FeedMe.API.Models;
using FeedMe.Repository.Interfaces;
using FeedMe.Repository.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FeedMe.API.Controllers
{
    [Route("api/[controller]")]
    public class FavoriteController : Controller
    {
        #region Properties and Initialization
        private readonly IFavoriteRepository _favoriteRepository;

        public FavoriteController(IFavoriteRepository favoriteRepository)
        {
            _favoriteRepository = favoriteRepository;
        }
        #endregion
        // GET: api/values
        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {
            var favorites = new List<Repository.Models.FavoriteModel>();
            
            try
            {
              favorites = _favoriteRepository.Select(userId).ToList();    
            }
            catch (Exception ex)
            {
                HandleError(ex);
            }

            return Ok(favorites);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]FavoriteDto favoriteDto)
        {
            try
            {
                //var fave = new FavoriteModel()
                //{
                //    id = favoriteDto.Id,
                //    favorited_url = favoriteDto.FavoritedUrl,
                //    user_id = favoriteDto.UserId
                //};

                var favoriteModel = new FavoriteModel();
                favoriteModel.id = favoriteDto.Id;
                favoriteModel.favorited_url = favoriteDto.FavoritedUrl;
                favoriteModel.user_id = favoriteDto.UserId;

                _favoriteRepository.Insert(favoriteModel);
            }
            catch (Exception ex)
            {
                HandleError(ex);
            }

            return Ok();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]string value)
        {
            try
            {

            }
            catch (Exception ex)
            {
                HandleError(ex);
            }

            return Ok();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {

            }
            catch (Exception ex)
            {
                HandleError(ex);
            }

            return Ok();
        }

        private void HandleError(Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }
}
