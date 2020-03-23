using System;
using System.Collections.Generic;
using System.Text;
using FeedMe.Repository.Models;

namespace FeedMe.Repository.Interfaces
{
	public interface IUserRepository
	{
		int Insert(UserModel user);
		IEnumerable<UserModel> Select();
		UserModel Select(int id);
		UserModel Select(UserModel user);
		void Update(int id, string newPassword);
		void Delete(int id);
	}
}
