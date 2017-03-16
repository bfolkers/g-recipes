$(function() {
  var queryParameter = window.location.search.substring(1);
  var queryArray = queryParameter.split('=');
  var recipeId = queryArray[1];
  var recipes = [];
  console.log(recipeId);

  $.get('https://g-recipies.herokuapp.com/recipe?avgReview=true')
    .then(function(data, status) {
      recipes = data;
      var currentRecipe = recipes.filter(function(element) {
        return (element.id === Number(recipeId));
      })
      var thisRecipe = currentRecipe[0];
      $('#inputTitle').val(thisRecipe.name);
      $('#inputDescription').val(thisRecipe.description);
      $('#inputImage').val(thisRecipe.image);
    })
    .catch(function(data, status) {
      console.log(status);
    })
})
