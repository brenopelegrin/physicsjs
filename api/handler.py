import sys
from server import db
from models import *
from web_resources import *
import multiprocessing as context

if __name__ == '__main__':
    p1 = context.Process(target=TaskHandler)
    p1.start()