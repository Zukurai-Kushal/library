
class Book{

    constructor(title, author, pages, completed){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.completed = completed;
    }

    get info(){
        return (this.title + " by " + this.author + ", " + this.pages + " pages, " + (this.completed ? "read already" : "not read yet"));
    }
}

class Library{
    static BOOK_COLORS = ["#047857","#0e7490","#991b1b","#c2410c", "#9f1239"];
    static BOOK_FONTS = ['"Holtwood One SC", serif', '"Ultra", serif'];
    static READ_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="30px" viewBox="0 0 24 24"><title>book-open-variant-outline</title><path d="M12 21.5C10.65 20.65 8.2 20 6.5 20C4.85 20 3.15 20.3 1.75 21.05C1.65 21.1 1.6 21.1 1.5 21.1C1.25 21.1 1 20.85 1 20.6V6C1.6 5.55 2.25 5.25 3 5C4.11 4.65 5.33 4.5 6.5 4.5C8.45 4.5 10.55 4.9 12 6C13.45 4.9 15.55 4.5 17.5 4.5C18.67 4.5 19.89 4.65 21 5C21.75 5.25 22.4 5.55 23 6V20.6C23 20.85 22.75 21.1 22.5 21.1C22.4 21.1 22.35 21.1 22.25 21.05C20.85 20.3 19.15 20 17.5 20C15.8 20 13.35 20.65 12 21.5M11 7.5C9.64 6.9 7.84 6.5 6.5 6.5C5.3 6.5 4.1 6.65 3 7V18.5C4.1 18.15 5.3 18 6.5 18C7.84 18 9.64 18.4 11 19V7.5M13 19C14.36 18.4 16.16 18 17.5 18C18.7 18 19.9 18.15 21 18.5V7C19.9 6.65 18.7 6.5 17.5 6.5C16.16 6.5 14.36 6.9 13 7.5V19M14 16.35C14.96 16 16.12 15.83 17.5 15.83C18.54 15.83 19.38 15.91 20 16.07V14.57C19.13 14.41 18.29 14.33 17.5 14.33C16.16 14.33 15 14.5 14 14.76V16.35M14 13.69C14.96 13.34 16.12 13.16 17.5 13.16C18.54 13.16 19.38 13.24 20 13.4V11.9C19.13 11.74 18.29 11.67 17.5 11.67C16.22 11.67 15.05 11.82 14 12.12V13.69M14 11C14.96 10.67 16.12 10.5 17.5 10.5C18.41 10.5 19.26 10.59 20 10.78V9.23C19.13 9.08 18.29 9 17.5 9C16.18 9 15 9.15 14 9.46V11Z" /></svg>';
    static DELETE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="30px" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>';

    constructor(){
        this.myLibrary = [];
        this.libraryDOM = document.querySelector("main");
        this.addBookButton = document.querySelector("#add-book-button");
        this.newBookDialog = document.querySelector("#new-book-dialog");
        this.newBookForm = document.querySelector("#new-book-form");

        this.addBookButton.onclick = ()=> this.newBookDialog.showModal();
        this.newBookForm.addEventListener("submit", (e)=>{
            e.preventDefault();
            let formDataObject = Object.fromEntries(new FormData(this.newBookForm));
            let newBook = new Book(formDataObject.title, formDataObject.author, formDataObject.pages, (formDataObject.completed != undefined));
            this.addBook(newBook);
            this.newBookForm.reset();
            this.newBookDialog.close();
        });
    }

    addBook(book){

        const bookElement = document.createElement("div");
    
        bookElement.setAttribute("class", "book");
        bookElement.setAttribute("id", `bookID:${this.myLibrary.length}`);
        bookElement.style.setProperty("--book-color", Library.BOOK_COLORS[Math.floor(Math.random()*Library.BOOK_COLORS.length)]);
        bookElement.style.setProperty("--book-title-font", Library.BOOK_FONTS[Math.floor(Math.random()*Library.BOOK_FONTS.length)]);
    
        const verticalTitle = document.createElement("h1");
        verticalTitle.setAttribute("class", "vertical");
        verticalTitle.innerText = book.title;
        bookElement.appendChild(verticalTitle);
    
        const bookInfo = document.createElement("div");
        bookInfo.setAttribute("class", "hide");
        const title = document.createElement("h1");
        title.innerText = book.title;
        bookInfo.appendChild(title);
        const author = document.createElement("h3");
        author.innerText = "by "+book.author;
        bookInfo.appendChild(author);
        const pages = document.createElement("h3");
        pages.setAttribute("class", "pages");
        pages.innerText = book.pages + " Pages";
        bookInfo.appendChild(pages);
        const completedContainer = document.createElement("label");
        completedContainer.setAttribute("class", "completed-container");
        completedContainer.innerHTML = Library.READ_SVG;
        const completedCheckbox = document.createElement("input");
        completedCheckbox.setAttribute("type", "checkbox");
        completedCheckbox.setAttribute("name", "completed");
        completedCheckbox.setAttribute("id", `completedID:${this.myLibrary.length}`);
        completedCheckbox.onclick = ()=>{
            this.myLibrary[completedCheckbox.id.split(':')[1]].completed = completedCheckbox.checked;
        }
        completedCheckbox.checked = (book.completed)? true : false;
        completedContainer.appendChild(completedCheckbox)
        bookInfo.appendChild(completedContainer);
        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "delete-button");
        deleteButton.innerHTML = Library.DELETE_SVG;
        deleteButton.onclick = ()=>{
            let targetBook = deleteButton.closest(".book");
            this.myLibrary[targetBook.id.split(':')[1]] = undefined;
            targetBook.remove();
        }
        bookInfo.appendChild(deleteButton);
        bookElement.appendChild(bookInfo);
    
        this.libraryDOM.appendChild(bookElement);
    
        //Add to Library
        this.myLibrary.push(book);
    }
    
}

mainLibrary = new Library();

mainLibrary.addBook(new Book("Dune", "Frank Herbert", 412, true));
mainLibrary.addBook(new Book("The Hobbit", "J.R.R. Tolkien", 295, false));
mainLibrary.addBook(new Book("Tales of Dunk and Egg", "George R. R. Martin", 860, false));
mainLibrary.addBook(new Book("The Three-Body Problem", "Liu Cixin", 302, true));
mainLibrary.addBook(new Book("The Martian", "Andy Weir", 369, true));
mainLibrary.addBook(new Book("Sun and Steel", "Yukio Mishima", 104, false));

