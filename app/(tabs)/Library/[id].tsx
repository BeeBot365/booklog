import { useBooksContext } from "@/providers/books-provider";
import { Link, router, useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import * as WebBrowser from "expo-web-browser";
import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
// importera Book-typ och eventuell datakälla/context här

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const { getbookById } = useBooksContext();
  const [open, setOpen] = useState<Boolean>(false);

  //Hämtar boken och om boken inte existerar så navigerar vi tillbaka.
  const book = getbookById(id as string);
  useEffect(() => {
    if (!book) {
      router.replace("/(tabs)/Library/library");
    }
  }, [book]);

  if (!book) {
    return null;
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

      <Button
        variant="red"
        padding={5}
        fontSize={16}
        value={"Ta bort boken"}
        borderRadius={10}
        onPress={() => {
          router.push({
            pathname: "/Library/delete-book",
            params: { id: book.id },
          });
          console.log("Tryck på ta bort bok");
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
