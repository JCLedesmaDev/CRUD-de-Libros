//Importamos los estilos CSS
import "./styles/app.css";

//Importamos el archivo que interactua con el DOM
import UI from './UI.js';

//Obtenemos en el navegador, todos los datos de la base de datos por medio del metodo renderBooks
document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  ui.renderBooks();
});


//Obtenemos los elementos del formulario.- De este formulario, vamos a capturar el evento "submit". Para determinar como se va a comportar este evento, tenemos que utilizar una funcion
document.getElementById("book-form").addEventListener("submit", event => {

  //Aqui dentro vamos a capturar por medio de los "id" los valores que recibiran cada uno de los inputs del formulario y los almacenaremos en una constante

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;
  const image = document.getElementById('image').files;
  //PD: Es files debido a que no es un texto lo que queremos sino los archivos que estoy subiendo por medio de este input

  //Almacenamos todos los datos de arriba dentro de una variable
  const formData = new FormData();
  formData.append('image', image[0]);
  formData.append('title', title);
  formData.append('author', author);
  formData.append('isbn', isbn);

  //Definimos los metodos que interactuan con el DOM en UI.js, los traemos hasta aca para darle a cada uno de esos metodos el objeto "formData" como parametro
  const ui = new UI();
  ui.addNewBook(formData)

  //De esta manera cuando agereguemos los elementos nos aparecera un mensaje 
  ui.renderMessage("Libro agregado correctamente", "success", 3000)

  //Cuando completamos los inputs y le damos en guardar, podemos observar que no se guarda nada en la consola del navegador. Si utilizamos el metodo "preventDefault" evitamos esto y le cancelamos el evento por defecto.
  event.preventDefault()
})


//Eliminamos los elementos obtenidos de la base de datos
document.getElementById("books-cards").addEventListener("click", event => {
  //Si dentro de toda la clase "books-cards" contiene una clase llamda "delete"
  if (event.target.classList.contains("delete")) {

    //Utilizaremos la propiedad "_id" que posee el boton de cada elemento para eliminar todo el elemento por completo (Dicho "_id" fue asignado en el archivo "UI.js")

    const ui = new UI();
    ui.deleteBook(event.target.getAttribute("_id"))

    //De esta manera cuando eliminemos los elementos nos aparecera un mensaje 
    ui.renderMessage("Libro eliminado correctamente", "danger", 2000)
  }

  event.preventDefault()
})