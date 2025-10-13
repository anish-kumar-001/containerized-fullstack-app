# --- STAGE 1: BUILDER ---
# Use a full Node image for installing dependencies
FROM node:14 AS builder

WORKDIR /usr/src/app

# Copy package.json to install dependencies
COPY package*.json ./

# Install ALL dependencies (production and dev dependencies)
RUN npm install

# Copy all application source code
COPY . .


# --- STAGE 2: PRODUCTION (Final Image) ---
# Use a minimal Alpine-based image for the final runtime
FROM node:14-alpine

WORKDIR /usr/src/app

# Copy the essential application files
COPY package.json ./
COPY app.js ./

# Copy ONLY the dependencies from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Expose the application port
EXPOSE 5000

# Command to run the application (includes the 10s wait for MySQL)
CMD ["sh", "-c", "sleep 10 && node app.js"]