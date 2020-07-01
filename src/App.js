import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme) => ({
  app: {
  },
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
    backgroundColor: '#757de8',
    color: '#fff',
    textAlign: 'center',
    fontSize: '1.1rem',
    padding: '1rem',
    borderRadius: '10px',
    marginTop: '2rem',
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
  button: {
    backgroundImage: '../src/assets/peanut.png'
  },
  titleSearch: {
    fontSize: '1.3rem',
    fontFamily:'Segoe UI',
  },
  welcomeImage: {
    marginTop: '2.5rem',
    marginBottom: '1.5rem',
    marginLeft: '10%',
    width: '80%',
    opacity: 0.5,
  },
  titleApp: {
    fontSize: '3rem',
    color: '#3F51B5',
  },
  text: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  goBack: {
    position: 'absolute',
    top: '4%',
    marginLeft: '-40%'
  }
}));




const App = () => {
  const classes = useStyles()

const APP_ID = "a6a78483";
const APP_KEY = "985e5bd05d53928bc9882c6af27cac8f";

const [recipes, setRecipes] = useState([])
const [search, setSearch] = useState('')
const [query, setQuery] = useState('')
const [healthFilter, setHealthFilter] = useState('')
const [onboarded, setOnboard] = useState(false)

useEffect(() => {
  getRecipes()
    }, [query])

    const getOnboard = event => {
      setOnboard(true)
    }

    const goBackHome = event => {
      setOnboard(false)
    }
    
    const handleHealthFilters = event => {
     setHealthFilter(event.currentTarget.value)
    }

    const goBackToFIlter = event => {
      setHealthFilter('')
      setRecipes([])
      setSearch('')
      // setQuery('')
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
    <div className={classes.app}>
    <div className={classes.app}>
      { !onboarded && 
      <div className={classes.root}>
      <p className={classes.titleApp}>Allergeek</p>
      <div className={classes.welcome}>
        <img src={ require("./assets/allergens.jpg") } alt="allergens logos" className={classes.welcomeImage}/>
      </div>
      <p className={classes.text}>Des milliers d'idées recettes adaptées aux allergies et intolérances alimentaires.</p>
      <Button onClick={getOnboard} variant="contained" color="primary">Découvrez</Button>
      </div>}
      { onboarded && !healthFilter.length && 
      <div className={classes.root}>
      <ArrowBackIosIcon onClick={goBackHome} className={classes.goBack} color="primary"/>
      <h3 className={classes.instructions}>Selectionnez votre allergène ou votre régime alimentaire.</h3>
      <div className={classes.allergensSection}>
      <ButtonGroup
      orientation="vertical"
      color="primary"
      aria-label="vertical contained primary button group"
      variant="text"
      >
      <Button className={classes.button} onClick={ handleHealthFilters} value="peanut-free">Peanuts</Button>
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
     <ArrowBackIosIcon className={classes.goBack} onClick={goBackToFIlter} color="primary"/>
     <h3 className={classes.titleSearch}>{healthFilter} recipes:</h3>
     <form onSubmit={getSearch} className={classes.searchForm} noValidate>
        <TextField id="outlined-basic" label="enter an ingredient" variant="outlined" color="primary"  type="text" value={search} onChange={updateSearch} />
        <Button className={classes.searchButton} variant="contained" color="primary" type="submit">
          Search
        </Button>
      </form>
      </div>
     }
     <div className={classes.container}>
      <div className={classes.recipes}>
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
    </div>
    </div>
  );
}
 
export default App;
