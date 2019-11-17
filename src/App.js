import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';


const App = () => {

  const APP_ID = "a6a78483";
  const APP_KEY = "985e5bd05d53928bc9882c6af27cac8f";

const [recipes, setRecipes] = useState([]);
const [search, setSearch] = useState('');
const [query, setQuery] = useState('');

  useEffect(() => {
getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch (
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
    const data = await response.json();
    setRecipes(data.hits);

  };

  const updateSearch = event => {
    setSearch(event.target.value)
  }

  const getSearch = event => {
    event.preventDefault();
    setQuery(search);
  }


  return (
    <div className="App">
      {/* <header className="header"> */}
        {/* <h1 className="title-app">Foodies scramble</h1> */}
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" placeholder="enter an ingredient" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {/* </header> */}
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients} />
      ))}
    </div>
    </div>
  );
}
 
export default App;
