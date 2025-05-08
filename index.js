const express = require("express");
const cors = require("cors");
const app = express();
const {initializeDatabase} = require("./db/db.connect")
app.use(cors());
app.use(express.json());

const Books = require("./books.model")
initializeDatabase();

async function createBook(newBook) {
  try {
    const book = new Books(newBook);
    const saveBook = await book.save();
    return saveBook;
    console.log(saveBook)
  } catch (error) {
    throw error
  }
};


app.post("/books", async (req,res) =>{
try{
 const savedBook = await createBook(req.body)
 res.status(201).json({message: "Book added successfully.", book: savedBook})
}catch(error){
res.status(500).json({error: "Failed to add book."})
}
});

async function readAllBooks() {
  try {
    const allBooks = await Books.find()
    return allBooks
  } catch (error) {
    throw error
  }
}

app.get("/books", async(req, res) =>{
  try{
    const books = await readAllBooks()
    if(books.length != 0){
      res.json(books)
    } else{
      res.status(404).json({error: "No books found."})
    }
   }catch(error){
   res.status(500).json({error: "Failed to fetch books."})
   }
})


async function readBookByTitle(bookTitle){
  try {
    const book = Books.findOne({title: bookTitle})
    return book
  } catch (error) {
    throw error
  }
}

app.get("/books/:bookTitle", async(req, res) =>{
  try{
    const book = await readBookByTitle(req.params.bookTitle)
    if(book){
      res.json(book)
    } else{
      res.status(404).json({error: "No books found."})
    }
   }catch(error){
   res.status(500).json({error: "Failed to fetch books by title."})
   }
})

async function readBooksByAuthor(bookAuthor){
  try {
    const booksByAuthor = Books.find({author: bookAuthor})
    return booksByAuthor
  } catch (error) {
    throw error
  }
}

app.get("/books/authors/:bookAuthor", async(req, res) =>{
  try{
    const books = await readBooksByAuthor(req.params.bookAuthor)
    if(books.length != 0){
      res.json(books)
    } else{
      res.status(404).json({error: "No books found."})
    }
   }catch(error){
   res.status(500).json({error: "Failed to fetch books by author."})
   }
})

async function readBooksByYear(bookYear){
  try {
    const booksByyear = Books.find({publishedYear: bookYear})
    return booksByyear
  } catch (error) {
    throw error
  }
}

app.get("/books/published/:bookYear", async(req, res) =>{
  try{
    const books = await readBooksByYear(req.params.bookYear)
    if(books.length != 0){
      res.json(books)
    } else{
      res.status(404).json({error: "No books found."})
    }
   }catch(error){
   res.status(500).json({error: "Failed to fetch books by year."})
   }
})


async function readBooksByGenre(bookGenre){
  try {
    const booksByGenre = Books.find({genre: bookGenre})
    return booksByGenre
  } catch (error) {
    throw error
  }
}

app.get("/books/genre/:bookGenre", async(req, res) =>{
  try{
    const books = await readBooksByGenre(req.params.bookGenre)
    if(books){
      res.json(books)
    } else{
      res.status(404).json({error: "No books found."})
    }
   }catch(error){
   res.status(500).json({error: "Failed to fetch books by genre."})
   }
})


async function updateBookbyId(bookId, dataToUpdate) {
  try {
    const   bookToUpdate = await Books.findByIdAndUpdate(bookId, dataToUpdate, {new: true});
    return bookToUpdate;
  } catch (error) {
    console.log("Error in updating book rating.", error);
  }

}

app.post("/books/:bookId", async (req,res) =>{
  try {
    const updatedBook  = await updateBookbyId(req.params.bookId, req.body)
    if(updatedBook){
      res.status(200).json({message: "Book updated successfully."})
    }else{ res.status(404).json({error: "Book not found."})}
  } catch (error) {
    res.status(500).json({error: "Failed to update book."})
  }
});

async function updateBookbyTitle(bookTitle, dataToUpdate) {
  try {
    const   bookToUpdate = await Books.findOneAndUpdate( {title: bookTitle}, dataToUpdate, {new: true});
    return bookToUpdate;
  } catch (error) {
    console.log("Error in updating book rating.", error);
  }

}

app.post("/books/titles/:bookTitle", async (req,res) =>{
  try {
    const updatedBook  = await updateBookbyTitle(req.params.bookTitle, req.body)
    if(updatedBook){
      res.status(200).json({message: "Book updated successfully.", book: updatedBook})
    }else{ res.status(404).json({error: "Book not found."})}
  } catch (error) {
    res.status(500).json({error: "Failed to update book."})
  }
})

async function deleteBookbyId(bookId) {
  try {
    const   deletedBook = await Books.findByIdAndDelete(bookId)
    return deletedBook
  } catch (error) {
    console.log(error);
  }

}

app.delete("/books/:bookId", async (req,res) =>{
  try {
    const deleteBook  = await deleteBookbyId(req.params.bookId)
      res.status(200).json({message: "Book deleted successfully."})
  } catch (error) {
    res.status(500).json({error: "Failed to delete book."})
  }
})
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});