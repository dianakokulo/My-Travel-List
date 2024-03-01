from app import app, api

# Import and register your routes
from resources.item import CreateItem, GetItem, GetItems, DeleteItem
from resources.user import UserRegister, UserLogin, GetUserResource

api.add_resource(UserRegister, "/register")
api.add_resource(UserLogin, "/login")
api.add_resource(GetUserResource, "/user/<int:user_id>")

api.add_resource(CreateItem, "/item")
api.add_resource(GetItems, "/item")
api.add_resource(GetItem, "/item/<int:user_id>")
api.add_resource(DeleteItem, "/delete/<int:item_id>")


@app.route('/')
def get():
    return 'Welcome to my Travel List'