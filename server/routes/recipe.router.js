const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:ingredient", (req, res) => {
  console.log("in server, req.params", req.params);
  axios
    .get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${req.params.ingredient}&number=2&apiKey=${process.env.SPOONACULAR_API_KEY}`
    )
    .then(response => {
      console.log("API response is", response.data);
      res.send(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
