FROM node:18
RUN mkdir -p /var/app
WORKDIR /var/app
COPY package*.json .
RUN npm install
COPY . .
# ENV NODE_ENV production
RUN npm run build
EXPOSE 3001
CMD ["node", "dist/main.js"]