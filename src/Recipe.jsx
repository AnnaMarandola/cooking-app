import React from 'react';
import style from './recipe.module.css';

const Recipe = ({title, calories, image, ingredients}) => {
    return [
        <div className={style.recipe}>
            <h2 className={style.title}>{title}</h2>
            <ul>
                {ingredients.map(ingredient => (
                    <li className={style.text}>{ingredient.text}</li>
                ))}
            </ul>
            <img classeName={style.image} src={image} alt=""/>
            <p>{(calories/5).toFixed(3)} calories</p>
        </div>
    ]
}


export default Recipe;
