# masterbikes-app/frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copia el package.json para instalar dependencias primero
COPY package*.json ./
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto y arranca la aplicación de React
EXPOSE 3000
CMD ["npm", "start"]