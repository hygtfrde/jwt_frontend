# jwt_frontend
public repo for JWT authentication app, client-side
to be used in conjunction with https://github.com/hygtfrde/jwt_backend

## How to install and run
In the /frontend directory, run `npm install`
to download the relevant packages. Then run `npm start` to start the app.

## Docker
Rather use docker? Run `docker-compose up` inside of the `Docker` folder to initialize the back-end architecture. The is also a Dockerfile to build this app into an image. To do so, run `docker build -t myapp .` To stop all running containers on your machine, run `docker stop $(docker ps -aq)`
