# Proyecto

## Datos
Este proyecto fue generado con las siguientes caracteristicas:

- Angular CLI versión 14.2.1.
- NPM versión 8.11.0
- Node.js versión 16.15.1
- Compodoc para la documentación del proyecto
- Bootstrap
- Meterial Design

## Instrucciones

- Descargar e instalar node.js para ejecutar comandos npm
- Instalar Angular CLI con el siguiente comando `npm install -g @angular/cli`
- Clonar proyecto desde el repositorio en GitHub con el comando `git clone https://github.com/shelvinbb903/PruebaTecnicaTekus.git` o bien puede usar la herramiento visual de GitHub que le permita clonar el proyecto en su equipo.
- Despues de clonar el proyecto acceder a la carpeta con el comando `cd` desde una terminal de comandos.
- Instalar las dependencias de node usa el comando `npm install`
- Ejecutar comando `ng serve` para comenzar a realizar pruebas. Por defecto se usa la url `http://localhost:4200/`.

## Documentación

Se generó documentación del codigo fuente con la librería Compodoc. Esta librería permite generar archivos html, css, javascript con filtro de busqueda y la estructura del proyecto desarrollado a partir de los comentarios agregados en los metodos, variables, constantes, interfaces, clases, entre otros.

### Instrucciones para generar documentación

- Usar el `npx compodoc -p tsconfig.doc.json`. Para mayor facilidad se puede configurar un alias para este comando en el archivo package.json en el objeto asignado al atributo scripts. Para este proyecto se agregó el alias compodoc y se puede ejecutar el siguiente comando `npm run compodoc`.

- Al ejecutar el anterior comando se genera una carpeta documentation (por defecto es documentation, pero se puede agregar otro nombre). 

- Teniendo la carpeta se ejecuta en un servidor para ver la pagina genera en la documentación. Para este proyecto se agregó el alias compodoc y se puede ejecutar el siguiente comando `npm run compodoc-server` o `npm run compodoc-es` para tener los textos del menú en español.