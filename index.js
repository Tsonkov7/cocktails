import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app  = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extendet: true}));

app.get("/", async (req,res) => {
    const API_URL_ = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    try {
        const response = await axios.get(API_URL_);
        const cocktail = response.data.drinks[0];


        res.render("index.ejs", {
            name: cocktail.strDrink,
      image: cocktail.strDrinkThumb,
      instructions: cocktail.strInstructions,
      ingredients: getIngredients(cocktail),
    });
  }catch (error) {
    console.log("Error fetching cocktail data:",error.message);
    res.render(error.ejs,{message: "Failed to fetch cocktail recipe"});
  }
});

function getIngredients(cocktail) {
    let ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      const measure = cocktail[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${ingredient} - ${measure || "to taste"}`);
      }
    }
    return ingredients;
  }
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  