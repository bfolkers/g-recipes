$(function() {
  var ingredientCount = 0;
  var stepCount = 0;

  $('.add-recipe-ingredient-button').on('click', function(event) {
    event.preventDefault();
    ++ingredientCount;
    $('.recipe-ingredients').append(`
      <div class="row">
        <label for="recipe-ingredient-quantity" class="col-md-1">Quantity: </label>
        <div class="col-md-2">
          <input type="text" class="recipe-ingredient-quantity form-control" id="recipe-ingredient-quantity-${ingredientCount.toString()}" placeholder="Quantity">
        </div>
        <label for="recipe-ingredient-name" class="col-md-1">Ingredient: </label>
        <div class="col-md-8">
          <input type="text" class="recipe-ingredient-name form-control" id="recipe-ingredient-name-${ingredientCount.toString()}" placeholder="Ingredient">
        </div>
      </div>
      `)
  })

  $('.add-recipe-step-button').on('click', function(event) {
    // event.preventDefault();
    ++stepCount;
    $('.recipe-steps').append(`
      <label for="recipe-step" class="col-md-2 control-label">Step ${stepCount.toString()}: </label>
      <div class="col-md-10">
        <textarea class="recipe-step form-control" rows="2" id="recipeStep-${stepCount.toString()}"></textarea>
      </div>
      `)
  })

  $('.reset-button').on('click', function(event) {
    event.preventDefault();
    $('#inputTitle').val('');
    $('#inputImage').val('');
    $('#inputDescription').val('');
    $('#inputAuthor').val('');
    $('.recipe-steps *').remove();
    $('.recipe-ingredients *').remove();
    ingredientCount = 0;
    stepCount = 0;
  })

  $('.submit-button').on('click', function(event) {
    event.preventDefault();
    var recipe = {};
    recipe.name = $('#inputTitle').val();
    recipe.image = $('#inputImage').val();
    recipe.steps = [];
    recipe.ingredients = [];
    for (var i = 0; i < stepCount; i++) {
      recipe.steps[i] = $('#recipeStep-' + (i + 1)).val();
    }
    for (var i = 0; i < ingredientCount; i++) {
      recipe.ingredients[i] = {quantity: $('#recipe-ingredient-quantity-' + (i + 1)).val(),
                               name: $('#recipe-ingredient-name-' + (i + 1)).val()};
    }
    console.log(recipe.steps);
     // window.location.replace("./index.html");
  })

})
