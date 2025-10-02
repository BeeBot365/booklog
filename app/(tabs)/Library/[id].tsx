import { useBooksContext } from "@/providers/books-provider";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import * as WebBrowser from "expo-web-browser";
import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Book } from "@/src/db/books/data/book.types";

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
  const { getbookById } = useBooksContext();
  const [book, setBook] = useState<Book>();
  const nav = useNavigation();
  const router = useRouter();

  useEffect(() => {
    const theId = Array.isArray(id) ? id[0] : id;
    const b = theId ? getbookById?.(theId as string) : undefined;
    if (!b) {
      router.back();
      return;
    }
    setBook(b);
    nav.setOptions({ title: b.title });
  }, [id]);

  if (!book) return null;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.coverWrap}>
        <Image source={{ uri: book.imageUrl }} style={styles.cover} />
      </View>

      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.authors}>
        {book.authors.map((a) => a.name).join(", ")}
      </Text>

      <View style={styles.divider} />

      <Text style={styles.description}>
        {stripHtml(book.description) || "Ingen beskrivning."}
      </Text>

      <View style={styles.buttonStack}>
        {book.infoUrl && (
          <Button
            variant="gray"
            padding={10}
            fontSize={16}
            value="Öppna i webbläsaren"
            borderRadius={10}
            onPress={async () => WebBrowser.openBrowserAsync(book.infoUrl)}
          />
        )}

        <Button
          variant="blue"
          value="Börja logga boken"
          padding={10}
          fontSize={16}
          borderRadius={10}
          onPress={() => {}}
        />

        <Button
          variant="red"
          padding={10}
          fontSize={16}
          value="Ta bort boken"
          borderRadius={10}
          onPress={() => {
            router.push({
              pathname: "/library/delete-book",
              params: { id: book.id },
            });
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 18, paddingBottom: 24, alignItems: "center", gap: 10 },

  coverWrap: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  cover: { width: 180, aspectRatio: 2 / 3, borderRadius: 12 },

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
  description: { width: "100%", fontSize: 15, lineHeight: 22, color: "#333" },

  buttonStack: { width: "100%", gap: 8, marginTop: 8 },
});
