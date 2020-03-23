using System.Collections.Generic;

namespace FeedMe.Repository.Dapper
{
    public interface IDapperService
    {
        int Insert(string sql, object parameters = null);
        void Execute(string sql, object parameters = null);
        IEnumerable<T> Query<T>(string sql, object parameters = null);
    }
}
