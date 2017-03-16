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
      var thisRating = thisRecipe[0].avg;
      $('.name-field').text(thisRecipe[0].name);
      $('.description-field').text(data[0].description);
      $('.rating-field').text(Number(thisRating).toFixed(1).toString());
      $('.author-field').text(data[0].name);
      $('.food-pic').attr('src', thisRecipe[0].image);
      $('.edit-button').attr('href', './edit.html?recipe=' + recipeId);
    })
})
