from flask import request
from flask_restful import Resource
from flask_jwt_extended import(
    get_jwt,
    get_jwt_identity,
    jwt_required
)

from models import Item
from schema import ItemSchema


item_schema = ItemSchema()
items_schema = ItemSchema(many=True)

class CreateItem(Resource):
    @classmethod
    def post(cls):
        item = item_schema.load(request.get_json())
       
        try:
            Item.save_to_db(item)

        except Exception as e:
            print(e)
            return {"message": "An error occured while saving to the database"}, 500
        
        return item_schema.dump(item), 200
    

class GetItems(Resource):
    @classmethod
    def get(cls):
        item = Item.query.all()

        results = items_schema.dump(item)
        return {"item": results}, 200

class GetItem(Resource):
    @classmethod
    def get(cls, user_id: int):

        user_items = Item.query.filter_by(user_id=user_id).all()
          

        return items_schema.dump(user_items), 200

        
class DeleteItem(Resource):
    @classmethod
    def delete(cls, item_id: int):
        item = Item.find_by_id(item_id)

        if not item:
            return {"message": "item not found"}, 404
        item.delete_from_db()
        
        return {"message": "item deleted successfully"}, 200