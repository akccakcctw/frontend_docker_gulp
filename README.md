# Frontend Docker Gulp

## Prerequisities

- docker
- docker-compose


## Usage

1. Clone the repository: `git clone https://github.com/akccakcctw/frontend_docker_gulp.git`.
2. Put your project(s) under `./app`, such as `./app/project_sample`.
3. Edit `docker-compose.yml`. (you may want to do some cool things)
4. Run `docker-compose up`. (if you have multiple projects, you can also `docker-compose up [your_project]` to start specific project)
5. `<Ctrl-c>` to close it.


## Features

- gulp3 and gulp4 project sample, with following tools enabled:
	- BrowserSync (watch your scss file)
	- Babel
	- Pug
	- SCSS


## Development

some useful commands for development:

```sh
# rebuild the container
docker-compose build --no-cache

# stop all running containers
docker stop $(docker ps -aq)

# remove all containers
docker rm $(docker ps -aq)

# remove all images
docker rmi $(docker images -q)
```
