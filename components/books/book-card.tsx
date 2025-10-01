import { useBooksContext } from "@/providers/books-provider";
import { Book } from "@/src/db/books/data/book.types";
import { Image, StyleSheet, Text, View } from "react-native";
import Button, { ButtonObject } from "../ui/button";

interface Props {
  book: Book;
  buttons: ButtonObject[];
}
export default function BookCard({ book, buttons }: Props) {
  const { addBookToContext } = useBooksContext();
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageWrapper}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{ uri: book.imageUrl }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{book.title}</Text>
        <Text>{book.authors.map((author) => author.name).join(", ")}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {buttons.map((button, index) => (
          <Button key={index} {...button} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 150,
    minHeight: 350,
    margin: 20,
    borderRadius: 10,
    borderColor: "black",
    backgroundColor: "white",
  },
  imageWrapper: {
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 180,
  },

  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  textContainer: {
    margin: 5,
  },

  titleText: {
    fontWeight: "bold",
    fontSize: 16,
  },

  buttonContainer: {
    width: 100,
    margin: 5,
    alignSelf: "center",
    justifyContent: "flex-end",
    flex: 1,
    marginBottom: 15,
  },
});
