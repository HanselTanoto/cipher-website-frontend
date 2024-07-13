# from base image node
FROM node:16

# sets the working directory
WORKDIR /app

# copying all the files from your file system to container file system
COPY package*.json ./

# install all dependencies
RUN npm install

# copy oter files as well
COPY . .

# set env variables
ENV REACT_APP_BACKEND_URL=https://cryptocalc-api-cvuk2yexpa-et.a.run.app/

# Build the React app
RUN npm run build

# expose the port
EXPOSE 3000

# Serve the build
CMD ["npx", "serve", "-s", "build"]