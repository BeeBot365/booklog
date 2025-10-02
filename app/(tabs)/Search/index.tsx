import { router } from "expo-router";
import BookCard from "@/components/books/book-card";
import { useBooksContext } from "@/providers/books-provider";
import { useState, useRef } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";
import Toast from "react-native-toast-message";
import { fetchBooks } from "@/src/api/googleBooks";
import { Book } from "@/src/db/books/data/book.types";
import { MaterialIcons } from "@expo/vector-icons";

export default function SearchScreen() {
  const { addBookToContext, books } = useBooksContext();
  const [value, setValue] = useState<string>("");
  const [results, setResults] = useState<Book[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const listRef = useRef<FlatList<Book>>(null);

  async function handleSearch() {
    const search = value.trim();
    if (!search) return;
    const apiBooks = await fetchBooks(search, 0);
    setResults(apiBooks);
  }

  async function goNext() {
    const search = value.trim();
    if (!search) return;
    const next = startIndex + 10;
    setStartIndex(next);
    const apiBooks = await fetchBooks(search, next);
    setResults(apiBooks);
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }

  async function goPrev() {
    const search = value.trim();
    if (!search) return;
    const prev = Math.max(0, startIndex - 10);
    setStartIndex(prev);
    const apiBooks = await fetchBooks(search, prev);
    setResults(apiBooks);
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search book by title.."
        placeholderTextColor="#888"
        onChangeText={setValue}
        onSubmitEditing={handleSearch}
        value={value}
        returnKeyType="search"
      />
      <FlatList
        ref={listRef}
        data={results}
        horizontal={false}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ justifyContent: "center" }}
        contentContainerStyle={styles.listContent}
        numColumns={2}
        renderItem={({ item }) => {
          const owned = books.some((x) => x.id === item.id);
          return (
            <BookCard
              book={item}
              owned={owned}
              buttons={[
                {
                  variant: "gray",
                  padding: 0,
                  fontSize: 16,
                  value: "Läs mer",
                  borderRadius: 5,
                  onPress: () => {
                    router.push({
                      pathname: "/search/[id]",
                      params: { id: item.id },
                    });
                  },
                },
                {
                  variant: "blue",
                  padding: 0,
                  fontSize: 16,
                  value: owned ? "I biblioteket" : "Lägg till",
                  borderRadius: 5,
                  onPress: async () => {
                    if (owned) {
                      Toast.show({
                        type: "info",
                        text1: "Finns redan i din bokhylla",
                      });
                      return;
                    }
                    addBookToContext(item);
                    Toast.show({
                      type: "success",
                      text1: `${item.title} är tillagd`,
                    });
                    await Haptics.notificationAsync(
                      Haptics.NotificationFeedbackType.Success
                    );
                  },
                },
              ]}
            />
          );
        }}
      />
      <View style={styles.pager}>
        <TouchableOpacity
          onPress={goPrev}
          disabled={startIndex === 0}
          style={styles.iconButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons
            name="chevron-left"
            size={28}
            color={startIndex === 0 ? "#bbb" : "#333"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={goNext}
          style={styles.iconButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons name="chevron-right" size={28} color="#333" />
        </TouchableOpacity>
      </View>
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
  pager: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  iconButton: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: "#f2f2f2",
  },
});
