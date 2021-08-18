// const { getSystemErrorMap } = require('util');

import * as model from './model.js';

import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';

import paginationView from './views/paginationView.js';
import AddRecipeView from './views/addRecipeView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

//
if (module.hot) {
  module.hot.accept();
}

// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

//*

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    //////*render spinner
    recipeView.renderSpinner();

    //* Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    //*updating bookmarksView
    bookmarksView.update(model.state.bookmarks);

    ////////////* Calling load recipe frm model.js folder
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    //////////////* Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // alert(err);
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //# Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //#Load search results
    await model.loadSearchResults(query);

    //# Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    //# Render initial pagination btn
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //# Render New results
  // resultsView.render(model.state.search.results);
  resultsView.render(model.getSearchResultsPage(goToPage));

  //# Render New pagination btn
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //#Update the recipe servings (in the state)
  model.updateServings(newServings);
  //#Update the view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //# Add or remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //#update recipe
  recipeView.update(model.state.recipe);

  //#Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    //#Upload new recipe data
    await model.uploadRecipe(newRecipe);

    //# Render uploaded recipe
    recipeView.render(model.state.recipe);

    //#Success message for upload
    addRecipeView.renderMessage();

    //#Render the bookmark view
    bookmarksView.render(model.state.bookmarks);

    //#Change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //#Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(':(', err);
    addRecipeView.renderError(err.message);
  }
};

//*Bringing the addHandler from recipeView.js for click event
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
