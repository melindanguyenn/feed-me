using System;
using FeedMe.API.Models.ControllerDto;
using FeedMe.Repository.Interfaces;
using FeedMe.Repository.Models;
using Microsoft.AspNetCore.Mvc;

namespace FeedMe.API.Controllers
{
    [Route("api/[controller]")]
    public class NotesController : Controller
    {
        #region Properties and Initialization
        private readonly INotesRepository _notesRepository;

        public NotesController(INotesRepository notesRepository)
        {
            _notesRepository = notesRepository;
        }
        #endregion

      /// <summary>
      /// update note by id
      /// </summary>
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]string updatedNote)
        {
            try
            {

                _notesRepository.Update(id, updatedNote);
            }
            catch (Exception ex)
            {
                HandleError(ex);
            }

            return Ok();
        }

        /// <summary>
        /// delete note
        /// </summary>
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {

                _notesRepository.Delete(id);
            }
            catch (Exception ex)
            {
                HandleError(ex);
            }

            return Ok();
        }

        /// <summary>
        /// create note
        /// </summary
        [HttpPost()]
        public IActionResult Post([FromBody]NotesDto notesDto)
        {
            try
            {
                var note = new NotesModel()
                {
                    notes = notesDto.notes,
                    favorited_id = notesDto.favorited_id,
                    user_id = notesDto.user_id
                };
                _notesRepository.Insert(note);
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
