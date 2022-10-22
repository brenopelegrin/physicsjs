import sys
from server import app, api
from models import *
from web_resources import *
#import multiprocessing

api.add_resource(SimulateMov3D, '/simulate/mov3d')

@app.route('/')
def documentation():
    return "You can view the server-end documentation on <a href='https://github.com/brenopelegrin/physicsjs/tree/master/api/'>GitHub.</a>"

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
