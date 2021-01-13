const { Router } = require("express");
const router = Router();

//Este modulo se encarga de trabajar con archivos (en este caso imagenes)
const fs = require("fs-extra")

const path = require("path")

//Re utilizamos el modelo de datos que componen a un libro
const ModelsBook = require("../models/modelsBook")



//Cuando el navegador haga una peticion a la ruta en especifico del servidor. El servidor va a responder mandando el siguiente mensaje.

router.get("/", async (req, res) => {
  const books = await ModelsBook.find();
  res.json(books)
});

router.post("/", async (req, res) => {
  //Req.body => Es todo el contenido que envio el navegador al servidor

  //Extraemos esos datos del "req.body"
  const { title, author, isbn } = req.body;

  //A la imagen, no la recibimos por "req.body" sino por "req.file"
  const imagePath = "/subidas/" + req.file.filename;

  //Generamos una clase con los datos que extragimos
  const newBook = new ModelsBook({ title, author, isbn, imagePath })
  console.log(newBook)
  //Utilizamos un  metodo "save()" para que se guarde el titulo,autor,isbn y el nombre de la imagen en el servidor
  await newBook.save()

  //Res.json => Es el mensaje de respuesta que le da el servidor al navegador
  res.json({ "mensaje": "Libro guardado" })
})

router.delete("/:id", async (req, res) => {
  const book = await ModelsBook.findByIdAndDelete(req.params.id)

  //De esta manera, ademas de eliminar los elementos en la base de datos. Eliminamos la imagenes de dichos elementos de la carpeta "public"
  fs.unlink(path.resolve("./back_end/public" + book.imagePath))
  res.json({ "mensaje": "Libro eliminado" })
})

//Podriamos ver los libros eliminados si los almacenamos en una constante y luego lo guardamos en ella (mezcla de las 2 primeras rutas y por ultimo las llamamos con peticion get)

module.exports = router;