from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, TextAreaField, SubmitField, BooleanField, SelectField, DateField, FieldList, FormField
from wtforms.validators import DataRequired
from app.models import Recipe
from .ingredient_form import IngredientForm


class RecipeForm(FlaskForm):
    recipe_name = StringField("Recipe Name", validators=[DataRequired()])
    recipe_owner = StringField("Recipe Owner", validators=[DataRequired()])
    type = SelectField(
        "Type", choices=[("Non-vegetarian", "Non-vegetarian"), ("Vegetarian", "Vegetarian"), ("Vegan", "Vegan")], validators=[DataRequired()])
    cook_time = FloatField("Cook Time")
    preview_img = StringField("Image URL")
    submit = SubmitField("Submit")
    ingredients = FieldList(FormField(IngredientForm), min_entries=1)
