$(function() {
  var queryParameter = window.location.search.substring(1);
  var queryArray = queryParameter.split('=');
  var recipeId = queryArray[1];
  var recipes = [];
  var ingredientCount = 0;
  var stepCount = 0;

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

  $.get('https://g-recipies.herokuapp.com/indivRecipeIngred/' + recipeId)
    .then(function(data, status) {
      ingredientCount = data.length;
      var $recipeIngredients = $('.recipe-ingredients');
      for (var i in data) {
        $recipeIngredients.append(`
          <div class="row">
            <label for="recipe-ingredient-quantity" class="col-lg-1 col-md-1 col-sm-1 col-xs-1">Quantity: </label>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
              <input type="text" class="recipe-ingredient-quantity form-control" id="recipe-ingredient-quantity-${i + 1}" placeholder="Quantity">
            </div>
            <label for="recipe-ingredient-name" class="col-lg-1 col-md-1 col-sm-1 col-xs-1">Ingredient: </label>
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <input type="text" class="recipe-ingredient-name form-control" id="recipe-ingredient-name-${i + 1}" placeholder="Ingredient">
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
              <button type="button" class="delete-ingredient-button btn btn-danger" id="delete-ingredient-button-${i + 1}">Delete</button>
            </div>
          </div>
          `)
        $('#recipe-ingredient-quantity-' + (i + 1)).val(data[i].quantity);
        $('#recipe-ingredient-name-' + (i + 1)).val(data[i].name);
      }
    })
    .catch(function(error) {
      console.log(error);
    })

  $.get('https://g-recipies.herokuapp.com/indivRecipeSteps/' + recipeId)
    .then(function(data, status) {
      var sortedRecipeSteps = data.sort(function(a, b) {
        return a.step_number - b.step_number;
      })
      stepCount = data.length;
      var $recipeSteps = $('.recipe-steps');
      for (var i in sortedRecipeSteps) {
        $recipeSteps.append(`
          <div class="row">
            <label for="recipe-step" class="col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label">Step ${sortedRecipeSteps[i].step_number}: </label>
            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
              <textarea class="recipe-step form-control" rows="2" id="recipe-step-${sortedRecipeSteps[i].step_number}"></textarea>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
              <button type="button" class="delete-step-button btn btn-danger" id="delete-step-button-${sortedRecipeSteps[i].step_number}">Delete</button>
            </div>
          </div>
          `)
          $('#recipe-step-' + sortedRecipeSteps[i].step_number).val(sortedRecipeSteps[i].step_body);
      }
    })

  $('.add-recipe-ingredient-button').on('click', function(event) {
    event.preventDefault();
    ++ingredientCount;
    $('.recipe-ingredients').append(`
      <div class="row">
        <label for="recipe-ingredient-quantity" class="col-lg-1 col-md-1 col-sm-1 col-xs-1">Quantity: </label>
        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
          <input type="text" class="recipe-ingredient-quantity form-control" id="recipe-ingredient-quantity-${ingredientCount.toString()}" placeholder="Quantity">
        </div>
        <label for="recipe-ingredient-name" class="col-lg-1 col-md-1 col-sm-1 col-xs-1">Ingredient: </label>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <input type="text" class="recipe-ingredient-name form-control" id="recipe-ingredient-name-${ingredientCount.toString()}" placeholder="Ingredient">
        </div>
        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
          <button type="button" class="delete-ingredient-button btn btn-danger" id="delete-ingredient-button-${ingredientCount.toString()}">Delete</button>
        </div>
      </div>
      `)
  })

  $('.add-recipe-step-button').on('click', function(event) {
    event.preventDefault();
    ++stepCount;
    $('.recipe-steps').append(`
      <div class="row">
        <label for="recipe-step" class="col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label">Step ${stepCount.toString()}: </label>
        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
          <textarea class="recipe-step form-control" rows="2" id="recipe-step-${stepCount.toString()}"></textarea>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
          <button type="button" class="delete-step-button btn btn-danger" id="delete-step-button-${stepCount.toString()}">Delete</button>
        </div>
      </div>
      `)
  })

  $(document).on('click', '.delete-ingredient-button', function(event) {
    event.preventDefault();
    --ingredientCount;
    $(this).parent().parent().remove();
  })

  $(document).on('click', '.delete-step-button', function(event) {
    event.preventDefault();
    --stepCount;
    $(this).parent().parent().remove();
  })

})
