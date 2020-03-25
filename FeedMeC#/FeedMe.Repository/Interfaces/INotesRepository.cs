using System;
using System.Collections.Generic;
using FeedMe.Repository.Models;

namespace FeedMe.Repository.Interfaces
{
    public interface INotesRepository
    {
        /// <summary>
        /// get all notes
        /// </summary>
        List<NotesModel> Select();
        /// <summary>
        /// get all notes for this user id
        /// </summary>
        List<NotesModel> Select(int user_id);
        /// <summary>
        /// get notes from this favorited id by user id
        /// </summary>
        NotesModel Select(int user_id, int favorited_id);

        /// <summary>
        /// create new note
        /// </summary>
        void Insert(NotesModel notes);
        //void Insert(string notes, int favorite_id, int user_id);

        /// <summary>
        /// edit note by id
        /// </summary>
        void Update(int id, string updatedNote);

        /// <summary>
        /// deleting by id
        /// </summary>
        void Delete(int id);
    }
}
