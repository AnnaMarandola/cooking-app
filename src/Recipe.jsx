import React from 'react';
import { makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blueGrey } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button, Link } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      container : {
          display: 'flex',
          flexDirection: 'column',
        },
        root: {
      maxWidth: 345,
      border: '1px solid grey',
      marginBottom: '1.5rem',
      borderRadius: '10px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0.5rem',
    },
    title: {
        fontStyle: 'italic',
        fontSize: '1.2rem',
        color: '#2a3eb1',
        fontWeight: 600,
        marginTop: '0.2rem',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
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
    marginLeft: '70%',
    },
  }),
);

const Recipe = ({title, calories, image, ingredients, healthLabels, source, allergen, url}) => {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (
        <div className={classes.container}>
        <Card className={classes.root}>
        <div className={classes.header}>
              <Avatar aria-label="recipe" className={classes.avatar}>
                {allergen}
              </Avatar>
        <Typography className={classes.title}>{title}</Typography>
        </div>
          <CardMedia
            className={classes.media}
            image={image}
            title={title}
          />
          <Typography>Source : {source} </Typography>
          <CardContent>
            <Link href={url} target="_blank" rel="noopener" className={classes.link} >
        <Button className={classes.articleButton} variant="outlined" color="primary" type="submit">
          Show
        </Button>
        </Link>
            <Typography variant="body2" color="textSecondary" component="p">
              {(calories/5).toFixed(3)} calories/pers.
            </Typography>

             {/* <ul>
                {healthLabels.map(healthLabel => (
                <li className="">{healthLabel}</li>
                ))}
             </ul>   */}
          </CardContent>
          <CardActions disableSpacing>
          <Typography>INGREDIENTS</Typography>
            <IconButton
              className={clsx(classes.expand, {
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
              <Typography>
              <ul>
                {ingredients.map(ingredient => (
                 <li>{ingredient.text}</li>
                ))}
              </ul>
              </Typography>

            </CardContent>
          </Collapse>
        </Card>
        </div>
      );
}


export default Recipe;

