using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace FeedMe.API.HttpServices
{
	public class RecipeService : IRecipeService
	{
		#region Properties and Initialization

		private readonly HttpClient _httpClient;
		private readonly string _apiKey;
		public RecipeService(HttpClient httpClient, IConfiguration configuration)
		{
			//SPOONACULAR_API_KEY
			var baseUrl = new Uri("https://api.spoonacular.com/recipes/");
			httpClient.BaseAddress = baseUrl;

			_httpClient = httpClient;

			_apiKey = configuration["SPOONACULAR_API_KEY"];
		}
		public async Task<string> SearchAsync(string parameters)
		{
			var requestUri = BuildRequestUri($"findByIngredients?ingredients={parameters}&number=6&");

			var response = await _httpClient.GetAsync(requestUri);
			response.EnsureSuccessStatusCode();

			var result = await response.Content.ReadAsStringAsync();
			return result;
		}

		public async Task<string> GetSummaryAsync(int id)
		{
			var requestUri = BuildRequestUri($"{id}/summary?");

			var response = await _httpClient.GetAsync(requestUri);
			response.EnsureSuccessStatusCode();

			var result = await response.Content.ReadAsStringAsync();
			return result;
		}
	

        public async Task<string> GetIngredientsAsync(int id)
        {
			var requestUri = BuildRequestUri($"{id}/ingredientWidget.json?");

			var response = await _httpClient.GetAsync(requestUri);
			response.EnsureSuccessStatusCode();

			var result = await response.Content.ReadAsStringAsync();
			return result;
		}

        public async Task<string> GetDirectionsAsync(int id)
        {
			var requestUri = BuildRequestUri($"{id}/analyzedInstructions?");

			var response = await _httpClient.GetAsync(requestUri);
			response.EnsureSuccessStatusCode();

			var result = await response.Content.ReadAsStringAsync();
			return result;
		}

		private string BuildRequestUri(string Uri)
		{
			return $"{Uri}apiKey={_apiKey}";
		}
		//public async Task<string> PostAsync(string body)
		//{
		//	var requestUri = "";

		//	var content = new StringContent(body, Encoding.UTF8, "application/json");
		//	var response = await _httpClient.PostAsync(requestUri,content);
		//	response.EnsureSuccessStatusCode();

		//	var result = await response.Content.ReadAsStringAsync();
		//	return result;
		//}

		#endregion
	}
}
