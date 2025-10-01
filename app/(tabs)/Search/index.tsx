import { router } from "expo-router";
import BookCard from "@/components/books/book-card";
import { useBooksContext } from "@/providers/books-provider";
import { mockedbooks } from "@/src/db/books/data/book.types";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import * as Haptics from "expo-haptics";
import Toast from "react-native-toast-message";

export default function SearchScreen() {
  const { addBookToContext, books } = useBooksContext();
  const [value, setValue] = useState<string>("");
  const [filteredBooks, setFilteredBooks] = useState(mockedbooks);

  // Jämför vilka böcker man redan har i sitt bibliotek.
  useEffect(() => {
    const filtered = mockedbooks.filter(
      (b) => !books.some((x) => x.id === b.id)
    );
    setFilteredBooks(filtered);
  }, [books, mockedbooks]);

  function filterBooks(id: string) {
    const filtered = filteredBooks.filter((b) => b.id !== id);
    setFilteredBooks(filtered);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search book by title.."
        placeholderTextColor="#888"
        onChangeText={setValue}
        onSubmitEditing={() => {
          console.log("Searching for:", value);
        }}
        value={value}
      ></TextInput>
      <FlatList
        data={filteredBooks}
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
                  console.log("Go to details for:", item.id);
                  router.push({
                    pathname: "/Search/[id]",
                    params: { id: item.id },
                  });
                },
              },
              {
                variant: "gray",
                padding: 0,
                fontSize: 16,
                value: "Lägg till",
                borderRadius: 5,
                onPress: async () => {
                  addBookToContext(item);
                  filterBooks(item.id);
                  await Toast.show({
                    type: "success",
                    text1: `${item.title} är tillagd i ditt bibliotek`,
                  });
                  await Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success
                  );
                },
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
