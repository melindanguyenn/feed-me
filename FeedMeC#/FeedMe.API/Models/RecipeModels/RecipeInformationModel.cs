using System;
using System.Collections.Generic;

namespace FeedMe.API.Models.RecipeModels
{
    public class RecipeInformationModel
    {
        public List<DirectionsModel> directions { get; set; }
        public IngredientsModel ingredients { get; set; }
        public SummaryModel summary { get; set; }

    }
}
