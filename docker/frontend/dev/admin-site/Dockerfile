# Use an official Node.js runtime as the base image
FROM node:20-bullseye-slim AS frontend-dev

# Set the working directory
WORKDIR /app/frontend/

# Install dependencies
COPY ./frontend/admin-site/package.json ./frontend/admin-site/package-lock.json ./
RUN npm install 

# Expose the development server port
EXPOSE 3000

# Start the Next.js development server
CMD ["npm", "run", "dev", "--prefix", "admin-site"]
