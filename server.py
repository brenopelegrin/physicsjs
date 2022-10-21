from flask import Flask, request, Response
#from sqlalchemy import UniqueConstraint
from flask_restful import reqparse, abort, Api, Resource
#from flask_sqlalchemy import SQLAlchemy

import json

app = Flask(__name__, static_url_path='', static_folder='static')
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'

api = Api(app)
#db = SQLAlchemy(app)