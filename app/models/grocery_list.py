# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from sqlalchemy.sql import func

# class GroceryList(db.Model):
#     __tablename__="grocery_lists"

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
