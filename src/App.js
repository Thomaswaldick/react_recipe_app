import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {
  const APP_ID = '3d3f431b';
  const APP_KEY = 'e60f7324d502e6a8f944f1720eda6963';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');

  useEffect( () => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value)
    console.log(search)
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input type="text" className="search-bar" value={search} onChange={updateSearch}></input>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="recipes"> 
      {recipes.map(recipe => (
        <Recipe 
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image} 
        key={recipe.recipe.label} 
        ingredients={recipe.recipe.ingredients}></Recipe>
      ))}
      </div>
      
    </div>
  );
}

export default App;
