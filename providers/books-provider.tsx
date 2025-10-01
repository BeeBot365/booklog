import {
  addBook,
  deleteBook,
  getAllBooks,
} from "@/src/db/books/data/book.repo";
import { Book } from "@/src/db/books/data/book.types";
import { useSQLiteContext } from "expo-sqlite";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContextValue {
  books: Book[];
  addBookToContext: (book: Book) => void;
  getbookById: (id: string) => Book | undefined;
  deleteBookFromContext: (id: string) => Promise<Book | null | undefined>;
}

//Skapa kontexten.
const bookContext = createContext({} as ContextValue);
export default function BooksProvider(props: PropsWithChildren) {
  const db = useSQLiteContext();
  const [books, setBooks] = useState<Book[]>([]);

  // UseEffect för att sätta värdena i contexten från sqlite vid start.
  useEffect(() => {
    const fetchBooksFromDb = async () => {
      try {
        const booksFromDb = await getAllBooks(db);
        setBooks(booksFromDb);
      } catch (error) {
        console.error("Error fetching books from database:", error);
      }
    };
    fetchBooksFromDb();
  }, []);

  // En metod för att lägga till en bok.
  const addBookToContext = async (book: Book) => {
    if (books.find((b) => b.id === book.id)) {
      return; // om boken redan finns, gör inget. Eller returnera ett felmeddelande. TODO
    }
    try {
      await addBook(db, book);
      setBooks((prevBooks) => [...prevBooks, book]);
      console.log("Book added to context:", book.title);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // Metod för att hämta en bok
  const getbookById = (id: string) => {
    return books.find((book) => book.id === id);
  };

  //Metod för att ta bort en bok
  const deleteBookFromContext = async (id: string) => {
    try {
      const book = getbookById(id);
      if (!book) return null;

      const result = await deleteBook(db, book.id);
      if (result) {
        setBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id));
        console.log("Book deleted from context:", book.id);
        return book;
      }
      return null;
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <bookContext.Provider
      value={{ books, addBookToContext, getbookById, deleteBookFromContext }}
    >
      {props.children}
    </bookContext.Provider>
  );
}

export const useBooksContext = () => {
  return useContext(bookContext);
};
