//Requerimos modulo de MongoDB
const mongoose = require("mongoose");

//Almacenamos en una constante la variable de entorno de nuestra BD 
const URI = process.env.MONGODB_URI;

//Configuracion de la BD
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Utilizamos un metodo del modulo mongoose y le damos como parametros la URL y su Configuracion
mongoose.connect(URI, options)
  .then((db) => console.log("El servidor se ha conectado a la base de datos "))
  .catch((err) => console.error(err));

module.exports = mongoose;

