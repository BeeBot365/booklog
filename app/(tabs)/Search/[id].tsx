import Button from "@/components/ui/button";
import { useBooksContext } from "@/providers/books-provider";
import { Book, mockedbooks } from "@/src/db/books/data/book.types";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const nav = useNavigation();
  const router = useRouter();
  const { addBookToContext } = useBooksContext();
  const [book, setBook] = useState<Book>();

  useEffect(() => {
    // fetch api/book/id
    const book = mockedbooks.find((b) => b.id === id);
    setBook(book);
    // setBook(book);

    nav.setOptions({ title: book?.title });
  }, []);

  if (!book) {
    return (
      <View style={styles.container}>
        <Text>Boken hittades inte.</Text>
      </View>
    );
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
          padding={10}
          fontSize={16}
          value={"Öppna i webbläsaren"}
          borderRadius={10}
          onPress={async () => WebBrowser.openBrowserAsync(book.infoUrl)}
        />
      )}

      <Button
        variant="gray"
        padding={10}
        fontSize={16}
        value={"Lägg till bok"}
        borderRadius={10}
        onPress={() => {
          addBookToContext(book);
          Toast.show({
            type: "success",
            text1: "Boken är tillagd i din bokhylla",
          });
          router.back();
          console.log("Tryck på lägg till bok");
        }}
      />
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
