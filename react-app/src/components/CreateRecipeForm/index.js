import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { createRecipeThunk } from "../../store/recipes";
import { useModal } from "../../context/Modal";
// import { Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";


function CreateRecipeForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const { closeModal } = useModal();
    const [recipeName, setRecipeName] = useState("");
    const [recipeOwner, setRecipeOwner] = useState("");
    const [type, setType] = useState("");
    const [cookTime, setCookTime] = useState("");
    const [previewImg, setPreviewImg] = useState("");
    const [errors, setErrors] = useState([]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const recipe = new FormData();
        recipe.append('recipe_name', recipeName);
        recipe.append('recipe_owner', recipeOwner);
        recipe.append('type', type);
        recipe.append('cook_time', cookTime);
        recipe.append('preview_img', previewImg);

        console.log('type', type)

        const data = await dispatch(createRecipeThunk(recipe));
        if (data) {
            setErrors(data);
        }
        closeModal();
        console.log(recipeName, recipeOwner, type, cookTime, previewImg)
    };



    return (
        <>
            <h1>Post New Recipe</h1>
            <form onSubmit={handleSubmit}>
                {/* <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))} */}
                {/* </ul> */}
                <label>
                    Recipe Name
                    <input
                        type="text"
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Recipe Owner
                    <input
                        type="text"
                        value={recipeOwner}
                        onChange={(e) => setRecipeOwner(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Type
                    <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}>
                        <option></option>
                        <option value="Non-vegetarian">Non-Vegetarian</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                    </select>
                    {/* <input
                        type="select"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    /> */}
                </label>
                <label>
                    Cook Time
                    <input
                        type="text"
                        value={cookTime}
                        onChange={(e) => setCookTime(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Image of Dish
                    <input
                        type="url"
                        value={previewImg}
                        onChange={(e) => setPreviewImg(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Enter</button>
            </form>
        </>
    );
}

export default CreateRecipeForm;