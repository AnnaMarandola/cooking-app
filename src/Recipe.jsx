import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {blueGrey} from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Button, Link} from '@material-ui/core';

const useStyles = makeStyles ((theme: Theme) =>
  createStyles ({
    container: {
      // display: 'flex',
      // flexDirection: 'column',
      // width: '70%',
      // flexWrap: 'wrap'
    },
    root: {
      maxWidth: 345,
      // border: '1px solid #002984',
      marginBottom: '1.5rem',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '0.5rem',
    },
    title: {
      fontFamily: 'Segoe UI',
      fontSize: '1.8rem',
      color: '#2a3eb1',
      marginLeft: '1rem',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9,
    },
    ingredients: {
      marginLeft: '60%',
      fontSize: '0.8rem',
      fontWeight: '600',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create ('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: blueGrey,
    },
    link: {
      textDecoration: 'none',
    },
    sources: {
      marginLeft: '1rem',
    },
    list: {
      fontFamily: 'Caveat Brush, cursive',
    },
    articleButton: {
      position: 'float',
      bottom: '1.2rem',
      left: '70%',
      zIndex: 1,
    },
  })
);

const Recipe = ({
  title,
  calories,
  image,
  ingredients,
  healthLabels,
  source,
  allergen,
  url,
}) => {
  const classes = useStyles ();
  const [expanded, setExpanded] = React.useState (false);

  const handleExpandClick = () => {
    setExpanded (!expanded);
  };

  return (
    <div className={classes.container}>
      <Card className={classes.root}>
        {/* <div className={classes.header}>
              <Avatar aria-label="recipe" className={classes.avatar}>
                {allergen}
              </Avatar>
        </div> */}
        <CardMedia className={classes.media} image={image} title={title} />
        <Link
          href={url}
          target="_blank"
          rel="noopener"
          className={classes.link}
        >
          <Button
            className={classes.articleButton}
            variant="contained"
            color="primary"
            type="submit"
          >
            Read
          </Button>
        </Link>
        <Typography className={classes.title}>{title}</Typography>
        <Typography className={classes.sources}>
          <b>Source :</b> {source}{' '}
        </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
              {(calories/5).toFixed(3)} calories/pers.
            </Typography> */}

          {/* <ul>
                {healthLabels.map(healthLabel => (
                <li className="">{healthLabel}</li>
                ))}
             </ul>   */}
        <CardActions disableSpacing>
          <Typography className={classes.ingredients}>Ingredients : </Typography>
          <IconButton
            className={clsx (classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography className={classes.list}>
              <ul>
                {ingredients.map (ingredient => <li>{ingredient.text}</li>)}
              </ul>
            </Typography>

          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default Recipe;
