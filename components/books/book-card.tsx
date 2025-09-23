import { Book } from "@/src/feature/books/data/book.types";
import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { ThemedText } from "../themed-text";
import Button from "../ui/button";

interface Props {
  book: Book;
}
export default function BookCard({ book }: Props) {
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
        <Button
          variant={"blue"}
          padding={0}
          fontSize={16}
          value={"Läs mer"}
          borderRadius={5}
          onPress={function (): void {
            throw new Error("Function not implemented.");
          }}
        ></Button>
        <Button
          variant={"gray"}
          padding={0}
          fontSize={16}
          borderRadius={5}
          value={"Lägg till"}
          onPress={function (): void {
            throw new Error("Function not implemented.");
          }}
        ></Button>
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
    height: 200,
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
  },
});
