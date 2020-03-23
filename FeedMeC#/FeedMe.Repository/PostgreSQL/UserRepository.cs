using FeedMe.Repository.Dapper;
using FeedMe.Repository.Interfaces;
using FeedMe.Repository.Models;
using System.Collections.Generic;
using System.Linq;

namespace FeedMe.Repository.PostgreSQL
{
	public class UserRepository : IUserRepository
	{
		#region Properties and Initialization
		private readonly IDapperService _postgreSQL;

		public UserRepository(IDapperService postgreSQL)
		{
			_postgreSQL = postgreSQL;
		}
		#endregion

		public int Insert(UserModel user)
		{
			var sql = "INSERT INTO public.user(email, password) VALUES(@email, @password)";
			var parameters = user;

			var id = _postgreSQL.Insert(sql, parameters);
			return id;
		}

		public IEnumerable<UserModel> Select()
		{
			var sql = "SELECT * FROM public.user";

			var results = _postgreSQL.Query<UserModel>(sql);
			return results;
		}

		public UserModel Select(int id)
		{
			var sql = "SELECT * FROM public.user WHERE id = @Id";
			var parameters = new { Id = id };

			var result = _postgreSQL.Query<UserModel>(sql, parameters).FirstOrDefault();
			return result;
		}

		public UserModel Select(UserModel user)
		{
			var sql = "SELECT * FROM public.user WHERE email = @Email AND password = @Password";
			var parameters = new { Email = user.email, Password = user.password };			

			var result = _postgreSQL.Query< UserModel>(sql, parameters).FirstOrDefault(); 
			return result;
		}

		public void Update(int id, string newPassword)
		{
			var sql = "UPDATE public.user SET password = @newPassword WHERE id = @Id";
			var parameters = new { Id = id, NewPassword = newPassword };

			_postgreSQL.Execute(sql, parameters);			
		}

		public void Delete(int id)
		{
			var sql = "DELETE FROM public.user WHERE id = @Id";
			var parameters = new { Id = id };

			 _postgreSQL.Execute(sql, parameters);			
		}

	}
}



