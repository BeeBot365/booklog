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
