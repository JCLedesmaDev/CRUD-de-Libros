const { Schema, model } = require("mongoose")

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },

  //Isbn es el id de un libro
  isbn: { type: String, required: true },

  //Vamos a tener en el esquema, la direccion de la imagen 
  imagePath: { type: String },

  //Fecha de creacion
  created_at: { type: Date, default: Date.now }
  /* En caso de que no ingrese un dato de creacion, va a tener por defecto la fecha del momento */
})

//Para utilizar este esquema de dato en otros archivos, vamos a exportarlo utilizando el metodo "model" de mongoose con el cual le brindaremos un nombre.
module.exports = model("BookModel", BookSchema)