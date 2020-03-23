using System;
using System.Collections.Generic;

namespace FeedMe.API.Models.RecipeModels
{
    public class IngredientsModel
    {
        public List<IngredientModel> ingredients { get; set; }
    }

    public class IngredientModel
    {
        public AmountModel amount;
        public string image { get; set; }
        public string name { get; set; }
    }

    public class AmountModel
    {
        public USAmountModel us { get; set; }
    }

    public class USAmountModel
    {
        public string unit { get; set; }
        public double value { get; set; }
    }
}
