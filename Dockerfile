FROM node:18-alpine

WORKDIR /app

COPY app/package*.json ./
RUN npm install

COPY app ./
COPY package*.json ./
RUN npm install

COPY . .
CMD ["npm", "start"]

EXPOSE 3000

