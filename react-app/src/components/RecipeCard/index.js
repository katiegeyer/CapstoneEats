
// import './RecipeCard.css';
// import DeleteRecipe from '../DeleteRecipe';
// import OpenModalButton from '../OpenModalButton';
// import { NavLink } from 'react-router-dom';
// import UpdateRecipeForm from '../UpdateRecipe';
// import { useSelector } from 'react-redux';

// const RecipeCard = ({ recipe }) => {

//     const sessionUser = useSelector((state) => state.session.user);
//     // const recipe =
//     const recipeCreator = recipe.user_id
//     console.log('creator', recipeCreator);
//     console.log('session', sessionUser.id)
//     return (
//         <div className="recipe-card">
//             <div>{recipe && <NavLink className='single-recipe-card-image-nav' to={`/recipes/${recipe.id}`} recipe={recipe}>
//                 <img className='recipe-card__image' src={`${recipe.preview_img}`}></img>
//                 {/* <img src={`${playlistsSongs[0].preview_img}`}></img> */}
//             </NavLink>}
//             </div>

//             {/* <img className="recipe-card__image" src={recipe.preview_img} alt={recipe.recipe_name} /> */}
//             <h2 className="recipe-card__title">{recipe.recipe_name}</h2>
//             <p className="recipe-card__type">{recipe.type}</p>
//             <p className="recipe-card__cook-time">{recipe.cook_time}</p>
//             <p className="recipe-card__owner">{recipe.recipe_owner}</p>
//             <p className="recipe-card_description">{recipe.description}</p>
//             {sessionUser && sessionUser.id === recipeCreator &&
//                 <>
//                     <OpenModalButton
//                         buttonText="Delete"
//                         recipeId={recipe.id}
//                         modalComponent={<DeleteRecipe recipeId={recipe.id} />}
//                     />
//                     <OpenModalButton
//                         buttonText="Update"
//                         recipeId={recipe.id}
//                         modalComponent={<UpdateRecipeForm recipeId={recipe.id} />}
//                     />
//                 </>
//             }

//         </div>
//     );
// };

// export default RecipeCard;
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import DeleteRecipe from '../DeleteRecipe';
import UpdateRecipeForm from '../UpdateRecipe';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
    const sessionUser = useSelector((state) => state.session.user);
    const recipeCreator = recipe.user_id;

    return (
        <div className="recipe-card">
            <div>
                {recipe && sessionUser && (
                    <NavLink className="single-recipe-card-image-nav" to={`/recipes/${recipe.id}`} recipe={recipe}>
                        <img className="recipe-card__image" src={recipe.preview_img} alt={recipe.recipe_name} />
                    </NavLink>
                )}
            </div>
            <div>
                {recipe && !sessionUser && (
                    <div className='single-recipe-card-image-nav'>
                        <img className="recipe-card__image" src={recipe.preview_img} alt={recipe.recipe_name} />
                    </div>
                )}
            </div>

            <h2 className="recipe-card__title">{recipe.recipe_name}</h2>
            <p className="recipe-card__type">{recipe.type} &#x23F2; {recipe.cook_time}</p>
            {/* <p className="recipe-card__cook-time">{recipe.cook_time}</p> */}
            <p className="recipe-card__owner">By {recipe.recipe_owner}</p>
            {/* <p className="recipe-card_description">{recipe.description}</p> */}

            {sessionUser && sessionUser.id === recipeCreator && (
                <div className='rc-button-bar'>
                    <OpenModalButton
                        buttonText="Delete"
                        recipeId={recipe.id}
                        modalComponent={<DeleteRecipe recipeId={recipe.id} />}
                    />
                    <OpenModalButton
                        buttonText="Update"
                        recipeId={recipe.id}
                        modalComponent={<UpdateRecipeForm recipeId={recipe.id} />}
                    />
                </div>
            )}
        </div>
    );
};

export default RecipeCard;
