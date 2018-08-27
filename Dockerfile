FROM node:10-alpine

# Build-time metadata as defined at http://label-schema.org
ARG BUILD_DATE
ARG VCS_REF=local
ARG VERSION=local
LABEL   org.label-schema.schema-version="1.0" \
		org.label-schema.build-date=$BUILD_DATE \
	    org.label-schema.vcs-ref=$VCS_REF \
	    org.label-schema.version=$VERSION \
	    org.label-schema.name="Fritzbox Webhook Call-Logger" \
	    org.label-schema.vcs-url="https://github.com/justb81/fritzbox-webhook-call-logger" \
	    org.label-schema.vendor="ipunkt Business Solutions / Bastian Rang"

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

CMD [ "npm", "start" ]