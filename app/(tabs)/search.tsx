import BookCard from "@/components/books/book-card";
import { ThemedText } from "@/components/themed-text";
import { mockedbooks } from "@/src/feature/books/data/book.types";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";

export default function Search() {
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
        renderItem={({ item }) => <BookCard book={item} />}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ justifyContent: "center" }}
        contentContainerStyle={styles.listContent}
        numColumns={2}
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
