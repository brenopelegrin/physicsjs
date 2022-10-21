# API of mov3d

### Example of json
```
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
```
curl -X GET https://<server_ip>:<server_port>/simulate/mov3d -H 'Content-Type: application/json' -d '{"mass": 1.0,"drag": true,"dt": 0.001,"radius": 0.2,"r0": [0,0,0],"v0": [10,10,0]}'
```
