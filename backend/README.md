# Backend of physicsjs

The backend is entirely based on [flask-tasks-docker](https://github.com/brenopelegrin/flask-tasks-docker). We just add the simulaiton tasks on top of the existing project.

The backend consists of an API that will receive tasks requests and redirect them to an AMQP queue. 

Then, the handler module takes place by getting the tasks from the AMQP queue and executing them. After the execution, the tasks are stored in a SQL database.

# Getting started

To run, first clone the repository and go to the backend directory:

```bash
git clone https://github.com/brenopelegrin/physicsjs && cd ./physicsjs/backend
```

After that, build and run the API and Handler docker images:

*:warning: Before running, please make sure to configure the environment variables for handler and api.*

```bash
docker build -t "physicsjs-api" api && docker run --network=host -d physicsjs-api
```

```bash
docker build -t "physicsjs-handler" handler && docker run --network=host -d physicsjs-handler
```

### Configuring environment variables

- API (```backend/api/Dockerfile```):
  
  Please set the SQL Database URL, the AMQP backend URL, and the number of gunicorn workers and threads you want. 

  If you want to, you can allow CORS only for your front-end site by setting the FRONTEND_URL with the front-end URL.

  ```Dockerfile
  ENV DATABASE_URL postgres://postgres:123@localhost:5432/flask_tasks_v2
  ENV AMQP_URL redis://localhost:6379
  ENV FRONTEND_URL *
  ENV GUNICORN_WORKERS 3
  ENV GUNICORN_THREADS 1
  ```
- Handler (```backend/handler/Dockerfile```):
  
  Please set the SQL Database URL, the AMQP backend URL and the worker name you want. Make sure the worker name is unique.

  ```Dockerfile
  ENV DATABASE_URL postgres://postgres:123@localhost:5432/flask_tasks_v2
  ENV AMQP_URL redis://localhost:6379
  ENV WORKER_NAME worker
  ```

## API endpoints

### /task/new

Method: ```POST```

This endpoint will register a new task in the server. You need to pass some required arguments inside a ```application/json```. The json should contain a string with the task type, named ```type``` and the task-specific required arguments as a dictionary, named ```args```:

Example of request (task of type "add"):

Parameters:
```json
{
    "type":"add",
    "args": {
      "x": 1,
      "y": 2
    }
}
```

```bash
curl -X POST localhost:5000/task/new -H 'Content-Type: application/json' -d '{"type":"add", "args":{"x": 1, "y": 2}}'
```

Example of response:

```json
{
  "id": "5861c3a8-fa0f-4b84-9e54-04b545408114",
  "result": {},
  "args": {"x": 1, "y": 2},
  "status": "PENDING",
  "type": "add",
}
```

If the task type passed doesn't match the name of any function declared in the ```api/tasks.py``` file, then it will return an error:

```json
{
  "message":"task type [tasktype] doesnt exist"
}
```

If the task exists but you didn't pass an required argument of the declared function, then it will return an error:

```json
{
  "message": "the required param [param] was not passed."
}
```

If the task exists, all arguments were passed but the type of an argument doesn't match the type of the argument on the declared function, then it will return an error:

```json
{
  "message": "the passed param [param] doesnt match the required type: [required type]."
}
```

If you pass an argument that is not required, then it will return an error:

```json
{
   "message": "the passed param [param] is not required."
}
```

You can also use the example task "mov3d" for testing purposes, which will simulate the trajectory of a particle:

Parameters:
```json
{
    "type":"mov3d",
    "args": {
      "dt": 0.001,
      "mass": 1.0,
      "r0": [0.5, 0.5, 0.5],
      "v0": [10.0, 10.0, 10.0],
      "radius": 0.3,
      "drag": false
    }
}
```

Example of response:

```json
{
  "id": "5861c348-fa0f-4b84-9e54-04b545408114",
  "result": {[all results of simulation]},
  "args": {[args you passed]},
  "status": "SUCCESS",
  "type": "mov3d",
}
```
Where the "result" will contain the following:
```json
"result": 
{
    "r": [[x1,y1,z1], [x2,y2,z2], [xn,yn,zn]],
    "v": [[x1,y1,z1], [x2,y2,z2], [xn,yn,zn]],
    "a": [[x1,y1,z1], [x2,y2,z2], [xn,yn,zn]],
    "alpha": [[x1,y1,z1], [x2,y2,z2], [xn,yn,zn]],
    "w": [[x1,y1,z1], [x2,y2,z2], [xn,yn,zn]],
    "t": [t1, t2, tn]
}
```

### /task/```<task_id>```/view

Method: ```GET```

This endpoint will return the current data for the task with id ```task_id``` in ```application/json``` format:

Example of request:

Parameters: ```<task_id>```

```bash
curl -X GET localhost:5000/task/5861c3a8-fa0f-4b84-9e54-04b545408114/view
```

Example of response:

```json
{
  "id": "5861c3a8-fa0f-4b84-9e54-04b545408114",
  "result": 3,
  "args": {"x": 1, "y": 2},
  "status": "SUCCESS",
  "type": "add",
}
```

The status of a retrieved task can be:
- ```PENDING```
  
  Means that the task doesn't exist *OR* exists and has not yet been received by a worker.

- ```STARTED```
  
  Means that the task has been received by a worker and is actually being computed

- ```SUCCESS```
  
  Means that the task has been received by a worker, have already been computed and is available for view
