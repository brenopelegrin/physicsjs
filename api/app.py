from server import app, api
from models import *
from resources import *
#import multiprocessing

#api.add_resource(CreateDevice, '/device/new')

@app.route('/')
def documentation():
    return "You can view the server-end documentation on <a href='https://github.com/brenopelegrin/physicsjs/tree/master/api/'>GitHub.</a>"

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
