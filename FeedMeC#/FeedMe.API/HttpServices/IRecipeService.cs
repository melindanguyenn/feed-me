using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeedMe.API.HttpServices
{
	public interface IRecipeService
	{
		Task<string> SearchAsync(string parameters);
		Task<string> GetSummaryAsync(int id);
		Task<string> GetIngredientsAsync(int id);
		Task<string> GetDirectionsAsync(int id);
	}
}
