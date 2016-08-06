FROM registry.gitlab.com/nec/necbase
MAINTAINER Ritesh Ranjan

# Application specific configuration

ENV APP_INSTALL_PATH /smrt
WORKDIR $APP_INSTALL_PATH

RUN mkdir -p $APP_INSTALL_PATH


COPY package.json .
RUN npm install

COPY app ./app

COPY Public ./Public
COPY app.js Gruntfile.js ./
COPY config ./config

ENV NODE_ENV=docker


EXPOSE 4200-4209
CMD node app.js


