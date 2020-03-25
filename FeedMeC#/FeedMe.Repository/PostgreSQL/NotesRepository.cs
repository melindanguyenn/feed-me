using System;
using System.Collections.Generic;
using System.Linq;
using FeedMe.Repository.Dapper;
using FeedMe.Repository.Interfaces;
using FeedMe.Repository.Models;

namespace FeedMe.Repository.PostgreSQL
{
    public class NotesRepository: INotesRepository
    {
        #region Properties and Initialization
        private readonly IDapperService _postgreSQL;

        public NotesRepository(IDapperService postgreSQL)
        {
            _postgreSQL = postgreSQL;
        }

        #endregion

        public void Delete(int id)
        {
            var sql = "DELETE FROM public.notes WHERE id = @Id";
            var parameters = new { Id = id };

            _postgreSQL.Execute(sql, parameters);
        }

        public void Insert(NotesModel notes)
        {
            var sql = "INSERT INTO public.notes (notes, favorited_id, user_id) VALUES (@notes, @favorited_id, @user_id)";
            var parameters = notes;

            _postgreSQL.Insert(sql, parameters);
        }

        public List<NotesModel> Select()
        {
            throw new NotImplementedException();
        }

        public List<NotesModel> Select(int user_id)
        {
            var sql = "SELECT * FROM public.notes WHERE user_id=@user_id";
            var parameters = new { user_id };

            return _postgreSQL.Query<NotesModel>(sql, parameters).ToList();
        }

        public NotesModel Select(int user_id, int favorited_id)
        {
            throw new NotImplementedException();
        }

        public void Update(int id, string updatedNote)
        {
            var sql = "UPDATE public.notes SET notes=@updatedNote WHERE id=@id";
            var parameters = new {id, updatedNote};

            _postgreSQL.Execute(sql, parameters);
        }
    }
}
