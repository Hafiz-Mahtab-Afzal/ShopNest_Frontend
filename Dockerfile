

FROM node:24.11.0
WORKDIR /client.ui
COPY package.json package-lock.json /client.ui/
RUN npm ci
COPY . /client.ui/
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]