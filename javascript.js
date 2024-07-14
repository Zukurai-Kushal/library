const myLibrary = [];

function Book(title, author, pages, completed){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.completed = completed;

    this.info = function(){
        infoMsg = this.title + " by " + this.author + ", " + this.pages + " pages, " + (this.completed ? "read already" : "not read yet");
        return infoMsg;
    }
}

function addBookToLibrary(book){
    myLibrary.push(book);
}

function addBookToDom(book){
    
}

theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
console.log(theHobbit.info());
console.log(Object.getPrototypeOf(theHobbit));