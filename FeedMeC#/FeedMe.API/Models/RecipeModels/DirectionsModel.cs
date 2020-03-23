using System;
using System.Collections.Generic;

namespace FeedMe.API.Models.RecipeModels
{
    public class DirectionsModel
    {
        public string name { get; set; }
        public List<StepModel> steps { get; set; }
    }
    public class StepModel
    {
        public int number { get; set; }
        public string step { get; set; }

    }
}
