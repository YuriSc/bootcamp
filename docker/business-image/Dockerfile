FROM node:12.16.1
RUN npm install request 
ADD app.js /app.js
RUN date > /build.info
ENTRYPOINT ["node", "app.js"]

