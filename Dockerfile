# Usa una imagen base de Node.js con PostgreSQL cliente
FROM node:18.9

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json a la imagen
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install
RUN npm rebuild

# Copia el resto de los archivos de la aplicación a la imagen
COPY . .

# Expón el puerto en el que tu aplicación se ejecutará (ajusta según tu configuración)
EXPOSE 3000
RUN npm rebuild bcrypt --build-from-source
# Comando para iniciar tu aplicación (ajusta según tu configuración)
CMD ["npm", "start"]
