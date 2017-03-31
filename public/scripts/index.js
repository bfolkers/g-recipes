$(function() {
  // var testRecipes = [
  //   {id: 0, name: 'Pasta Primavera', description: 'Delectable pasta made by mamma mia', author: 'Maryanne Funkledorf', rating: 4.9, url: "http://mdbootstrap.com/img/Photos/Horizontal/Food/4-col/img%20(43).jpg",
  //     ingredients: [{quantity: '1 cup', name: 'bean sprouts'}, {quantity: '3 bunches', name: 'kale'}], steps: ['Preheat the oven to 400', 'Do another thing', 'Now you have completed the recipe']},
  //   {id: 1, name: 'Creme Pastry', rating: 4.7, url: "http://mdbootstrap.com/img/Photos/Horizontal/Food/4-col/img%20(52)"},
  //   {id: 2, name: 'Cedar Plank Salmon', rating: 4.4, url: "http://mdbootstrap.com/img/Photos/Horizontal/Food/4-col/img%20(50).jpg"},
  //   {id: 3, name: 'Salmon and Asparagus', rating: 4.1, url: "http://mdbootstrap.com/img/Photos/Horizontal/Food/4-col/img%20(53)"},
  //   {id: 4, name: 'All the Donuts', rating: 3.9, url: "http://mdbootstrap.com/img/Photos/Horizontal/Food/4-col/img%20(49)"},
  //   {id: 5, name: 'Fruit Tart Surprise', rating: 3.7, url: "http://mdbootstrap.com/img/Photos/Horizontal/Food/4-col/img%20(51)"}
  // ];

  var recipeCount = 0;
  var recipeCountWithoutReviews = 0;
  var recipes = [];
  var recipesWithoutReviews = [];
  var recipePane = $('.recipe-list-pane');
  var thisId;

  $.get('https://g-recipies.herokuapp.com/recipe?avgReview=true')
    .then(recipeList => {
      recipes = recipeList;
      recipeCount = recipeList.length;
      for (var i = 0; i < recipeCount; i++) {
        recipePane.append(
          `<div class="col-lg-4">
            <div class="card">
              <div class="view overlay hm-white-slight">
                <img src= ${recipeList[i].image} class="food-pic img-fluid" alt="">
                  <a href="#!">
                    <div class="mask"></div>
                  </a>
              </div>
              <div class="card-block">
                <h4 class="card-title">${formatRecipeName(recipeList[i].name)}</h4>
                <p class="card-text">Average Rating: ${Number(recipeList[i].avg).toFixed(1).toString()}</p>
                <div class="read-more">
                  <a href="./recipe.html?recipe=${recipeList[i].id}" class="recipe-button btn btn-brown" id="recipe-button-${recipeList[i].id}">Read more</a>
                </div>
              </div>
            </div>
          </div>`
        );
      }
      $.get('https://g-recipies.herokuapp.com/recipe')
        .then(recipeList => {
          recipesWithoutReviews = recipeList;
          console.log(recipeList);
          recipeCountWithoutReviews = recipeList.length;
          for (var i = 0; i < recipeCountWithoutReviews; i++) {
            recipePane.append(
              `<div class="col-lg-4">
                <div class="card">
                  <div class="view overlay hm-white-slight">
                    <img src= ${recipeList[i].image} class="food-pic img-fluid" alt="">
                      <a href="#!">
                        <div class="mask"></div>
                      </a>
                  </div>
                  <div class="card-block">
                    <h4 class="card-title">${formatRecipeName(recipeList[i].name)}</h4>
                    <p class="card-text">Average Rating: 0</p>
                    <div class="read-more">
                      <a href="./recipe.html?recipe=${recipeList[i].id}" class="recipe-button btn btn-brown" id="recipe-button-${recipeList[i].id}">Read more</a>
                    </div>
                  </div>
                </div>
              </div>`
            );
          }
        })
        .catch(function(data, status) {
          console.log(status);
        })
    })
    .catch(function(data, status) {
      console.log(status);
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
