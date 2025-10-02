import Button from "@/components/ui/button";
import { useBooksContext } from "@/providers/books-provider";
import { fetchBookById } from "@/src/api/googleBooks";
import { Book, mockedbooks } from "@/src/db/books/data/book.types";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

// Gippy genererad
function stripHtml(html?: string) {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const nav = useNavigation();
  const router = useRouter();
  const { addBookToContext } = useBooksContext();
  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    nav.setOptions({ title: "Laddar..." });
    async function loadBook() {
      try {
        const apiBook = await fetchBookById(id as string);
        if (!apiBook) {
          return;
        }
        setBook(apiBook);
        if (apiBook?.title) nav.setOptions({ title: apiBook.title });
      } finally {
        setLoading(false);
      }
    }
    loadBook();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.container}>
        <Text>Boken hittades inte.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.coverWrap}>
        <Image source={{ uri: book.imageUrl }} style={styles.cover} />
      </View>

      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.authors}>
        {book.authors.map((a) => a.name).join(", ")}
      </Text>

      <View style={styles.divider} />

      <Text style={styles.description}>
        {stripHtml?.(book.description) || "Ingen beskrivning."}
      </Text>

      <View style={styles.buttonStack}>
        {book.infoUrl && (
          <Button
            variant="gray"
            padding={12}
            fontSize={16}
            value="Öppna i webbläsaren"
            borderRadius={12}
            onPress={async () => WebBrowser.openBrowserAsync(book.infoUrl)}
          />
        )}
        <Button
          variant="green"
          padding={12}
          fontSize={16}
          value="Lägg till bok"
          borderRadius={12}
          onPress={() => {
            addBookToContext(book);
            Toast.show({
              type: "success",
              text1: "Boken är tillagd i din bokhylla",
            });
            router.back();
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  content: {
    padding: 18,
    paddingBottom: 24,
    alignItems: "center",
    gap: 10,
  },
  coverWrap: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  cover: {
    width: 180,
    aspectRatio: 2 / 3,
    borderRadius: 12,
  },
  title: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 26,
    paddingHorizontal: 12,
  },
  authors: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 6,
    textAlign: "center",
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#eee",
    marginVertical: 8,
  },
  description: {
    fontSize: 15,
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "70%",
    gap: 5,
  },
  buttonStack: {
    width: "100%",
    gap: 8,
    marginTop: 8,
  },
});
