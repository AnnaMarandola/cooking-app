import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles ((theme) =>
  createStyles ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '4rem',
        },
    welcomeImage: {
        marginTop: '2.5rem',
        marginBottom: '2.5rem',
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
        fontFamily: 'Segoe UI',
        fontSize: '1.2rem',
        color: '#3F51B5',  
      },
      
    
  }))

const LandingPage =({getOnboard}) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
        <p className={classes.titleApp}>Allergeek</p>
        <div className={classes.welcome}>
          <img src={ require("./assets/allergens.jpg") } alt="allergens logos" className={classes.welcomeImage}/>
        </div>
        <p className={classes.text}>Des milliers d'idées recettes adaptées aux allergies et intolérances alimentaires !</p>
        <Button onClick={getOnboard} variant="contained" color="primary">Découvrez</Button>
        </div>
    )
}

export default LandingPage;

