import { StyleSheet, View, Text, FlatList, Modal } from "react-native";

import { Link, router } from "expo-router";
import { useBooksContext } from "@/providers/books-provider";
import BookCard from "@/components/books/book-card";
import {
  setHasLaunched,
  gethasLaunched,
  resetHasLaunched,
} from "@/src/securestore/launched";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";

export default function HomeScreen() {
  const { books } = useBooksContext();
  const [showReminderModal, setShowReminderModal] = useState(false);

  useEffect(() => {
    // Kollar om det är första gången appen startar
    async function checkFirstLaunch() {
      await resetHasLaunched();
      const firstLaunch = await gethasLaunched();
      if (!firstLaunch) {
        setShowReminderModal(true);
      }
    }
    checkFirstLaunch();
  }, []);

  return (
    <View style={styles.libraryContainer}>
      <Modal visible={showReminderModal} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text> Vill du ställa in en tid för läspåminnelse?</Text>
          <View style={styles.buttonContainer}>
            <Button
              variant="gray"
              value="Ja"
              padding={10}
              fontSize={16}
              borderRadius={10}
              onPress={async () => {
                setShowReminderModal(false);
                await setHasLaunched();
                router.push("/(tabs)/settings");
              }}
            ></Button>
            <Button
              variant="gray"
              value="Nej"
              padding={10}
              fontSize={16}
              borderRadius={10}
              onPress={async () => {
                setShowReminderModal(false);
                await setHasLaunched();
              }}
            ></Button>
          </View>
        </View>
      </Modal>
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
                  router.push(`/library/${item.id}`);
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
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
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
  buttonContainer: {
    marginTop: 20,
    gap: 10,
    width: "40%",
  },
});
