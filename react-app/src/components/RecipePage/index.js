// import React from 'react';
// import { useEffect } from 'react';
// import slider from 'react-slick';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllRecipesThunk } from '../../store/recipes'
// import RecipeCard from '../RecipeCard';
// import CreateRecipeForm from '../CreateRecipeForm'
// import OpenModalButton from "../OpenModalButton";
// // import { useParams } from 'react-router-dom';
// import './RecipePage.css'

// const RecipePage = () => {
//     const dispatch = useDispatch();
//     const recipes = useSelector(state => Object.values(state.recipes.allRecipes));

//     // console.log('state', state);

//     useEffect(() => {
//         dispatch(getAllRecipesThunk());
//     }, [dispatch]);

//     return (
//         <>
//             <div className="banner">
//                 <h1>Epicure Eats</h1>
//             </div>
//             <OpenModalButton
//                 buttonText="Post a Recipe"
//                 onItemClick={() => {

//                 }}
//                 modalComponent={<CreateRecipeForm />}
//             />
//             <div className="recipes-list">
//                 {recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
//             </div>
//         </>
//     );
// };

// export default RecipePage;

import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipesThunk } from '../../store/recipes'
import RecipeCard from '../RecipeCard';
import CreateRecipeForm from '../CreateRecipeForm'
import OpenModalButton from "../OpenModalButton";
import './RecipePage.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from 'react-router-dom';


const RecipePage = () => {
    const dispatch = useDispatch();
    const recipes = useSelector(state => Object.values(state.recipes.allRecipes));
    const sessionUser = useSelector((state) => state.session.user);


    useEffect(() => {
        dispatch(getAllRecipesThunk());
    }, [dispatch]);

    // define settings for slider
    // const settings = {
    //     dots: true,
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     arrows: true,
    // };
    const settings = {
        centerMode: true,
        // prevArrow: <button type="button" class="slick-prev">Previous</button>,
        centerPadding: '60px',
        arrows: true,
        dots: true,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    // centerMode: true,
                    // centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: true,
                    // centerMode: true,
                    // centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    }

    return (
        <>
            <div className="nav-link-container">
                <NavLink to="/" className="return-home-link">Return Home:</NavLink>
            </div>
            <div className="banner">
                <h1>Epicure Eats</h1>
            </div>
            {/* {sessionUser &&
                <OpenModalButton
                    buttonText="Post a Recipe"
                    onItemClick={() => { }}
                    modalComponent={<CreateRecipeForm />}
                />
            } */}
            <div className="recipes-list">
                <Slider {...settings}>
                    {recipes.map(recipe =>
                        <div key={recipe.id}>
                            <RecipeCard recipe={recipe} />
                        </div>
                    )}
                </Slider>
            </div>
            {/* <br />
            < br />
            <br /> */}
        </>
    );
};

export default RecipePage;
