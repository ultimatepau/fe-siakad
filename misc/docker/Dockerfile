# base image
FROM node:20-alpine

# set working directory
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install

# copy project files
COPY . .

# build app
RUN npm run build

# expose port
EXPOSE 5173

# start app
CMD ["npm", "run", "dev"]
