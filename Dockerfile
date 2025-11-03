FROM node:22-alpine3.20

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update, upgrade, and install git in a single layer
RUN apk update && apk upgrade && apk add --no-cache git

# copy package files first for better layer caching
COPY package*.json ./

# install dependencies with retry timeout for reliability
RUN npm install --fetch-retry-maxtimeout 300000

# copy the app, note .dockerignore (excludes sensitive files)
COPY . .

# build the application
RUN npm run build

# expose 3000 on container
EXPOSE 3000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000

# start the app in production mode
CMD ["node", ".output/server/index.mjs"]
