// Interface typen book.

export interface Book {
  id: string;
  title: string;
  authors: Author[];
  imageUrl: string;
  infoUrl: string;
  numberOfPages: number;
}

export interface Author {
  name: string;
}

export const mockedbooks: Book[] = [
  {
    id: "1",
    title: "Harry Potter and the Philosopher's Stone",
    authors: [{ name: "J.K. Rowling" }],
    imageUrl: "https://covers.openlibrary.org/b/id/7888781-L.jpg",
    infoUrl:
      "https://en.wikipedia.org/wiki/Harry_Potter_and_the_Philosopher%27s_Stone",
    numberOfPages: 223,
  },
  {
    id: "2",
    title: "Harry Potter and the Chamber of Secrets",
    authors: [{ name: "J.K. Rowling" }],
    imageUrl: "https://covers.openlibrary.org/b/id/8225631-L.jpg",
    infoUrl:
      "https://en.wikipedia.org/wiki/Harry_Potter_and_the_Chamber_of_Secrets",
    numberOfPages: 251,
  },
  {
    id: "3",
    title: "Harry Potter and the Prisoner of Azkaban",
    authors: [{ name: "J.K. Rowling" }],
    imageUrl: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
    infoUrl:
      "https://en.wikipedia.org/wiki/Harry_Potter_and_the_Prisoner_of_Azkaban",
    numberOfPages: 317,
  },
  {
    id: "4",
    title: "Harry Potter and the Goblet of Fire",
    authors: [{ name: "J.K. Rowling" }],
    imageUrl: "https://covers.openlibrary.org/b/id/7884866-L.jpg",
    infoUrl:
      "https://en.wikipedia.org/wiki/Harry_Potter_and_the_Goblet_of_Fire",
    numberOfPages: 636,
  },
  {
    id: "5",
    title: "Harry Potter and the Order of the Phoenix",
    authors: [{ name: "J.K. Rowling" }],
    imageUrl: "https://covers.openlibrary.org/b/id/7884740-L.jpg",
    infoUrl:
      "https://en.wikipedia.org/wiki/Harry_Potter_and_the_Order_of_the_Phoenix",
    numberOfPages: 766,
  },
  {
    id: "6",
    title: "Harry Potter and the Half-Blood Prince",
    authors: [{ name: "J.K. Rowling" }],
    imageUrl: "https://covers.openlibrary.org/b/id/7884867-L.jpg",
    infoUrl:
      "https://en.wikipedia.org/wiki/Harry_Potter_and_the_Half-Blood_Prince",
    numberOfPages: 607,
  },
  {
    id: "7",
    title: "Harry Potter and the Deathly Hallows",
    authors: [{ name: "J.K. Rowling" }],
    imageUrl: "https://covers.openlibrary.org/b/id/7884916-L.jpg",
    infoUrl:
      "https://en.wikipedia.org/wiki/Harry_Potter_and_the_Deathly_Hallows",
    numberOfPages: 607,
  },
];
