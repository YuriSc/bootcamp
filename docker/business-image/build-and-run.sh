docker build -t business-image .
docker rm  -f business-container
docker run --name business-container -p 28811:8080 -e TIME_SERVICE_HOST="$(hostname):28800" -d business-image
docker logs -f business-container
