# this will build the project from a windows environment

podman build . -f .\ci\Dockerfile  -t midjourney-ui-builder
podman run -it -v ./build:/app/build -t midjourney-ui-builder