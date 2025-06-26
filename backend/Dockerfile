# backend/Dockerfile
    FROM node:18-alpine

    WORKDIR /app

    # Copia los archivos de dependencias e instálalas
    COPY package*.json ./
    RUN npm install

    # Copia el resto del código del backend
    COPY . .

    # Expone el puerto y arranca el servidor
    EXPOSE 8000
    CMD ["node", "server.js"]
    