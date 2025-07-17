FROM node:18

WORKDIR /app

COPY package*.json ./
RUN rm -rf node_modules 
RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm", "start"]