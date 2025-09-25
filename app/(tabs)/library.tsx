import { Platform, StyleSheet, View, Text, FlatList } from "react-native";
import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import { useBooksContext } from "@/providers/books-provider";

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
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <ThemedText>{item.title}</ThemedText>
            <ThemedText>
              {item.authors.map((author) => author.name).join(", ")}
            </ThemedText>
          </View>
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
  },
});
