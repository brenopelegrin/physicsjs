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
