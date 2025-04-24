# Development stage
FROM node:20-alpine AS development

WORKDIR /app

# Install the correct Angular CLI version for Angular v18
RUN npm install -g @angular/cli@^18.0.0

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port for development server
EXPOSE 4200

# Command to start the development server with hot reload
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]

# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Install the correct Angular CLI version for Angular v18
RUN npm install -g @angular/cli@^18.0.0

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application for production
RUN ng build --configuration production

# Production stage
FROM nginx:alpine AS production

# Copy the build output to replace the default nginx contents
COPY --from=build /app/dist/*/browser /usr/share/nginx/html

# Copy custom nginx configuration if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]