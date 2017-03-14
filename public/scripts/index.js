$(function() {
  var testRecipes = [
    {id: 0, name: 'Pasta Primavera', rating: 4.9, url: "http://mdbootstrap.com/img/Photos/Horizontal/Food/4-col/img%20(43).jpg"},
    {id: 1, name: 'Creme Pastry', rating: 4.7, url: "http://mdbootstrap.com/img/Photos/Horizontal/Food/4-col/img%20(52)"},
    {id: 2, name: 'Cedar Plank Salmon', rating: 4.4, url: "http://mdbootstrap.com/img/Photos/Horizontal/Food/4-col/img%20(50).jpg"},
    {id: 3, name: 'Salmon and Asparagus', rating: 4.1, url: "http://mdbootstrap.com/img/Photos/Horizontal/Food/4-col/img%20(53)"},
    {id: 4, name: 'All the Donuts', rating: 3.9, url: "http://mdbootstrap.com/img/Photos/Horizontal/Food/4-col/img%20(49)"},
    {id: 5, name: 'Fruit Tart Surprise', rating: 3.7, url: "http://mdbootstrap.com/img/Photos/Horizontal/Food/4-col/img%20(51)"}
  ];

  var recipePane = $('.recipe-list-pane');
  for (var i in testRecipes) {
    recipePane.append(
      `<div class="col-lg-4">
        <div class="card">
          <div class="view overlay hm-white-slight">
            <img src= ${testRecipes[i].url} class="img-fluid" alt="">
              <a href="#!">
                <div class="mask"></div>
              </a>
          </div>
          <div class="card-block">
            <h4 class="card-title">${testRecipes[i].name}</h4>
            <p class="card-text">Average Rating: ${testRecipes[i].rating.toString()}</p>
            <div class="read-more">
              <a class="recipe-button btn btn-brown" id="recipe-button-${testRecipes[i].id}">Read more</a>
            </div>
          </div>
        </div>
      </div>`
    );
  }
  $(document).on('click', '.recipe-button', function(event) {
    event.preventDefault();
    console.log('Success!!');
  })
})
