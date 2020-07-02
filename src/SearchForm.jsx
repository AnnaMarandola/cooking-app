import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {TextField} from '@material-ui/core';



const useStyles = makeStyles (theme =>
  createStyles ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '4rem',
      '& > *': {
        margin: theme.spacing (1),
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
    titleSearch: {
      fontSize: '1.8rem',
      fontFamily: 'Segoe UI',
      color: '#2a3eb1',
      textAlign: 'center',
    },
    goBack: {
      position: 'absolute',
      top: '4%',
      marginLeft: '-40%',
    },
  })
);

const SearchForm = ({goBackToFIlter, getSearch, search, updateSearch, translateAllergen, healthFilter}) => {
  const classes = useStyles ();

  return (
    <div className={classes.root}>
      <ArrowBackIosIcon
        className={classes.goBack}
        onClick={goBackToFIlter}
        color="primary"
      />
      <p className={classes.titleSearch}>
        Recettes<br /> {translateAllergen (healthFilter)} :
      </p>
      <form onSubmit={getSearch} className={classes.searchForm} noValidate>
        <TextField
          id="outlined-basic"
          label="recherche par mot-clé"
          variant="outlined"
          color="primary"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <Button
          className={classes.searchButton}
          variant="contained"
          color="primary"
          type="submit"
        >
          Chercher
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;
