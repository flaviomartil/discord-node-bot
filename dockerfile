FROM node:20

WORKDIR /var/www/

COPY package*.json ./

RUN npm install
RUN npm install -g pm2

COPY . .

CMD ["pm2-runtime", "index.js"]