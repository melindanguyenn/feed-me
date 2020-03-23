using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace FeedMe.Repository.Dapper
{
    public class NpgSqlService : IDapperService
    {
        #region Properties and Initialization
        private readonly string ConnectionString;
        public IDbConnection Connection => new NpgsqlConnection(ConnectionString);

        public NpgSqlService(IConfiguration configuration)
        {
            ConnectionString = configuration["ConnectionStrings:DefaultConnection"];         
        }

        #endregion
        public int Insert(string sql, object parameters = null)
        {
            sql += ";SELECT CAST(SCOPE_IDENTITY() as int)";

            using (var dbConnection = Connection)
            {
                dbConnection.Open();
                // return dbConnection.Query<int>(sql, parameters).SingleOrDefault();
                dbConnection.Execute(sql, parameters);
                return 0;
            }
        }
        public void Execute(string sql, object parameters = null)
        {
            using (var dbConnection = Connection)
            {
               dbConnection.Open();
               dbConnection.Execute(sql, parameters);
            }
        }

        public IEnumerable<T> Query<T>(string sql, object parameters = null)
        {
            using (var dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<T>(sql, parameters);
            }
        }
    }
}
