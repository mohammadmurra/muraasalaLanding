# Multi-stage build for Muraasala landing page
# Build stage: install dependencies and build the static site
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files first to install dependencies
COPY package*.json ./

# Install exact dependencies
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the production static files
RUN npm run build

# ---
# Production stage: serve the static files with nginx
FROM nginx:alpine

# Copy built site from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Use the default nginx entrypoint