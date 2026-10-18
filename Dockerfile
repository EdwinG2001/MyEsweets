FROM ubuntu:22.04

# Evitar interrupciones durante la instalación
ENV DEBIAN_FRONTEND=noninteractive

# Instalar herramientas de compilación, CMake y librerías de conexión
RUN apt-get update && apt-get install -y \
    cmake \
    g++ \
    make \
    git \
    pkg-config \
    libssl-dev \
    libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar todo el proyecto al contenedor
COPY . .

# Compilar el backend usando CMake
WORKDIR /app/backend
RUN mkdir -p build && cd build && cmake .. && make

# Exponer el puerto por defecto (Render asignará el puerto dinámicamente mediante la variable PORT)
EXPOSE 8085

# Comando para iniciar el servidor compilado
CMD ["./build/mesweets_server"]
