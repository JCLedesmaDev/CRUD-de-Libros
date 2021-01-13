if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

/*                Requerir los modulos instalados                */
const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

/*                Inicializaciones                */
const app = express(); //App es nuestro servidor
const mongoose = require("./database");

/*                Configuraciones del Servidor                */
// Si exist un puerto predefinido por el entorno, pues toma ese; Caso contrario arranca en el 4200
app.set("port", process.env.PORT || 4000);

//Configuracion de multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/subidas"),
  filename(req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
  //Luego ejecutamos multer con su respectiva configuracion
});

/*                Middlewares                */
app.use(morgan("dev"));

//Permite al servidor recibir y comprender imagenes
app.use(multer({ storage }).single("image"));

//Permite comprender los datos de un formulario y los convierte en un objeto JSON
app.use(express.urlencoded({ extended: false }));

//Permite enviar y recibir peticiones JSON (Utilizando formularios)
app.use(express.json());

//Conecta el back-end con el front-end
app.use(cors());

/*                Routes                */
app.use("/api/books", require("./routes/bookRoutes"));

/*                Archivos estaticos                */

//Definimos que carpeta (dentro del back) queremos que sea publica al navegador. Aqui irian archivos css,html,js, imagenes, todo lo que el navegador puede acceder para mostrarlo por pantalla y que no cambian.
app.use(express.static(path.join(__dirname, "public")));

/*                Inicializacion de servidor                */
app.listen(app.get("port"), () => {
  console.log(`Servidor en puerto ${app.get("port")}`);
});
