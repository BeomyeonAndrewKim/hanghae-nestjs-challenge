FROM node:18
RUN mkdir -p /var/app
WORKDIR /var/app
COPY package*.json .
RUN npm install
COPY . .
ENV NODE_ENV production
EXPOSE 80
CMD ["npm", "run", "start:prod"]