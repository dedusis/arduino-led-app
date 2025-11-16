FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npx tsc --noEmit || true   
RUN npm run build

FROM node:20

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

EXPOSE 8100

CMD ["serve", "-s", "dist", "-l", "8100"]