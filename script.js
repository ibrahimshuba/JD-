// book class to get book details
class Book {
  constructor(bookcover, title, subtitle, allauthors, number_of_pages, description, id) {
    this.bookcover = bookcover;
    this.title = title;
    this.subtitle = subtitle;
    this.allauthors = allauthors;
    this.number_of_pages = number_of_pages;
    this.description = description;
    this.id = id;
  }
// store book details with json parse in local Storage 
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    } return books;
  }
  
  
//add book details to local storage and convert to json string
  static addBooks(book) {
    const books = Book.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

//remove book details from existing array from local storage
  static removeBook(id) {
    const books = Book.getBooks();

    books.forEach((book, index) => {
      if (book.id === id) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

//add book details to books-list id for content display
  static addBooksToList(book) {
    const list = document.querySelector('#books-list');

    const itemsList = document.createElement('li');

    itemsList.innerHTML = `
	
	<div class="row">
    <div class="card">
     
      <div class="container">
        <div class="vertical-menu">
		 <img src=" ${book.bookcover}">
		   <br/><label>Title</label> 
		<a>${book.title}</a>
		 <br/><label>Sub Title</label> 
		<a>${book.subtitle}</a>
		 <br/><label>Author(s)</label> 
		<a>${book.allauthors}</a>
		 <br/><label>Number of Pages</label> 
		<a>${book.number_of_pages}</a>
		 <br/><label>Description</label> 
		<a>${book.description}</a>
		<br>
        <button id=${book.id} type="submit" class="remove">Remove</button>
		</div>
		</div>
		<br>
	
        `;
//add new book at the end of the list
    list.appendChild(itemsList);
  }

//display each book added to books-list function
  static displayBooks() {
    const books = Book.getBooks();

    books.forEach((book) => Book.addBooksToList(book));
  }

//remove each book individually
  static deleteBook(target) {
    if (target.classList.contains('remove')) {
      target.parentElement.remove();
    }
  }
}
 // call event listener whenever book details are added
document.addEventListener('DOMContentLoaded', Book.displayBooks);

const form = document.querySelector('#books-form');
// Get form values after submit is successful
form.addEventListener('submit', () => {
  const bookcover = document.querySelector('#bookcover').value;
  const title = document.querySelector('#title').value;
  const subtitle = document.querySelector('#subtitle').value;
  const allauthors = document.querySelector('#allauthors').value;
  const number_of_pages = document.querySelector('#number_of_pages').value;
  const description = document.querySelector('#description').value;
  const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

//added book details to book class according to the defined values

  const book = new Book(bookcover,title, subtitle, allauthors, number_of_pages, description, id);

  Book.addBooksToList(book);
  Book.addBooks(book);

// reset for when book details are added

  form.reset();
});
// delete book details according to single element id
document.querySelector('#books-list').addEventListener('click', (e) => {
  Book.deleteBook(e.target);

  Book.removeBook(e.target.id);
});

//display webpages and web functions according to get element id
const addBookToList = document.getElementById('book-list');
const openForm = document.getElementById('open-form');
const openfeatured = document.getElementById('open-featured');
const addNew = document.getElementById('add_books');
const bookList = document.getElementById('books-list');
const featured = document.getElementById('featured');

//use class list to display attributes of book elements
function showForm() {
  addNew.classList.remove('none');
  bookList.classList.add('none');
  featured.classList.add('none');
}

function showBook() {
  bookList.classList.remove('none');
  addNew.classList.add('none');
  featured.classList.add('none');
}

function showfeatured() {
  featured.classList.remove('none');
  bookList.classList.add('none');
  addNew.classList.add('none');
}

// fire and activate events with click action to display functions
openForm.addEventListener('click', showForm);

addBookToList.addEventListener('click', showBook);

openfeatured.addEventListener('click', showfeatured);
