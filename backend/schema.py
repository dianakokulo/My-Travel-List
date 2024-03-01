from app import ma
from models import User, Item

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_only = ("password",)
        dump_only = ("id",)
        load_instance = True

class ItemSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Item
        dump_only = ("id",)
        include_fk = True
        load_instance = True