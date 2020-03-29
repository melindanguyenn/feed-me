using System.Collections.Generic;
using System.Threading.Tasks;
using FeedMe.API.HttpServices;
using FeedMe.API.Models.RecipeModels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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

			string response;
            if (ingredients == "apple")
            {
				response = "[{\"id\":933310,\"title\":\"2 Ingredient Instant Pot Applesauce\",\"image\":\"https://spoonacular.com/recipeImages/933310-312x231.jpg\",\"imageType\":\"jpg\",\"usedIngredientCount\":1,\"missedIngredientCount\":0,\"missedIngredients\":[],\"usedIngredients\":[{\"id\":9003,\"amount\":11.0,\"unit\":\"large\",\"unitLong\":\"larges\",\"unitShort\":\"large\",\"aisle\":\"Produce\",\"name\":\"apples\",\"original\":\"11 Apples, peeled and chopped in large pieces *see note\",\"originalString\":\"11 Apples, peeled and chopped in large pieces *see note\",\"originalName\":\"11 Apples, peeled and chopped in large pieces *see note\",\"metaInformation\":[\"peeled\",\"chopped\"],\"meta\":[\"peeled\",\"chopped\"],\"image\":\"https://spoonacular.com/cdn/ingredients_100x100/apple.jpg\"}],\"unusedIngredients\":[],\"likes\":0}" +
                    "]";
            }
            else
            {
				response = await _recipeService.SearchAsync(ingredients);
			}

			return Content(response, "application/json");
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> Get(int id)
		{
			string summaryResponse;
			string ingredientsResponse;
			string directionsResponse;

			if (id == 933310 || id == 0)
			{
				summaryResponse = "{\"id\":933310,\"title\":\"2 Ingredient Instant Pot Applesauce\",\"summary\":\"The recipe 2 Ingredient Instant Pot Applesauce can be made <b>in roughly 13 minutes</b>. This recipe serves 4. This side dish has <b>331 calories</b>, <b>2g of protein</b>, and <b>1g of fat</b> per serving. For <b>$2.03 per serving</b>, this recipe <b>covers 9%</b> of your daily requirements of vitamins and minerals. This recipe is liked by 1 foodies and cooks. If you have apples, sugar, water, and a few other ingredients on hand, you can make it. It is brought to you by Oh Sweet Basil. It is a good option if you're following a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan</b> diet. With a spoonacular <b>score of 37%</b>, this dish is not so spectacular. <a href=\\\"https://spoonacular.com/recipes/2-ingredient-instant-pot-applesauce-1342595\\\">2 Ingredient Instant Pot Applesauce</a>, <a href=\\\"https://spoonacular.com/recipes/instant-pot-applesauce-1380561\\\">Instant Pot Applesauce</a>, and <a href=\\\"https://spoonacular.com/recipes/instant-pot-applesauce-1371513\\\">Instant Pot Applesauce</a> are very similar to this recipe.\"}";
				ingredientsResponse = "{\"ingredients\":[{\"name\":\"apples\",\"image\":\"apple.jpg\",\"amount\":{\"metric\":{\"value\":11.0,\"unit\":\"large\"},\"us\":{\"value\":11.0,\"unit\":\"large\"}}},{\"name\":\"sugar\",\"image\":\"sugar-in-bowl.png\",\"amount\":{\"metric\":{\"value\":1.0,\"unit\":\"Tbsp\"},\"us\":{\"value\":1.0,\"unit\":\"Tbsp\"}}},{\"name\":\"water\",\"image\":\"water.png\",\"amount\":{\"metric\":{\"value\":312.5,\"unit\":\"ml\"},\"us\":{\"value\":1.25,\"unit\":\"cup\"}}}]}";
				directionsResponse = "[{\"name\":\"\",\"steps\":[{\"number\":1,\"step\":\"Places the apples and water in an instant pot. Secure the lid and be sure that the valve is set to sealing. Set the timer to 8 minutes on high pressure and let the apples cook.Once done, vent the apples until the steam stops.\",\"ingredients\":[{\"id\":9003,\"name\":\"apple\",\"image\":\"apple.jpg\"},{\"id\":14412,\"name\":\"water\",\"image\":\"water.png\"}],\"equipment\":[{\"id\":414093,\"name\":\"instant pot\",\"image\":\"\"},{\"id\":404695,\"name\":\"kitchen timer\",\"image\":\"kitchen-timer.jpg\"}],\"length\":{\"number\":8,\"unit\":\"minutes\"}},{\"number\":2,\"step\":\"Remove the apples to a blender or a bowl with an immersion blender and pulse until desired consistency. Taste and add a little sugar if needed, we usually dont add any, but occasionally need a tablespoon or two.\",\"ingredients\":[{\"id\":9003,\"name\":\"apple\",\"image\":\"apple.jpg\"},{\"id\":19335,\"name\":\"sugar\",\"image\":\"sugar-in-bowl.png\"}],\"equipment\":[{\"id\":404776,\"name\":\"immersion blender\",\"image\":\"immersion-blender.png\"},{\"id\":404726,\"name\":\"blender\",\"image\":\"blender.png\"},{\"id\":404783,\"name\":\"bowl\",\"image\":\"bowl.jpg\"}]}]}]";
			}
			else
			{
				summaryResponse = await _recipeService.GetSummaryAsync(id);
				ingredientsResponse = await _recipeService.GetIngredientsAsync(id);
				directionsResponse = await _recipeService.GetDirectionsAsync(id);
			}

			var summary = JsonConvert.DeserializeObject(summaryResponse);
			var ingredient = JsonConvert.DeserializeObject(ingredientsResponse);
			var directions = JsonConvert.DeserializeObject(directionsResponse);

			var recipeInformation = new RecipeInformationModel();
			recipeInformation.summary = summary;
			recipeInformation.ingredients = ingredient;
			recipeInformation.directions = directions;

			var response = JsonConvert.SerializeObject(recipeInformation);
			return Content(response, "application/json");
		}
	}
}
