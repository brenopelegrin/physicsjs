from flask import Flask, request, Response
from sqlalchemy import UniqueConstraint, JSON, func
from flask_restful import reqparse, abort, Api, Resource
from flask_sqlalchemy import SQLAlchemy
import os

import json

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL').replace('postgres', 'postgresql')

SQLALCHEMY_ENGINE_OPTIONS = {
    'pool_pre_ping': True
}

app.config['SQLALCHEMY_ENGINE_OPTIONS'] = SQLALCHEMY_ENGINE_OPTIONS

api = Api(app)
db = SQLAlchemy(app)
