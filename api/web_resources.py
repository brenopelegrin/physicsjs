from flask_restful import reqparse, abort, Api, Resource
from webargs import fields, validate
from webargs.flaskparser import use_kwargs, parser
#from server import db
from models import *
from time import sleep
from flask import jsonify, render_template
import werkzeug
from phys_resources import *

class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super(NpEncoder, self).default(obj)

class SimulateMov3D(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('dt', required=True, type=float, help='You need to inform dt', location='json')
        parser.add_argument('r0', required=True, type=list, help='You need to inform r0', location='json')
        parser.add_argument('v0', required=True, type=list, help='You need to inform v0', location='json')
        parser.add_argument('mass', required=True, type=float, help='You need to inform mass', location='json')
        parser.add_argument('radius', required=True, type=float, help='You need to inform mass', location='json')
        parser.add_argument('drag', required=True, type=bool, help='You need to inform mass', location='json')
        args = parser.parse_args()

        body = SphericalBody(mass=args["mass"], radius=args["radius"], drag_coefficient=0.5)
        fluid = Fluid(density=1.184, knematic_viscosity=15.52e-6)

        sim = Simulation3D(body_params=body.params, fluid_params=fluid.params, r0=args["r0"], v0=args["v0"], dt=args["dt"])
        sim.config["drag"] = args["drag"]
        sim.run()

        return sim.result

def TaskHandler():
    return None
