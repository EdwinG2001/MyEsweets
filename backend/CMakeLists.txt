cmake_minimum_required(VERSION 3.16)
project(MESweetsBackend CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Optimización en Release, debug info en Debug
if(CMAKE_BUILD_TYPE STREQUAL "Release")
    add_compile_options(-O2)
else()
    add_compile_options(-g)
endif()

# Deshabilitar errores estrictos de C en GCC 14+ para que libbcrypt compile
set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -Wno-implicit-function-declaration -Wno-int-conversion")

# ─── Dependencias ─────────────────────────────────────────────────────────────

# cpp-httplib (header-only, descargado via FetchContent)
include(FetchContent)

FetchContent_Declare(
    httplib
    GIT_REPOSITORY https://github.com/yhirose/cpp-httplib.git
    GIT_TAG        v0.15.3
)
FetchContent_MakeAvailable(httplib)

# nlohmann/json (header-only)
FetchContent_Declare(
    json
    GIT_REPOSITORY https://github.com/nlohmann/json.git
    GIT_TAG        v3.11.3
)
FetchContent_MakeAvailable(json)

# bcrypt para C++ (libbcrypt)
FetchContent_Declare(
    bcrypt
    GIT_REPOSITORY https://github.com/trusch/libbcrypt.git
    GIT_TAG        master
)
FetchContent_MakeAvailable(bcrypt)

# MySQL / MariaDB Connector C (100% compatible con MySQL API)
# En MSYS2: pacman -S mingw-w64-x86_64-mariadb-connector-c
# En Ubuntu: sudo apt install libmysqlclient-dev
if(WIN32)
    find_package(PkgConfig QUIET)
    if(PKG_CONFIG_FOUND)
        pkg_check_modules(MYSQLCLIENT QUIET libmariadb)
    endif()
    if(NOT MYSQLCLIENT_FOUND)
        # Buscar manualmente en rutas MSYS2/MinGW64
        find_path(MYSQLCLIENT_INCLUDE_DIRS mysql/mysql.h
            PATHS
                "C:/msys64/mingw64/include"
                "C:/msys64/mingw64/include/mariadb"
                "C:/Program Files/MySQL/MySQL Connector C 6.1/include"
        )
        find_library(MYSQLCLIENT_LIBRARIES
            NAMES mariadb libmariadb mysqlclient
            PATHS
                "C:/msys64/mingw64/lib"
                "C:/Program Files/MySQL/MySQL Connector C 6.1/lib"
        )
        set(MYSQLCLIENT_FOUND TRUE)
    endif()
else()
    find_package(PkgConfig REQUIRED)
    pkg_check_modules(MYSQLCLIENT REQUIRED mysqlclient)
endif()

# ─── Ejecutable ───────────────────────────────────────────────────────────────

add_executable(mesweets_server main.cpp)

target_include_directories(mesweets_server PRIVATE
    ${httplib_SOURCE_DIR}
    ${json_SOURCE_DIR}/include
    ${bcrypt_SOURCE_DIR}/include
    ${MYSQLCLIENT_INCLUDE_DIRS}
)

target_link_libraries(mesweets_server PRIVATE
    httplib::httplib
    nlohmann_json::nlohmann_json
    bcrypt
    ${MYSQLCLIENT_LIBRARIES}
    pthread
)

target_compile_definitions(mesweets_server PRIVATE
    CPPHTTPLIB_OPENSSL_SUPPORT=0
)

# ─── Instrucciones de Build ───────────────────────────────────────────────────
# Linux/Mac:
#   mkdir -p build && cd build
#   cmake .. -DCMAKE_BUILD_TYPE=Release
#   make -j$(nproc)
#   ./mesweets_server
#
# Windows (MinGW/MSYS2):
#   mkdir build && cd build
#   cmake .. -G "MinGW Makefiles" -DCMAKE_BUILD_TYPE=Release
#   mingw32-make
#   mesweets_server.exe
