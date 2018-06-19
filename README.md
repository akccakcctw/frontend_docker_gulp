# Frontend Docker Gulp

## Prerequisities

- docker
- docker-compose


## Usage

1. Put your projects under `./app`, such as `./app/project_sample`.
2. Adjuct `docker-compose.yml`. (you may want to do some cool things)
3. Run `docker-compose up`. (or `docker-compose up [your_project]`, if you have multiple projects)
4. `<Ctrl-c>` to close it.


## Development

some useful commands:

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
