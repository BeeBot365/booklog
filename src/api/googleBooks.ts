import { Book } from "../db/books/data/book.types";

// Här ska vi hämta data från api:et och mappa om det till vårt Book interface.
const BASE_URL = "https://www.googleapis.com/books/v1/volumes?q=";
const MAX_RESULTS = 10;
const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

export async function fetchBooks(title: string, startIndex: number = 0) {
  try {
    const response = await fetch(
      `${BASE_URL}intitle:${title}&maxResults=${MAX_RESULTS}&startIndex=${startIndex}&key=${apiKey}`
    );

    const data: any = await response.json();
    if (!data.items) return [];

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
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

const BOOK_BY_ID_URL = "https://www.googleapis.com/books/v1/volumes/";

export async function fetchBookById(id: string): Promise<Book | null> {
  try {
    const res = await fetch(`${BOOK_BY_ID_URL}${id}`);
    const data = await res.json();
    if (!data || data.error) return null;

    return {
      id: data.id,
      title: data.volumeInfo?.title ?? "No title",
      description: data.volumeInfo?.description ?? "No description available",
      authors: data.volumeInfo?.authors?.map((name: string) => ({ name })) ?? [
        { name: "Unknown Author" },
      ],
      imageUrl: data.volumeInfo?.imageLinks?.thumbnail ?? "",
      infoUrl: data.volumeInfo?.infoLink ?? "",
      numberOfPages: data.volumeInfo?.pageCount ?? 0,
    };
  } catch {
    return null;
  }
}
