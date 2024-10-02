FROM node:18-alpine AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todo el código fuente al contenedor
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Usar una imagen ligera de servidor web (Nginx) para servir la aplicación
FROM nginx:stable-alpine

# Copiar los archivos de build a la carpeta donde Nginx sirve los archivos
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto 80 para acceder a la aplicación
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
