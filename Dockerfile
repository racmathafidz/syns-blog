FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache make gcc g++ python3
RUN npm cache clean --force

COPY package*.json ./

RUN npm install --omit=dev  --verbose

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
