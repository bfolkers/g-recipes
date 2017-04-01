$(function() {
  var queryParameter = window.location.search.substring(1);
  var queryArray = queryParameter.split('=');
  var recipeId = queryArray[1];
  var recipes = [];
  $.get('https://g-recipies.herokuapp.com/recipe?avgReview=true')
    .then(function(data, status) {
      recipes = data;

      $.get('https://g-recipies.herokuapp.com/recipe')
        .then(function(data, status) {
          recipes = recipes.concat(data);

          $.get('https://g-recipies.herokuapp.com/recipeAndAuthor/' + recipeId)
            .then(function(data, status) {
              var thisRecipe = recipes.filter(function(element) {
                return (element.id === Number(recipeId));
              })
              var formattedRecipeName = formatRecipeName(thisRecipe[0].name);
              var thisRating = 0;
              if (!isNaN(thisRecipe[0].avg)) {
                thisRating = thisRecipe[0].avg;
              }
              $('.name-field').text(formattedRecipeName);
              $('.description-field').text(data[0].description);
              $('.rating-field').text(Number(thisRating).toFixed(1).toString());
              $('.author-field').text(data[0].name);
              $('.food-pic').attr('src', thisRecipe[0].image);
              $('.edit-button').attr('href', './edit.html?recipe=' + recipeId);

              $.get('https://g-recipies.herokuapp.com/indivRecipeIngred/' + recipeId)
                .then(function(data, status) {
                  var $ingredientList = $('.ingredient-list');
                  for (var i in data) {
                    $ingredientList.append(`<li>${data[i].quantity} ${data[i].name}</li>`)
                  }

                  $.get('https://g-recipies.herokuapp.com/indivRecipeSteps/' + recipeId)
                    .then(function(recipeSteps) {
                      var sortedRecipeSteps = recipeSteps.sort(function(a, b) {
                        return a.step_number - b.step_number;
                      })
                      var $stepList = $('.step-list');
                      for (var i in sortedRecipeSteps) {
                        $stepList.append(`<li>${sortedRecipeSteps[i].step_number}. ${sortedRecipeSteps[i].step_body}</li>`);
                      }
                      $.get('https://g-recipies.herokuapp.com/review/' + recipeId)
                        .then(function(reviews) {
                          for (let i = 0; i < reviews.length; i++) {
                            $.get('https://g-recipies.herokuapp.com/author/' + reviews[i].author_id.toString())
                              .then(function(author) {
                                console.log(author);
                                $('.review-section').append(`
                                  <tr>
                                    <td>${author[0].name}</td>
                                    <td>${reviews[i].rating.toString()}</td>
                                    <td>${reviews[i].body}</td>
                                    <td><button type="button" class="edit-review-button btn btn-primary" id="edit-review-${reviews[i].id}">Edit</button</td>
                                    <td><button type="button" class="delete-review-button btn btn-danger" id="delete-review-${reviews[i].id}">Del</button></td>
                                  </tr>
                                  `);
                              })
                              .catch(function(error) {
                                console.log(error);
                              })
                          }
                        })
                        .catch(function(error) {
                          console.log(error);
                        })
                    })
                    .catch(function(error) {
                      console.log(error);
                    })
                })
                .catch(function(error) {
                  console.log(error);
                })
            })
            .catch(function(error) {
              console.log(error);
            })
        })
        .catch(function(error) {
          console.log(error);
        })
    })
    .catch(function(error) {
      console.log(error);
    })

    $('.delete-button').on('click', function(event) {
      event.preventDefault();
      $.ajax({
          method: "DELETE",
          url: 'https://g-recipies.herokuapp.com/recipe/' + recipeId
      })
      .then((data, status) => {
        console.log(data);
        window.location.replace("./index.html");
      })
      .catch(error => {
        console.log(error);
      })
    })

  $('.review-submit-button').on('click', function(event) {
    event.preventDefault();
    var review = {};
    review.name = $('#inputAuthor').val();
    review.body = $('#inputComment').val();
    review.rating = $('.inputRating option:selected').val();
    review.recipe_id = recipeId;
    $.post('https://g-recipies.herokuapp.com/review/', review)
      .then(function(data, status) {
        console.log(data);
      })
      .catch(function(error) {
        console.log(error);
      })
  })


})

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatRecipeName(string) {
  var recipeNameArray = string.split(' ');
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
  return formattedRecipeName;
}
