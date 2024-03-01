from flask import Flask, request
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate


app = Flask(__name__)

# SQLAlchemy Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///travellist.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False # Read on this!!

# JWT Config
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)

api = Api(app)
db = SQLAlchemy(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)



import routes