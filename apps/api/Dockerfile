FROM node:24-alpine

WORKDIR /app

# Copy workspace root package files
COPY ../../package*.json ./

# Copy API package.json
COPY package*.json ./apps/api/

# Install dependencies for workspace
RUN npm install

# Copy full source
COPY . .

WORKDIR /app/apps/api

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
