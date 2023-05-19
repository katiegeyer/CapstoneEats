
import './RecipeCard.css';
import DeleteRecipe from '../DeleteRecipe';
import OpenModalButton from '../OpenModalButton';
import { NavLink } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
    return (
        <div className="recipe-card">
            <div>{recipe && <NavLink className='single-recipe-card-image-nav' to={`/recipes/${recipe.id}`} recipe={recipe}>
                    <img className='recipe-card__image' src={`${recipe.preview_img}`}></img>
                    {/* <img src={`${playlistsSongs[0].preview_img}`}></img> */}
                </NavLink>}
            </div>

            {/* <img className="recipe-card__image" src={recipe.preview_img} alt={recipe.recipe_name} /> */}
            <h2 className="recipe-card__title">{recipe.recipe_name}</h2>
            <p className="recipe-card__type">{recipe.type}</p>
            <p className="recipe-card__cook-time">{recipe.cook_time}</p>
            <p className="recipe-card__owner">{recipe.recipe_owner}</p>
            <OpenModalButton
                buttonText="Delete"
                recipeId={recipe.id}
                modalComponent={<DeleteRecipe recipeId={recipe.id} />}
            />
        </div>
    );
};

export default RecipeCard;
