# Use official Node.js image from Docker Hub as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if it exists) into the container
COPY package*.json ./

# Install dependencies (including dev dependencies)
RUN npm install --production

# Copy the rest of your application code into the container
COPY . .

# Expose the port your app will run on (typically 3000 for Express)
EXPOSE 3000

# Set environment variables (if needed for PostgreSQL, Cloudinary, etc.)
# This is a sample; replace with your actual credentials
ENV DATABASE_URL=postgresql://user:password@host:5432/dbname
ENV CLOUDINARY_CLOUD_NAME=your_cloud_name
ENV CLOUDINARY_API_KEY=your_api_key
ENV CLOUDINARY_API_SECRET=your_api_secret

# Command to run the app (assuming you use TypeScript)
CMD ["npm", "run", "start"]
