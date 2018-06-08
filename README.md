# Frontend Docker Gulp

## Prerequisities

- docker
- docker-compose


## Usage

1. Put your projects under `./app`, such as `./app/project_sample`.
2. Adjuct `docker-compose.yml`
3. Run `docker-compose up`. (or `docker-compose up your_project`, if you have multiple projects)


## Development

some useful commands:

rebuild the container

```
docker-compose build --no-cache

```

Stop all running containers

```
docker stop $(docker ps -aq)
```

Remove all containers

```
docker rm $(docker ps -aq)
```

Remove all images

```
docker rmi $(docker images -q)
```
