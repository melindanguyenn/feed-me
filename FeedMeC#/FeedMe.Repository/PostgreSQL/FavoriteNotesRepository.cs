using System;
using System.Collections.Generic;
using System.Linq;
using FeedMe.Repository.Dapper;
using FeedMe.Repository.Interfaces;
using FeedMe.Repository.Models;

namespace FeedMe.Repository.PostgreSQL
{
    public class FavoriteNotesRepository : IFavoriteNotesRepository
    {
        #region Properties and Initialization
        private readonly IDapperService _postgreSQL;

        public FavoriteNotesRepository(IDapperService postgreSQL)
        {
            _postgreSQL = postgreSQL;
        }

        public List<FavoriteNotesModel> Select(int user_id)
        {
            var sql = "SELECT " +
                    "favorited.id favorited_id, " +
                    "favorited.recipe_id," +
                    "favorited.favorited_title, " +
                    "notes.id notes_id, " +
                    "notes.notes " +
                "FROM favorited LEFT JOIN notes " +
                     "ON favorited.id = notes.favorited_id " +
                "WHERE " +
                    "favorited.user_id = @user_id; ";

            var parameters = new { user_id };

            var results = _postgreSQL.Query<FavoriteNotesModel>(sql, parameters);
            return results.ToList();
        }

        #endregion
    }
}
