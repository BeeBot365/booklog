import BookCard from "@/components/books/book-card";
import { ThemedText } from "@/components/themed-text";
import { ButtonObject } from "@/components/ui/button";
import { useBooksContext } from "@/providers/books-provider";
import { mockedbooks } from "@/src/feature/books/data/book.types";
import { useState } from "react";
import { View, TextInput, StyleSheet, FlatList } from "react-native";

export default function SearchScreen() {
  const { addBookToContext } = useBooksContext();
  const [value, setValue] = useState<string>("");
  const books = mockedbooks;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search book by title.."
        placeholderTextColor="#888"
        onChangeText={setValue}
        value={value}
      ></TextInput>
      <FlatList
        data={books}
        horizontal={false}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ justifyContent: "center" }}
        contentContainerStyle={styles.listContent}
        numColumns={2}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            buttons={[
              {
                variant: "blue",
                padding: 0,
                fontSize: 16,
                value: "Läs mer",
                borderRadius: 5,
                onPress: () => {
                  throw new Error("Navigation not implemented");
                }, //goToDetails(item.id)
              },
              {
                variant: "gray",
                padding: 0,
                fontSize: 16,
                value: "Lägg till",
                borderRadius: 5,
                onPress: () => addBookToContext(item),
              },
            ]}
          />
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  input: {
    fontSize: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
});
