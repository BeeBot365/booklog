import { Book } from "../db/books/data/book.types";

// Här ska vi hämta data från api:et och mappa om det till vårt Book interface.
const BASE_URL = "https://www.googleapis.com/books/v1/volumes?q=";
const MAX_RESULTS = 10;

export async function fetchBooks(title: string, startIndex: number = 0) {
  try {
    const response = await fetch(
      `${BASE_URL}intitle:${title}&maxResults=${MAX_RESULTS}&startIndex=${startIndex}`
    );
    const data: any = await response.json();
    const books: Book[] = data.items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title,
      description: item.volumeInfo.description || "No description available",
      authors: item.volumeInfo.authors
        ? item.volumeInfo.authors.map((name: string) => ({ name }))
        : [{ name: "Unknown Author" }],
      imageUrl: item.volumeInfo.imageLinks?.thumbnail || "",
      infoUrl: item.volumeInfo.infoLink || "",
      numberOfPages: item.volumeInfo.pageCount || 0,
    }));
    console.log(books);
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

// Mappa om datan till vårt Book interface
// const books: Book[] = data.items.map((item: any) => ({
//   id: item.id,
//   title: item.volumeInfo.title,
//   description: item.volumeInfo.description,
//   authors: item.volumeInfo.authors || [],
//   publishedDate: item.volumeInfo.publishedDate,
//   thumbnail: item.volumeInfo.imageLinks?.thumbnail,
// }));
