import { useBooksContext } from "@/providers/books-provider";
import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import * as WebBrowser from "expo-web-browser";
import Button from "@/components/ui/button";
// importera Book-typ och eventuell datakälla/context här

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const { getbookById } = useBooksContext();

  // Hämta boken utifrån id, t.ex. från context, hook eller API
  // Exempel med mockad data:
  const book = getbookById(id as string);

  if (!book) {
    return <Text>Hittar inte boken.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: book.imageUrl }} style={styles.cover} />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.authors}>
        {book.authors.map((a) => a.name).join(", ")}
      </Text>
      <Text style={styles.description}>
        {book.description ?? "Ingen beskrivning."}
      </Text>
      {book.infoUrl && (
        <Button
          variant={"green"}
          padding={5}
          fontSize={16}
          value={"Öppna i webbläsaren"}
          borderRadius={10}
          onPress={async () => WebBrowser.openBrowserAsync(book.infoUrl)}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  cover: { width: 150, height: 220, borderRadius: 8, marginBottom: 14 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
  },
  authors: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
});
