FROM node:20.9.0-alpine
ENV NODE_ENV=production
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json /usr/app/
RUN npm install && npm install -g typescript
COPY . /usr/app/
EXPOSE 5001
CMD ["npm", "start"]
