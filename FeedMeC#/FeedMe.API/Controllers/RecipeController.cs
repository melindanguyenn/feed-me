using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using FeedMe.API.HttpServices;
using FeedMe.API.Models.RecipeModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FeedMe.API.Controllers
{
	[Route("api/[controller]")]
	public class RecipeController : Controller
	{
		#region Properties and Initialization

		private readonly IRecipeService _recipeService;
		public RecipeController(IRecipeService recipeService)
		{
			_recipeService = recipeService;
			
		}


		#endregion
		[HttpGet("Search/{parameters}")]
		public async Task< IActionResult> Search(List<string> parameters)
		{
			var ingredients = string.Join(",", parameters);

			var response = await _recipeService.SearchAsync(ingredients);
			return Content(response, "application/json");
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> Get(int id)
		{
			var summaryResponse = await _recipeService.GetSummaryAsync(id);
			var ingredientsResponse = await _recipeService.GetIngredientsAsync(id);
			var directionsResponse = await _recipeService.GetDirectionsAsync(id);

            var summary = JsonConvert.DeserializeObject<SummaryModel>(summaryResponse);
			var ingredient = JsonConvert.DeserializeObject<IngredientsModel>(ingredientsResponse);
			var directions = JsonConvert.DeserializeObject<List<DirectionsModel>>(directionsResponse);

			var recipeInformation = new RecipeInformationModel();
			recipeInformation.summary = summary;
			recipeInformation.ingredients = ingredient;
			recipeInformation.directions = directions;

			var response = JsonConvert.SerializeObject(recipeInformation);
			return Content(response, "application/json");
		}
	}
}
