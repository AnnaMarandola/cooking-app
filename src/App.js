import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import LandingPage from './LandingPage';
import AllergensPage from './AllergensPage';
import SearchForm from './SearchForm';

const useStyles = makeStyles (theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '4rem',
  },
}));

const App = () => {
  const classes = useStyles ();

  const APP_ID = 'a6a78483';
  const APP_KEY = '985e5bd05d53928bc9882c6af27cac8f';

  const [recipes, setRecipes] = useState ([]);
  const [search, setSearch] = useState ('');
  const [query, setQuery] = useState ('');
  const [healthFilter, setHealthFilter] = useState ('');
  const [onboarded, setOnboard] = useState (false);

  useEffect (
    () => {
      getRecipes ();
    },
    [query]
  );

  const getOnboard = event => {
    setOnboard (true);
  };

  const goBackHome = event => {
    setOnboard (false);
  };

  const handleHealthFilters = event => {
    setHealthFilter (event.currentTarget.value);
  };

  const goBackToFIlter = event => {
    setHealthFilter ('');
    setRecipes ([]);
    setSearch ('');
  };

  const getRecipes = async () => {
    const response = await fetch (
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&health=${healthFilter}`
    );
    const data = await response.json ();
    setRecipes (data.hits);
  };

  const updateSearch = event => {
    setSearch (event.currentTarget.value);
  };

  const getSearch = event => {
    event.preventDefault ();
    setQuery (search);
  };

  const translateAllergen = healthFilter => {
    switch (healthFilter) {
      case 'peanut-free':
        return 'sans arachides';
      case 'crustacean-free':
        return 'sans crustaçés';
      case 'dairy-free':
        return 'sans lactose';
      case 'egg-free':
        return 'sans oeufs';
      case 'fish-free':
        return 'sans poisson';
      case 'soy-free':
        return 'sans soja';
      case 'gluten-free':
        return 'sans gluten';
      case 'alcohol-free':
        return 'sans alcool';
      case 'vegan':
        return 'vegan';
      case 'vegetarian':
        return 'végétariennes';
      default:
        return 'schtroumpf';
    }
  };

  console.log ('recipes', recipes);
  console.log ('healthFilter', healthFilter);

  return (
    <div className={classes.app}>
      {!onboarded && <LandingPage getOnboard={getOnboard} />}
      {onboarded && !healthFilter.length &&
        <AllergensPage
          handleHealthFilters={handleHealthFilters}
          goBackHome={goBackHome}
        />}
      {healthFilter &&
        healthFilter.length &&
        <SearchForm
          goBackToFIlter={goBackToFIlter}
          getSearch={getSearch}
          search={search}
          updateSearch={updateSearch}
          translateAllergen={translateAllergen}
          healthFilter={healthFilter}
        />}
      <div className={classes.container}>
        <div className={classes.recipes}>
          {recipes &&
            recipes.map (recipe => (
              <Recipe
                key={recipe.recipe.label}
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
                healthLabels={recipe.recipe.healthLabels}
                allergen={healthFilter}
                source={recipe.recipe.source}
                url={recipe.recipe.url}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
