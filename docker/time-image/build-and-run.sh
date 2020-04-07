docker build -t time-image .
docker rm  -f time-container
docker run --name time-container -p 28800:8080 -d time-image
docker logs -f time-container
