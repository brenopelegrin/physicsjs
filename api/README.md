# physicsjs API

## Getting started

For testing purposes, you can use the Heroku production server https://physicsjsapi.herokuapp.com

### Running the API using Heroku CLI (recommended)

After cloning the repository and getting to the "api" directory, just run:

```
pip install -r requirements.txt
```

```bash
heroku local
```

### Running the API manually

First, install the requirements

```
pip install -r requirements.txt
```

Set the Postgres database URL:

```bash
export DATABASE_URL=postgres://[user]:[password]@[netloc]:[port]/[dbname]
```

Then, you can deploy the web server by running

```bash
gunicorn app:app
```

And run the Task Handler server by running
```bash
python3 -m handler.py
```

## Requesting data from mov3d simulator

### Example of request json
```javascript
{
    "mass": 1.0,
    "drag": true,
    "dt": 0.001,
    "radius": 0.2,
    "r0": [0,0,0],
    "v0": [10,10,0]
}
```
### Sending simulation request (to Heroku production server)

To create a new simulation, run

```bash
curl -X GET https://physicsjsapi.herokuapp.com/simulate/mov3d -H 'Content-Type: application/json' -d '{"mass": 1.0,"drag": true,"dt": 0.001,"radius": 0.2,"r0": [0,0,0],"v0": [10,10,0]}'
```
It will return a json response confirmating the simulation task registration.

```javascript
{
    "id": task_id,
    "created": creation_timestamp,
    "expire": expire_timestamp,
    "args": {"mass": 1.0,"drag": true,"dt": 0.001,"radius": 0.2,"r0": [0,0,0],"v0": [10,10,0]},
    "status": "waiting",
    "result": null
}
```

After that, the task will be added to the server processing queue.

### Checking a registered task. (For example, task_id = 1)

To check a registered task, run

```bash
curl -X GET https://physicsjsapi.herokuapp.com/task/1/view
```

And then it will return the task info:

```javascript
{
    "id": task_id,
    "created": creation_timestamp,
    "expire": expire_timestamp,
    "args": args_you_passed,
    "status": "running",
    "result": null
}
```
Note that "status" can be "waiting", "running" or "done". 
- When the status is "waiting", the task is still in the queue.
- When the status is "running", the task is currently being processed.
- When the status is "done", the task is completed and the results of simulation will be in the "result" key.

> Note: The task will be available for 1 day since the registration process. After that, it will be deleted from database, even if it wasn't yet processed.

When the taks status is "done", the "result" key will be like this:

```javascript
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
The keys "r", "v", "a", "w", alpha are arrays of the 3-dimension vector of each observable and "t" is the time: 
- r stands for position vector
- v for linear velocity vector
- a for linear acceleration vector
- alpha for angular acceleration vector
- w for angular velocity vector
- t is an array of the discrete time of each step
