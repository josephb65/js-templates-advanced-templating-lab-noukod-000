function init() {
  //put any page initialization/handlebars initialization here
  handlebarsRegisters();

  let recipeFormTemplateFn = Handlebars.compile(document.getElementById("recipe-form-template").innerHTML);
  document.getElementById('main').innerHTML = recipeFormTemplateFn( {formLegend: 'New Recipe', state: "New"} );
}
document.addEventListener("DOMContentLoaded", function(event) {
  init()
})


function handlebarsRegisters(){
  Handlebars.registerPartial('recipeDetailsPartial',document.getElementById('recipe-details-partial').innerHTML);
  Handlebars.registerHelper('displayIngredient',function(){
    let state = document.getElementById('formState').value;
    if(state === 'New'){
      return new Handlebars.SafeString('');
    } else if(state === 'Edit'){
      return new Handlebars.SafeString('<input name="ingredients" type="text" value=""+this.name+"">');
    } else {
      return new Handlebars.SafeString(this.name);
    }
  });
  Handlebars.registerPartial('recipeFormPartial', document.getElementById("recipe-form-partial").innerHTML);
}

function handleSubmit(){
    let state = document.getElementById('formState').value;
    if(state === 'New'){
      createRecipe();
    } else if(state === 'Edit'){
      updateRecipe();
    }
}

function getRecipe(){
  let recipe = {ingredients:[]};
  recipe.name = document.getElementById('name').value;
  recipe.description = document.getElementById('description').value;
  let ingredientElem = document.getElementsByName('ingredients');
  for(let i=0;i< ingredientElem.length; i++){
    if(ingredientElem[i].value){
      recipe.ingredients.push({name: ingredientElem[i].value})
    }
  }

  return recipe;
}

function createRecipe(){
  let recipe = getRecipe();
  let recipeTemplateFn = Handlebars.compile(document.getElementById("recipe-template").innerHTML);
  document.getElementById('main').innerHTML = recipeTemplateFn(recipe);
  return recipe;
}

function updateRecipe() {
  var recipe = getRecipe()
  let recipeTemplateFn = Handlebars.compile(document.getElementById("recipe-template").innerHTML);

  document.getElementById("main").innerHTML = recipeTemplateFn(recipe)
}

function displayEditForm(){
  let recipe = {ingredients:[], formLegend: 'Edit Recipe', state: "Edit"};
  recipe.name = document.getElementById("recipeName").innerText;
  recipe.description = document.getElementById("recipeDescription").innerText;
  let ingredientsElem = document.getElementsByName("ingredientName")

  for(let i=0;i< ingredientsElem.length; i++){
      recipe.ingredients.push({name: ingredientsElem[i].innerText})
  }

  let recipeFormTemplateFn = Handlebars.compile(document.getElementById("recipe-form-template").innerHTML);

  document.getElementById('main').innerHTML = recipeFormTemplateFn( recipe );
}