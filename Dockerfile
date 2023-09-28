# Base image
FROM node:18.16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React application
RUN npm run build

# Expose the port on which the application will run
EXPOSE 3000

# Set the command to start the application
CMD ["npm", "start"]