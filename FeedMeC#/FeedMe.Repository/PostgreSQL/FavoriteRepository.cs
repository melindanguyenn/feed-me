using FeedMe.Repository.Dapper;
using FeedMe.Repository.Interfaces;
using FeedMe.Repository.Models;
using System.Collections.Generic;
using System.Linq;

namespace FeedMe.Repository.PostgreSQL
{
    public class FavoriteRepository : IFavoriteRepository
    {
        #region Properties and Initialization
        private readonly IDapperService _postgreSQL;

        public FavoriteRepository(IDapperService postgreSQL)
        {
            _postgreSQL = postgreSQL;
        }

        #endregion

        public int Insert(FavoriteModel favorite)
        {
            var sql = "INSERT INTO public.favorited(recipe_id, favorited_title, user_id) VALUES(@recipe_id, @favorited_title, @user_id)";
            var parameters = favorite;

            var id = _postgreSQL.Insert(sql, parameters);
            return id;
        }

        public List<FavoriteModel> Select(int userId)
        {
            var sql = "SELECT * FROM public.favorited WHERE user_id = @UserId";
            var parameters = new { UserId = userId };

            var results = _postgreSQL.Query<FavoriteModel>(sql, parameters);
            return results.ToList();
        }
    }
}
