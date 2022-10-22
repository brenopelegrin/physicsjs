# physicsjs API

## Getting started
You can deploy the server by running

```bash
pip install -r requirements.txt
gunicorn app:app
```

For testing purposes, you can use the Heroku production server [https://physicsjsapi.herokuapp.com]

## Requesting data of mov3d simulator

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
### Sending simulation request
```bash
curl -X GET https://<server_ip>:<server_port>/simulate/mov3d -H 'Content-Type: application/json' -d '{"mass": 1.0,"drag": true,"dt": 0.001,"radius": 0.2,"r0": [0,0,0],"v0": [10,10,0]}'
```
It will return a json response with the resulting data.
Note: r, v, a, w, alpha are arrays of the 3-dimension vector of each observable: r stands for position vector, v for velocity vector, a for linear acceleration vector, alpha for angular acceleration vector, w for angular velocity vector. Finally, t is an array of the discrete time of each step.

```javascript
{
    "r": [[x1,y1,z1], [x2,y2,z2], [xn,yn,zn]],
    "v": [[x1,y1,z1], [x2,y2,z2], [xn,yn,zn]],
    "a": [[x1,y1,z1], [x2,y2,z2], [xn,yn,zn]],
    "alpha": [[x1,y1,z1], [x2,y2,z2], [xn,yn,zn]],
    "w": [[x1,y1,z1], [x2,y2,z2], [xn,yn,zn]],
    "t": [t1, t2, tn]
}
```
