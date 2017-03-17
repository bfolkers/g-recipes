$(function() {
  var queryParameter = window.location.search.substring(1);
  var queryArray = queryParameter.split('=');
  var recipeId = queryArray[1];
  var recipes = [];
  $.get('https://g-recipies.herokuapp.com/recipe?avgReview=true')
    .then(function(data, status) {
      recipes = data;
    })
  $.get('https://g-recipies.herokuapp.com/recipeAndAuthor/' + recipeId)
    .then(function(data, status) {
      var thisRecipe = recipes.filter(function(element) {
        return (element.id === Number(recipeId));
      })
      var recipeName = thisRecipe[0].name;
      var recipeNameArray = recipeName.split(' ');
      for (var i in recipeNameArray) {
        var word = recipeNameArray[i].toLowerCase();
        if (word === 'and' || word === 'with') {
          recipeNameArray[i] = recipeNameArray[i].toLowerCase();
        } else {
          recipeNameArray[i] = recipeNameArray[i].toLowerCase();
          recipeNameArray[i] = capitalizeFirstLetter(recipeNameArray[i]);
        }
      }
      var formattedRecipeName = recipeNameArray.join(' ');
      var thisRating = thisRecipe[0].avg;
      $('.name-field').text(formattedRecipeName);
      $('.description-field').text(data[0].description);
      $('.rating-field').text(Number(thisRating).toFixed(1).toString());
      $('.author-field').text(data[0].name);
      $('.food-pic').attr('src', thisRecipe[0].image);
      $('.edit-button').attr('href', './edit.html?recipe=' + recipeId);
    })

  $.get('https://g-recipies.herokuapp.com/indivRecipeIngred/' + recipeId)
    .then(function(data, status) {
      var $ingredientList = $('.ingredient-list');
      for (var i in data) {
        $ingredientList.append(`<li>${data[i].quantity} ${data[i].name}</li>`)
      }
    })
    .catch(function(error) {
      console.log(error);
    })

  $.get('https://g-recipies.herokuapp.com/indivRecipeSteps/' + recipeId)
    .then(function(recipeSteps) {
      var sortedRecipeSteps = recipeSteps.sort(function(a, b) {
        return a.step_number - b.step_number;
      })
      var $stepList = $('.step-list');
      for (var i in sortedRecipeSteps) {
        $stepList.append(`<li>${sortedRecipeSteps[i].step_number}. ${sortedRecipeSteps[i].step_body}</li>`);
      }
    })
})

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
