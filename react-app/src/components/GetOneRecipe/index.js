

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRecipeThunk } from '../../store/recipes';
import IngredientsForm from '../IngredientsForm';
import PreparationForm from '../Preparations';
import OpenModalButton from '../OpenModalButton';
import RecipeCard from '../RecipeCard';
import DeleteIngredient from '../DeleteIngredient';
import './GetOneRecipe.css'
import { NavLink } from 'react-router-dom';
import UpdateIngredientForm from '../UpdateIngredient';

function RecipeDetails() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const recipe = useSelector((state) => state.recipes.singleRecipe);
    const sessionUser = useSelector((state) => state.session.user);
    const owner = recipe.recipe_owner;
    const current_user = sessionUser.id;
    let ingredientList = [];

    if (recipe.ingredients && recipe.ingredients.length > 0) {
        ingredientList = recipe.ingredients.map(ingredient => ({
            name: ingredient.name,
            quantity: ingredient.quantity
        }));
    }

    console.log('this is the list', ingredientList);
    let preparationList = [];


    if (recipe.preparations && recipe.preparations.length > 0) {
        preparationList = recipe.preparations.map(preparation => ({
            step: preparation.step_number,
            instruction: preparation.instruction
        }));
    } 

    console.log(preparationList);

    //   const recipeIngredients = useSelector((state) => state)

    useEffect(() => {
        dispatch(getRecipeThunk(id));
    }, [dispatch, id]);

    console.log('recipe id', recipe.id)
    return (
        <>
            <div className="banner">
                <h1>Epicure Eats</h1>
            </div>
            <OpenModalButton
                buttonText="Add Your Ingredients"
                onItemClick={() => {

                }}
                modalComponent={<IngredientsForm key={recipe.id} />}
            />
            <OpenModalButton
                buttonText="Add Your Steps"
                onItemClick={() => {

                }}
                modalComponent={<PreparationForm key={recipe.id} />}
            />
            <div className="recipe">
                <RecipeCard key={recipe.id} recipe={recipe} className="one_recipe_card" />
            </div>
            <div className="ingredients-card">
                <h2>Ingredients</h2>
                <ul>
                    {ingredientList.map((ingredient, index) => (
                        <li key={index}>
                            {ingredient.name} - {ingredient.quantity}
                            {/* <OpenModalButton
                                buttonText="Delete"
                                ingredientId={ingredient.id}
                                modalComponent={<DeleteIngredient recipeId={recipe.id} ingredientId={ingredient.id} />}
                            /> */}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="preparations-card">
                <h2>Preparation</h2>
                <ul>
                    {preparationList.map((preparation, index) => (
                        <li key={index}>
                            {preparation.step} - {preparation.instruction}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default RecipeDetails;
