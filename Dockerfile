# 1. Use a specific, small version of Node
FROM node:20-alpine

# 2. Set the working directory
WORKDIR /app

# 3. Copy package files and install using the "lock" file
COPY package*.json ./
RUN npm ci

# 4. Copy the rest of your website code
COPY . .

# 5. Make sure the upload folder for perfume images exists
RUN mkdir -p public/images

# 6. Set production mode and expose the port
ENV NODE_ENV=production
EXPOSE 3000

# 7. Use server.js because that’s where your app.listen is!
CMD ["node", "server.js"]
