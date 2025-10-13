# Use the official Nginx image
FROM nginx:alpine

# Copy the frontend files into the Nginx public folder
# The full content from your initial file was 'COPY . /usr/share/nginx/html'
COPY . /usr/share/nginx/html

# Expose port 80 for serving the frontend
EXPOSE 80

# Command to run Nginx (this is the default in the Nginx image)
CMD ["nginx", "-g", "daemon off;"]