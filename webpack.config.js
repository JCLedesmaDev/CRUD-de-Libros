//Nos permite utilizar el objeto "path" para indicar la ubicacion de archivos
const path = require("path");

//Nos permite convertir archivo html para que se pueda leer en webpack
const HtmlWebpackPlugin = require("html-webpack-plugin");

//Nos permite convertir archivos CSS
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== "production";

//Tenemos que especificar primero, en donde estara el codigo origen de nuestros archivos del front-end de desarrollo, para ello escribiremos lo siguiente

module.exports = {
  //Indica en donde esta nuestro archivo principal del front-end.
  entry: "./front_end/app.js",
  mode: "production",
  //Indica a donde mandara el codigo convertido del front-end.
  output: {
    //Indicamos la direccion
    path: path.join(__dirname, "back_end/public"),
    //Indicamos el nombre que tendra el archivo del codigo JS convertido
    filename: "js/bundle.js",
  },

  //Archivo CSS
  module: {
    rules: [
      {
        //Examine todos los archivos terminados en .css
        test: /\.css/,

        //Una vez examinados, utilice un modulo
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
    ],
  },

  //Configuraciones del WebPack en HTML
  plugins: [
    new HtmlWebpackPlugin({
      //Ubicacion del archivo html del "front-end" para luego convertirlo
      template: "./front_end/index.html",

      //Confi. para minimificar el codigo de html (reducir tamaño)
      minify: {
        //Quitar todos los espacios en blanco q posee el html
        collapseWhitespace: true,
        //Quitar todos los comentarios
        removeComments: true,
        //Quitar el codigo redundante del html
        removeRedundantAttributes: true,
        //Quite el tipo de los atributos del script que colguemos en el html
        removeScriptTypeAttributes: true,
        //Quitar la etiqueta "link" de los estilos del html
        removeStyleLinkTypeAttributes: true,

        useShortDoctype: true,
      },
    }),


    new MiniCssExtractPlugin({
      //Indicamos el nombre que tendra el archivo del codigo CSS convertido
      filename: "css/bundle.css",
    }),
  ],

  //Permite ver en que linea de codigo hemos cometido un error
  devtool: "source-map",
};

/*A partir de ahora, cuando minimifiquemos el codigo.

Se nos van a generar dentro de la carpeta "public" archivos CSS (bundle.css) y JS (bundle.js), con sus respectivas carpetas C/U. Las cuales ambos archivos estaran enlazados en el archivo HTML (index.html).

Por otra parte, cuando estemos desarrollando codigo HTML, CSS y JS en el "Front-End".
Vamos a tener que requerir los archivos  CSS dentro del JavaScript en vez del llamarlo en el archivo "index.html"
*/
