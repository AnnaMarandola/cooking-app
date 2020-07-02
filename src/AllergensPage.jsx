import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles (theme =>
  createStyles ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '4rem',
    },
    instructions: {
      fontWeight: 300,
      backgroundColor: '#3f51b5',
      color: '#fff',
      textAlign: 'center',
      fontSize: '1.1rem',
      padding: '1rem',
      borderRadius: '10px',
      marginTop: '2rem',
      marginBottom: '2rem',
    },
    goBack: {
      position: 'absolute',
      top: '4%',
      marginLeft: '-40%',
    },
  })
);

const AllergensPage = ({goBackHome, handleHealthFilters}) => {
  const classes = useStyles ();

  return (
    <div className={classes.root}>
      <ArrowBackIosIcon
        onClick={goBackHome}
        className={classes.goBack}
        color="primary"
      />
      <h3 className={classes.instructions}>
        Selectionnez votre allergène ou votre régime alimentaire.
      </h3>
      <div className={classes.allergensSection}>
        <ButtonGroup
          orientation="vertical"
          color="primary"
          aria-label="vertical contained primary button group"
          variant="text"
        >
          <Button
            className={classes.button}
            onClick={handleHealthFilters}
            value="peanut-free"
          >
            Arachides
          </Button>
          <Button onClick={handleHealthFilters} value="crustacean-free">
            Crustacés
          </Button>
          <Button onClick={handleHealthFilters} value="dairy-free">
            Lactose
          </Button>
          <Button onClick={handleHealthFilters} value="egg-free">Oeuf</Button>
          <Button onClick={handleHealthFilters} value="fish-free">
            Poisson
          </Button>
          <Button onClick={handleHealthFilters} value="soy-free">Soja</Button>
          <Button onClick={handleHealthFilters} value="gluten-free">
            Gluten
          </Button>
          <Button onClick={handleHealthFilters} value="alcohol-free">
            Alcool
          </Button>
          <Button onClick={handleHealthFilters} value="vegan">Vegan</Button>
          <Button onClick={handleHealthFilters} value="vegetarian">
            Végétarien
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default AllergensPage;
