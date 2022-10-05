// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// defining the Express app
const app = express();

// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', (req, res) => {
  res.send(ads);
});

app.get('/movimento3d', (req, res) => {
    let radius = res.query.radius;
    let mass = res.query.mass;
    let r0 = res.query.r0;
    let v0 = res.query.v0;
    let dt = 0;
    let complexity = res.query.complexity;
    let dragcondition = res.query.drag;
    switch(complexity){
        case "1":
            dt = 0.1
            break;
        case "2":
            dt = 0.01
            break;
        case "3":
            dt = 0.001
            break;
        default:
            dt = 0.1
            return;
    };
})

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});