# --- Etapa 1: Construir el Frontend ---
# Usamos una imagen ligera de Node.js para la construcción
FROM node:18-alpine AS build-stage

# Establecemos el directorio de trabajo para el frontend
WORKDIR /app/frontend

# Copiamos los archivos de dependencias e instalamos todo
COPY frontend/package*.json ./
RUN npm install

# Copiamos el resto del código del frontend y lo compilamos
COPY frontend/ .
RUN npm run build

# --- Etapa 2: Preparar y ejecutar el Backend ---
# Usamos una imagen slim para producción, es más segura y ligera
FROM node:18-slim AS production-stage

# Establecemos el directorio de trabajo principal
WORKDIR /app

# Copiamos las dependencias del backend e instalamos solo lo de producción
COPY backend/package*.json ./
RUN npm install --omit=dev

# Copiamos el código del backend
COPY backend/ .

# Copiamos el frontend ya compilado desde la etapa anterior
COPY --from=build-stage /app/frontend/dist ./frontend/dist

# Exponemos el puerto que usa nuestro servidor Express
EXPOSE 8080

# El comando final para iniciar el servidor cuando el contenedor se ejecute
CMD [ "node", "server.js" ]
