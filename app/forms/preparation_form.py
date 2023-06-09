from flask_wtf import FlaskForm
from wtforms import StringField, FieldList, FormField, IntegerField
from wtforms.validators import DataRequired


class PreparationDataForm(FlaskForm):
    class Meta:
        csrf = False

    step_number = IntegerField('Step Number', validators=[DataRequired()])
    instruction = StringField('Instruction', validators=[DataRequired()])



class PreparationDataForm(FlaskForm):
    # class Meta:
    #     csrf = False
    preparation = FieldList(FormField(PreparationDataForm), min_entries=1)
