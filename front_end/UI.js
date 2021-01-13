
//Importamos los servicios del navegador. Podemos hacerlo de esta manera (similar a nodejs) debido a que estamos trabajando con webpack
import BookService from "./services/BookServices";

//Instanciamos los servicios creados, teniendo acceso a sus metodos
const bookService = new BookService();

//Este modulo, nos permitira indicar el tiempo de hace cuanto fue creado
import { format } from "timeago.js";


class UI {

  //Aqui dentro tendremos todos losmetodos que interactuaran con el navegador

  async renderBooks() {

    //Almacenamos todos los datos obtenidos en una constante
    const books = await bookService.getBooks();

    //Definimos en donde queremos que aparezca
    const booksCardsContainer = document.getElementById("books-cards");

    //Definimos que el contenedor este limpio cada vez q iniciamos la aplicacion
    booksCardsContainer.innerHTML = "";

    //Todos los datos obtenidos, los vamos adividir en un item los cuales cada uno tendra un elemento div dentro
    books.forEach((book) => {
      //Creamos un elemento HTML con js
      const div = document.createElement("div")

      //Estilizamos el "div"
      div.className = "animated fadeInRight";
      //Especificamos que otros elementos puede tener el "div"
      div.innerHTML = `
      <div class="card m-2">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src="http://localhost:4000${book.imagePath}" class="img-fluid" alt="">
            </div>
            <div class="col-md-8">
                <div class="card-block px-2">
                    <h4 class="card-title">${book.title}</h4>
                    <p class="card-text">${book.author}</p>
                    <a href="#" class="btn btn-danger delete" _id="${book._id}">X</a>
                </div>
            </div>
        </div>
        <div class="card-footer w-100 text-muted">
          ${format(book.created_at)}
        </div>
      </div>
      `;

      //Le agregamos el elemento "div" incluyendo su contenido al contenedor de todos los libros
      booksCardsContainer.appendChild(div)

    });
  }

  async addNewBook(book) {
    await bookService.postBook(book)
    this.clearBookForm();
    this.renderBooks();
  }

  clearBookForm() {
    document.getElementById("book-form").reset();
  }

  renderMessage(message, colorMessage, secondsToRemove) {
    const div = document.createElement("div")
    div.className = `alert alert-${colorMessage} message`;

    //Vamos a crearle un texto, los cuales estara entre los dos elementos de arriba
    div.appendChild(document.createTextNode(message))


    //"querySelector" seleccionamos un elemento(ya sea id, class) del HTML
    const container = document.querySelector(".col-md-5")
    const bookForm = document.querySelector("#book-form")

    //De esta manera, especficamos que el "div" creado estara antes del 2do elemento seleccionado
    container.insertBefore(div, bookForm)

    //Hasta ahora, hemos añadido un mensaje de manera permanente, para que eso no suceda, utilizaremos un setTimeout q luego de un tiempo eliminara ese mensaje. En realidad eliminara por medio de una clase del elemento que contiene ese mensaje
    setTimeout(() => {
      document.querySelector(".message").remove()
    }, secondsToRemove);
  }

  async deleteBook(bookId) {
    await bookService.deleteBook(bookId)
    this.renderBooks();
  }
}

export default UI;