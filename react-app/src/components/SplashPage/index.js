import React from 'react';
import { NavLink } from 'react-router-dom';

function SplashPage() {
    return (
        <div className="splash-container">
            <div className="splash-header">
                <h1>Welcome to Epicure Eats</h1>
                <p>Discover, cook, enjoy.</p>
                <NavLink to="/signup">Sign Up</NavLink>
            </div>
            <div className="splash-image">
                <NavLink exact to='/recipes'>
                    <img src="https://thumbs.dreamstime.com/b/colourful-various-herbs-spices-cooking-dark-background-herbs-spices-cooking-dark-background-113655482.jpg" alt="Epicure Eats" />
                </NavLink>
            </div>
        </div>
    )
}

export default SplashPage;