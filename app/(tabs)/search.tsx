import BookCard from "@/components/books/book-card";
import { ThemedText } from "@/components/themed-text";
import { mockedbooks } from "@/src/feature/books/data/book.types";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";

export default function Search() {
  const books = mockedbooks;
  return (
    <View style={styles.container}>
      <TextInput placeholder="Search book by title.."></TextInput>
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
});
