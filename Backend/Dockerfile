FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --ignore-scripts

COPY . .

EXPOSE 4500

CMD ["node", "--require", "ts-node/register", "./src/index.ts"]
