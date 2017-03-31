$(function() {
  var ingredientCount = 0;
  var stepCount = 0;

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
          <textarea class="recipe-step form-control" rows="2" id="recipeStep-${stepCount.toString()}"></textarea>
        </div>
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
    //1. Author table- get back author_id
    //  name
    //  /author
    //2. Recipe table- using author_id, get back recipe_id
    //  title, image, description, author_id
    //  /recipeAdd
    //3. Step table- using recipe_id, plus step number, and step body
    //  step_number, step_body, id(a.k.a. recipe_id)
    //  /stepAdd
    //4. Ingredient table-
    //  name, id (a.k.a. recipe_id), quantity
    //  /ingredientAdd
    event.preventDefault();
    var recipe = {};
    recipe.id = null;
    recipe.name = $('#inputAuthor').val();
    recipe.author_id = null;
    recipe.title = $('#inputTitle').val();
    recipe.image = $('#inputImage').val();
    recipe.description = $('#inputDescription').val();
    recipe.steps = [];
    recipe.ingredients = [];
    $.post('https://g-recipies.herokuapp.com/author', {name: recipe.name})
      .then(function(authorId) {
        recipe.author_id = authorId;
        $.post('https://g-recipies.herokuapp.com/recipeAdd', {
          title: recipe.title,
          image: recipe.image,
          description: recipe.description,
          author_id: recipe.author_id})
          .then(function(recipeId) {
            recipe.id = recipeId;
            var recipeSteps = [];
            for (var i = 0; i < stepCount; i++) {
              recipeSteps.push({step_number: i + 1, step_body: $('#recipeStep-' + (i + 1)).val(), id: recipeId});
            }
            for (let i = 0; i < stepCount; i++) {
              $.post('https://g-recipies.herokuapp.com/stepAdd', recipeSteps[i])
                .then(function(data, status) {
                  console.log(status);
                })
                .catch(function(error) {
                  console.log(error);
                })
            }
            var ingredients = [];
            for (var j = 0; j < ingredientCount; j++) {
              ingredients.push({quantity: $('#recipe-ingredient-quantity-' + (j + 1)).val(),
                                       name: $('#recipe-ingredient-name-' + (j + 1)).val(), id: recipeId});
            }
            for (let j = 0; j < ingredientCount; j++) {
              $.post('https://g-recipies.herokuapp.com/ingredientAdd', ingredients[j])
                .then(function(data, status) {
                  console.log(status);
                  window.location.replace("./index.html");
                })
                .catch(function(error) {
                  console.log(error);
                  window.location.replace("./index.html");
                })
            }

          })
          .catch(function(error) {
            console.log(error);
          })
      })
      .catch(function(data, status) {
        console.log(status);
      })
  })
})
