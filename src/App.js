import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
// import './App.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '4rem',
    '& > *': {
      margin: theme.spacing(1),
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#2a3eb1',
      },
      '&:hover fieldset': {
        borderColor: '#757de8',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#002984',
      },
  },
},  
  instructions: {
    fontWeight: 300,
    color: '#2a3eb1',
  },
  searchForm: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '2rem',
  },
  searchButton: {
    marginTop: '2rem',
    width: '80%',
    marginLeft: '10%',
  },
  recipes: {
    display: 'flex',
    flexDirection: 'row',
  }
}));




const App = () => {
  const classes = useStyles()

const APP_ID = "a6a78483";
const APP_KEY = "985e5bd05d53928bc9882c6af27cac8f";

const [recipes, setRecipes] = useState([]);
const [search, setSearch] = useState('');
const [query, setQuery] = useState('');
const [healthFilter, setHealthFilter] = useState('');

useEffect(() => {
  getRecipes();
    }, [query]);
    
    const handleHealthFilters = event => {
     setHealthFilter(event.currentTarget.value)
    }

  const getRecipes = async () => {
    const response = await fetch (
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&health=${healthFilter}`
      );
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = event => {
    setSearch(event.currentTarget.value)
  }

  const getSearch = event => {
    event.preventDefault();
    setQuery(search);
  }


  console.log('recipes', recipes)
  console.log('healthFilter', healthFilter)

  return (
    <div className="App">
      { !healthFilter.length && 
      <div className={classes.root}>
      <h3 className={classes.instructions}>Renseignez votre allergie / intolerance:</h3>
      <div className={classes.allergensSection}>
      <ButtonGroup
      orientation="vertical"
      color="primary"
      aria-label="vertical contained primary button group"
      variant="text"
      >
      <Button onClick={ handleHealthFilters} value="peanut-free">Peanuts</Button>
      <Button onClick={ handleHealthFilters} value="crustacean-free">Crustaceans</Button>
      <Button onClick={ handleHealthFilters} value="dairy-free">Lactose</Button>
      <Button onClick={ handleHealthFilters} value="egg-free">Eggs</Button>
      <Button onClick={ handleHealthFilters} value="fish-free">Fish</Button>
      <Button onClick={ handleHealthFilters} value="soy-free">Soy</Button>
      <Button onClick={ handleHealthFilters} value="gluten-free">Gluten</Button>
      <Button onClick={ handleHealthFilters} value="alcohol-free">Alcohol</Button>
      <Button onClick={ handleHealthFilters} value="vegan">Vegan</Button>
      <Button onClick={ handleHealthFilters} value="vegetarian">Vegetarian</Button>
      </ButtonGroup>
      </div>
      </div>}
     { healthFilter && healthFilter.length  && 
     <div className={classes.root}>
     <h3 className={classes.instructions}>{healthFilter} recipes:</h3>
     <form onSubmit={getSearch} className={classes.searchForm} noValidate>
        <TextField id="outlined-basic" label="enter an ingredient" variant="outlined" color="primary"  type="text" value={search} onChange={updateSearch} />
        <Button className={classes.searchButton} variant="contained" color="primary" type="submit">
          Search
        </Button>
      </form>
      </div>
     }
      <div className="recipes">
      {recipes && recipes.map(recipe => (
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
  );
}
 
export default App;
