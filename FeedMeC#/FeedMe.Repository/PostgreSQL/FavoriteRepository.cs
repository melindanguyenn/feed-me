using FeedMe.Repository.Dapper;
using FeedMe.Repository.Interfaces;
using FeedMe.Repository.Models;
using System.Collections.Generic;

namespace FeedMe.Repository.PostgreSQL
{
    public class FavoriteRepository: IFavoriteRepository
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
            var sql = "INSERT INTO public.favorited(favorited_url, user_id) VALUES(@favorited_url, @user_id)";
            var parameters = favorite;

            var id = _postgreSQL.Insert(sql, parameters);
            return id;           
        }

        public IEnumerable<FavoriteModel> Select(int userId)
        {
            var sql = "SELECT * FROM public.favorited WHERE user_id = @UserId";
            var parameters = new { UserId = userId };

            var results = _postgreSQL.Query<FavoriteModel>(sql, parameters);
            return results;
        }
    }
}
