import { StyleSheet, View, Text, FlatList, Modal } from "react-native";

import { Link, router } from "expo-router";
import { useBooksContext } from "@/providers/books-provider";
import BookCard from "@/components/books/book-card";
import { isFirstLaunched } from "@/src/securestore/launched";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";

export default function HomeScreen() {
  const { books } = useBooksContext();
  const [showReminderModal, setShowReminderModal] = useState(false);

  useEffect(() => {
    // Kollar om det är första gången appen startar
    async function checkFirstLaunch() {
      const firstLaunch = await isFirstLaunched();
      if (firstLaunch) {
        console.log("Första gången appen startar");
        setShowReminderModal(true);
      }
    }
    checkFirstLaunch();
  }, []);

  if (books.length === 0 || !books) {
    return (
      <View style={styles.libraryContainer}>
        {/* <Text style={styles.text}>Dina böcker</Text> */}
        {/* <Modal visible={showReminderModal} animationType="slide">
          <View>
            <Button variant="blue" value="Ja"></Button>
            <Button variant="red" value"Nej"></Button>
          </View>
        </Modal> */}
        <Text style={styles.text}>Inga böcker i biblioteket</Text>
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
