FROM node:20

WORKDIR /var/www/

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

COPY . .

CMD ["npm", "run", "dev"]
