FROM node
WORKDIR /app
# install deps
COPY package.json .
COPY package-lock.json .
RUN npm install

# copy the site data
COPY . .
# expose a port for viewing
EXPOSE 3000
# run the site
CMD ["npm", "start"]