import { Platform, StyleSheet, View, Text, FlatList } from "react-native";
import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link, router } from "expo-router";
import { useBooksContext } from "@/providers/books-provider";
import BookCard from "@/components/books/book-card";

export default function HomeScreen() {
  const { books } = useBooksContext();

  if (books.length === 0 || !books) {
    return (
      <View style={styles.libraryContainer}>
        <ThemedText style={styles.text}>Inga böcker i biblioteket</ThemedText>
      </View>
    );
  }
  return (
    <View style={styles.libraryContainer}>
      <Text style={styles.text}>Dina böcker</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "center" }}
        contentContainerStyle={styles.listContent}
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
                  router.push(`/Library/${item.id}`);
                },
              },
            ]}
          ></BookCard>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  libraryContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  text: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "helvetica",
    marginVertical: 10,
    textDecorationLine: "underline",
  },
  listContent: {
    paddingBottom: 24,
  },
});
