docker rm -f my-iot-vue 2>/dev/null || true
docker build -t iot-vue:1.0 .
docker run -d --name my-iot-vue -p 80:80 iot-vue:1.0