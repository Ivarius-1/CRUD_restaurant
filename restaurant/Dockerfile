FROM node:20.17.0

WORKDIR /app

COPY package*.json package-lock.json ./

RUN npm install

COPY . .

RUN chmod -R a+rwx /app 
RUN npm run build 

EXPOSE 3000

CMD ["npm", "start"]