# production
FROM node:latest

WORKDIR /app

COPY /*.json ./
COPY /*.js ./
RUN npm i

CMD ["sh", "-c", "npm run start"]
