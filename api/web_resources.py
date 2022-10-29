from flask_restful import reqparse, abort, Api, Resource
from webargs import fields, validate
from webargs.flaskparser import use_kwargs, parser
#from server import db
from models import *
from time import sleep
from flask import jsonify, render_template, make_response, render_template_string
import werkzeug
from phys_resources import *
import plotly.graph_objs as go
import time
import numpy as np
from base64 import b64encode
import io

from datetime import datetime

ts_one_day = 86400
max_task_time = ts_one_day

class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super(NpEncoder, self).default(obj)

def abort_if_task_doesnt_exist(task_id):
    exists = db.session.query(Task.id).filter_by(id=task_id).scalar() is not None
    if exists != True:
        abort(404, message="task id {} is not registered".format(task_id))

class ViewTask(Resource):
    def get(self, task_id):
        abort_if_task_doesnt_exist(task_id)
        task = Task.query.get(task_id)
        return task_schema.dump(task)

class DrawGraph(Resource):
    def get(self):

        headers = {'Content-Type': 'text/html'}
        
        parser = reqparse.RequestParser()
        parser.add_argument('task_id', required=True, type=int, help="You need to inform task id", location='args')
        parser.add_argument('type', required=True, type=str, help="You need to inform type of graph", location='args')
        args = parser.parse_args()

        abort_if_task_doesnt_exist(args["task_id"])
        task = Task.query.get(args["task_id"])
        task = task_schema.dump(task)
        result = task["result"]

        buffer = io.StringIO()

        if args["type"] == "r":
            fig = go.Figure(data=go.Scatter3d(x=np.array(result["r"])[:,0], y=np.array(result["r"])[:,1],z=np.array(result["r"])[:,2], mode='lines'))
            fig.write_html(buffer)

            html_bytes = buffer.getvalue().encode()
            encoded = b64encode(html_bytes).decode()
            html = buffer.getvalue()
            
            return make_response(render_template_string(buffer.getvalue()), 200, headers)

class SimulateMov3D(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('dt', required=True, type=float, help='You need to inform dt', location='json')
        parser.add_argument('r0', required=True, type=list, help='You need to inform r0', location='json')
        parser.add_argument('v0', required=True, type=list, help='You need to inform v0', location='json')
        parser.add_argument('mass', required=True, type=float, help='You need to inform mass', location='json')
        parser.add_argument('radius', required=True, type=float, help='You need to inform radius', location='json')
        parser.add_argument('drag', required=True, type=bool, help='You need to inform drag bool', location='json')
        args = parser.parse_args()
        ts_current = time.time()
        task = Task(simtype='mov3d', args=args, status="waiting", created=ts_current, expire=ts_current+max_task_time)
        
        db.session.add(task)
        db.session.commit()
        
        abort_if_task_doesnt_exist(task.id)
        task = Task.query.get(task.id)
        return task_schema.dump(task)

def RunTask(task, args):
    print(f"task {task.id} is running", flush=True)
    task.status = "running"
    db.session.commit()

    if task.simtype == 'mov3d':
        body = SphericalBody(mass=args["mass"], radius=args["radius"], drag_coefficient=0.5)
        fluid = Fluid(density=1.184, knematic_viscosity=15.52e-6)

        sim = Simulation3D(body_params=body.params, fluid_params=fluid.params, r0=args["r0"], v0=args["v0"], dt=args["dt"])
        sim.config["drag"] = args["drag"]
        sim.run()

        return sim.result
    else:
        return {"message": f'simulation type ({task.simtype}) not supported'}

def RunTaskCleaner():
    ts_current = time.time()
    task = Task.query.filter(Task.created < ts_current-max_task_time).first()
    if task != None:
        print(f"task {task.id} deleted because it exceeded max storage time", flush=True)
        Task.query.filter_by(id = task.id).delete()
        db.session.commit()

def TaskHandler():
    print("started taskhandler", flush=True)

    while 1:
        task = Task.query.filter_by(status='waiting').first()
        if task != None:
            print(f'task {task.id} is ready to run.', flush=True)

            task.result = RunTask(task=task, args=task.args)
            print(f"task {task.id} is finished", flush=True)
            task.status = "done"

            db.session.commit()

        RunTaskCleaner()
