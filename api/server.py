from flask import Flask, request, Response
from sqlalchemy import UniqueConstraint, JSON, func
from flask_restful import reqparse, abort, Api, Resource
from flask_sqlalchemy import SQLAlchemy
import os

import json

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']

api = Api(app)
db = SQLAlchemy(app)
