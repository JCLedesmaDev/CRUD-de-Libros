class BookService {

  //Es un metodo tipico que se va a ejecutar cada vez que instaciemos la clase
  constructor() {

    //Definimos las variables que utilizara nuestra clase

    //Almacenamos en una variable la URL hacia donde tendra que mandar las peticiones
    this.URI = "http://localhost:4000/api/books";
  }

  //Definimos los metodos que utilizara nuestra clase

  async getBooks() {

    //Utilizamos el metodo "fetch" de JS para que le haga una peticion a "this.URI". Si no posee nada en especifico, por defecto realiza una peticion get al back-end.
    const response = await fetch(this.URI);

    //Lo que me devuelve el servidor, no son los datos tal cuales como se ven en el navegador sino un "string legible", por lo que debemos convertir ese string de "response" en un formato json.
    const books = await response.json();
    return books;
  }

  async postBook(book) {
    const res = await fetch(this.URI, {
      //Describiremos que peticion y datos le mandaremos al servidor
      method: 'POST',
      body: book

      //Aqui no va "headers" tmb, debido a que no solamente vamos a enviar mensaje json, sino imagenes
    });
    //Esto le envia datos al back-end para que los guarde
    const data = await res.json()
    console.log(data)
  }

  async deleteBook(bookId) {
    //Aqui le mandamos la URL + el Id del libro a eliminar, seguido del metodo y por ultimo, que tipo de datos le voy a enviar para eliminar
    const res = await fetch(`${this.URI}/${bookId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();

    console.log(data)
  }
}

export default BookService;