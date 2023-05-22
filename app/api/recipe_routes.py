from flask_wtf.csrf import generate_csrf
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Recipe, Ingredient
from app.forms import RecipeForm, IngredientForm
from datetime import date
from app.models import db
import os
from flask import redirect, request
from sqlalchemy import insert
from flask_wtf.csrf import CSRFProtect, generate_csrf
# from app.models import Ingredient, recipe_ingredient

csrf = CSRFProtect()

recipe_routes = Blueprint('recipes', __name__, url_prefix="/api/recipes")


@recipe_routes.route('/')
def get_all_recipes():
    recipes = Recipe.query.all()
    return {"recipes": [recipe.to_dict() for recipe in recipes]}


@recipe_routes.route('/new', methods=['POST'])
def create_recipe():
    form = RecipeForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # No need to upload a file, just use the provided URL directly
        preview_img_url = form.data['preview_img']

        new_recipe = Recipe(
            recipe_name=form.data['recipe_name'],
            recipe_owner=form.data['recipe_owner'],
            type=form.data['type'],
            cook_time=form.data['cook_time'],
            user_id=current_user.id,
            preview_img=preview_img_url,
            created_at=date.today(),
            updated_at=date.today()
        )
        db.session.add(new_recipe)
        db.session.commit()
        return new_recipe.to_dict()
    return {"errors": form.errors}


@recipe_routes.route('/<int:id>', methods=["PUT"])
def update_recipe(id):
    form = RecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        recipe = Recipe.query.get(id)

        if not recipe:
            return {"errors": "recipe doesn't exist"}

        elif recipe.user_id != current_user.id:
            return {"errors": "this is not your recipe"}

        recipe.recipe_name = form.data['recipe_name']
        recipe.recipe_owner = form.data['recipe_owner']
        recipe.type = form.data['type']
        recipe.cook_time = form.data['cook_time']
        if 'preview_img' in form.data:
            recipe.preview_img = form.data['preview_img']
        else:
            recipe.preview_img = None
        recipe.updated_at = date.today()

        db.session.add(recipe)
        db.session.commit()

        return recipe.to_dict()

    return {"errors": form.errors}


@recipe_routes.route('/<int:id>', methods=['DELETE'])
def delete_recipe(id):
    recipe = Recipe.query.get(id)
    if recipe.user_id != current_user.id:
        return {"errors": 'this is not your recipe'}
    else:
        db.session.delete(recipe)
        db.session.commit()
        return {'success': 'recipe deleted'}


@recipe_routes.route('/<int:id>', methods=['GET'])
def get_recipe(id):
    recipe = Recipe.query.get(id)
    if recipe:
        return recipe.to_dict()
    else:
        return {"errors": "recipe not found"}


@recipe_routes.route('/<int:recipe_id>/ingredients/<int:ingredient_id>', methods=['POST'])
def add_ingredient_to_recipe(recipe_id, ingredient_id):
    recipe = Recipe.query.get(recipe_id)
    ingredient = Ingredient.query.get(ingredient_id)

    if not recipe or not ingredient:
        return {"error": "Recipe or Ingredient not found"}, 404

    # Add the ingredient to the recipe
    ins = recipe_ingredient.insert().values(
        recipe_id=recipe_id, ingredient_id=ingredient_id)
    db.session.execute(ins)
    db.session.commit()

    return {"success": "Ingredient added to the recipe"}


@recipe_routes.route('/current')
@login_required
def get_current_user_recipes():
    recipes = Recipe.query.filter_by(user_id=current_user.id).all()
    return {"recipes": [recipe.to_dict() for recipe in recipes]}

# INGREDIENT ROUTES

# Get all ingredients for a specific recipe


@csrf.exempt
@recipe_routes.route('/<int:recipe_id>/ingredients', methods=['GET'])
@csrf.exempt
def get_ingredients(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    if recipe:
        return {"ingredients": [ingredient.to_dict() for ingredient in recipe.ingredients]}
    else:
        return {"errors": "recipe not found"}

# Add a new ingredient to a recipe


# @recipe_routes.route('/<int:recipe_id>/ingredients', methods=['POST'])
# def add_ingredient(recipe_id):
#     form = IngredientForm()

#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         recipe = Recipe.query.get(recipe_id)

#         if not recipe:
#             return {"error": "Recipe not found"}, 404

#         # Find the ingredient by name, or create it if it doesn't exist
#         ingredient = Ingredient.query.filter_by(name=form.data['name']).first()
#         if not ingredient:
#             ingredient = Ingredient(
#                 name=form.data['name'], quantity=form.data['quantity'])
#             db.session.add(ingredient)
#             db.session.commit()

#         # Add the ingredient to the recipe
#         recipe.ingredients.append(ingredient)
#         db.session.commit()

#         print(ingredient)
#         return ingredient.to_dict()

#     return {"errors": form.errors}
@recipe_routes.route('/<int:recipe_id>/ingredients', methods=['POST'])
# @csrf.exempt
def add_ingredient(recipe_id):
    form = IngredientForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        recipe = Recipe.query.get(recipe_id)

        if not recipe:
            return {"error": "Recipe not found"}, 404

        ingredients = []

        for ingredient_data in form.data['ingredients']:
            # Find the ingredient by name, or create it if it doesn't exist
            ingredient = Ingredient.query.filter_by(
                name=ingredient_data['name']).first()
            if not ingredient:
                ingredient = Ingredient(
                    name=ingredient_data['name'],
                    quantity=ingredient_data['quantity'])
                db.session.add(ingredient)
                db.session.commit()

            # Add the ingredient to the recipe
            # recipe.ingredients.append(ingredient)
            # ingredients.append(ingredient)

        # db.session.commit()

        return [ingredient.to_dict() for ingredient in ingredients]

    return {"errors": form.errors}


# Update an ingredient


@recipe_routes.route('/<int:recipe_id>/ingredients/<int:ingredient_id>', methods=['PUT'])
def update_ingredient(recipe_id, ingredient_id):
    form = IngredientForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        ingredient = Ingredient.query.get(ingredient_id)

        if not ingredient:
            return {"errors": "ingredient doesn't exist"}

        ingredient.name = form.data['name']
        ingredient.quantity = form.data['quantity']

        db.session.add(ingredient)
        db.session.commit()

        return ingredient.to_dict()

    return {"errors": form.errors}

# Delete an ingredient from a recipe


@recipe_routes.route('/<int:recipe_id>/ingredients/<int:ingredient_id>', methods=['DELETE'])
def remove_ingredient(recipe_id, ingredient_id):
    recipe = Recipe.query.get(recipe_id)
    ingredient = Ingredient.query.get(ingredient_id)

    if not recipe or not ingredient:
        return {"error": "Recipe or Ingredient not found"}, 404

    if ingredient in recipe.ingredients:
        recipe.ingredients.remove(ingredient)
        db.session.commit()

    return {'success': 'ingredient removed'}
