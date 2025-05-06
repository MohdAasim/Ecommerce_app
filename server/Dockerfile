# Use Node.js LTS base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install deps
COPY package*.json ./
RUN npm install

# Copy all app files
COPY . .


# Expose port
EXPOSE 5000

# Start app
CMD ["npm", "run", "dev"]

