# CRUD de Libros


- Crear archivo ".env" para almacenar URL de la BD bajo el nombre de: "MONGODB_URI"

- Package.json: 
  => npm run build: Para empaquetar todo el codigo con Webpack.
  => npm start: Para dar inicio el codigo ya desplegado.
  => npm run dev: Iniciar servidor de desarrollo (junto con mongod)
  => npm run server:dev : Iniciar servidor de webpack

- Dentro del Front-End:
  => Carpeta "Services"/"BookServices.js": Para realizar las peticiones AJAX/Fetch al Back-End.

  => Archivo UI.js: En conjunto con "BookServices.js", creamos los metodos a ejecutar en el Front-End (DOM).

  => Archivo App.js: Ejecutamos los metodos creados anteriormente. 

