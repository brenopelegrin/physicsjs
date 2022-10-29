import sys
from server import app, api
from models import *
from web_resources import *
import multiprocessing.dummy as context

#context = multiprocessing.get_context('fork')

api.add_resource(SimulateMov3D, '/simulate/mov3d')
api.add_resource(ViewTask, '/task/<int:task_id>/view')
#api.add_resource(DrawGraph, '/graph/get')

@app.route('/')
def documentation():
    return "You can view the server-end documentation on <a href='https://github.com/brenopelegrin/physicsjs/tree/master/api/'>GitHub.</a>"

if __name__ == '__main__':
    #p1 = context.Process(target=TaskHandler)
    #p1.start()
    app.run(debug=False, host='0.0.0.0')
    
