# physicsjs

## Getting Started

This repository contains a bunch of physics simulation software written in JavaScript or Python.

### Front-end
In the root of the directory, there is a static website with an interface to visualize the simulation data. 

The website can run the simulation in your device or make a request to the back-end api hosted on Heroku.

### Back-end
In the "api" directory, there is a Flask RESTful API written in Python with integration to a Postgres database, ready to deploy on a Heroku dyno.

The API can receive various simulations requests and store them in a processing queue.

After adding a simulation to the queue, the API will run the waiting simulation make the result data available in an endpoint.

Then, the client can query the endpoint to get the resulting data and use it for its own purposes.
