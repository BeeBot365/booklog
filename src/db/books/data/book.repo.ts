import { Book, DbBook } from "./book.types";
import * as SQLite from "expo-sqlite";
// Logik för att hantera databas operationer.

//Hämta alla böcker.
export async function getAllBooks(db: SQLite.SQLiteDatabase) {
  const results = await db.getAllAsync<DbBook>("SELECT * FROM books;");
  if (!results || results.length === 0 || results === undefined) {
    return [];
  }
  return mapDbBooksToBooks(results);
}

// Hämta en bok med id.
export async function getBookById(db: SQLite.SQLiteDatabase, id: string) {
  const result = await db.getFirstAsync<DbBook | undefined>(
    `SELECT * FROM books WHERE id = ?;`,
    [id]
  );
  if (!result) {
    return null;
  }
  return mapDbBookToBook(result);
}

//Lägg till en bok.
export async function addBook(db: SQLite.SQLiteDatabase, book: Book) {
  try {
    const result = await db.runAsync(
      `INSERT INTO books (id, title, description, author, imageUrl, infoUrl, numberOfPages)` +
        `VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        book.id,
        book.title,
        book.description,
        book.authors.map((author) => author.name).join(", "),
        book.imageUrl,
        book.infoUrl,
        book.numberOfPages,
      ]
    );
    console.log("Book added with id:", result.lastInsertRowId.toLocaleString());
  } catch (error) {
    console.error("Error adding book:", error);
  }
}

//Ta bort en bok.
export async function deleteBook(db: SQLite.SQLiteDatabase, id: string) {
  try {
    const result = await db.runAsync(`DELETE FROM books WHERE id = ?;`, [id]);
    if (!result || result.changes <= 0) {
      return false;
    }
    console.log("Book deleted with id:", id);
    return true;
  } catch (error) {
    console.error("Error deleting book:", error);
  }
}

// Mappa om Från objekt jag får från databasen till Book interface.
function mapDbBookToBook(dbBook: DbBook): Book {
  return {
    id: dbBook.id,
    title: dbBook.title,
    description: dbBook.description,
    authors: dbBook.authors
      ? dbBook.authors.split(", ").map((name) => ({ name }))
      : [],
    imageUrl: dbBook.imageUrl,
    infoUrl: dbBook.infoUrl,
    numberOfPages: dbBook.numberOfPages,
  };
}

// Mappa en lista med DbBooks till Books
function mapDbBooksToBooks(dbBooks: DbBook[]): Book[] {
  const books = dbBooks.map(mapDbBookToBook);
  return books;
}
