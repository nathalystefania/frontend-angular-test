# Frontend Angular Test para 3IT

Este proyecto fue generado utilizando [Angular CLI](https://github.com/angular/angular-cli).

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado *Node.js* y *npm*, así como *Angular CLI*. Puedes verificar si ya los tienes instalados ejecutando los siguientes comandos en tu terminal:

```bash
node -v
npm -v
ng version
```

## Instalación de dependencias

Si es la primera vez que trabajas en este proyecto, o si has clonado el repositorio en un entorno nuevo, necesitas instalar las dependencias del proyecto. Ejecuta el siguiente comando en el directorio raíz del proyecto:

```bash
npm install
```
Esto descargará todas las dependencias necesarias para el proyecto según lo especificado en el archivo `package.json`.


## Configuración del entorno

1. Copia el archivo `.env.example` y renómbralo a `.env`.
2. Completa las variables con los valores correspondientes.
3. ¡Listo! Tu entorno estará configurado. 🚀

## Servidor de desarrollo

Para iniciar un servidor de desarrollo local, ejecuta:

```bash
ng serve
```

Una vez que el servidor esté en ejecución, abre tu navegador y navega a `http://localhost:4200/`. Si ese puerto está en uso, la terminal te indicará en qué puerto estará disponible la aplicación. La aplicación se recargará automáticamente cada vez que modifiques alguno de los archivos fuente.

## Compilación

Para compilar el proyecto para producción, ejecuta:

```bash
ng build --prod
```

Esto compilará tu proyecto y guardará los archivos resultantes en el directorio `dist/`. La compilación optimiza tu aplicación para mejorar el rendimiento y la velocidad.
