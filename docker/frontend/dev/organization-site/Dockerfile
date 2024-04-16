FROM node:20-bullseye-slim AS frontend-dev

WORKDIR /app/frontend/

COPY ./frontend/organization-site/package.json ./
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev", "--prefix", "organization-site"]
