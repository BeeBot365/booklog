import Button from "@/components/ui/button";
import { useBooksContext } from "@/providers/books-provider";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import * as Haptics from "expo-haptics";
export default function DeleteModal() {
  const { deleteBookFromContext } = useBooksContext();
  const { id } = useLocalSearchParams();

  if (!id) {
    return (
      <View style={styles.container}>
        <Text>Inget id angivet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Är du säker på att du vill ta bort boken</Text>
      <View style={styles.buttonContainer}>
        <Button
          variant="red"
          value="Ta bort"
          padding={5}
          fontSize={16}
          borderRadius={10}
          onPress={async () => {
            const book = await deleteBookFromContext(id as string);
            if (book) {
              await Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );
              // router.replace({
              //   pathname: "/Library/book-modal-result",
              //   params: { title: book.title },
              // });
              await Toast.show({
                type: "success",
                text1: "Bok raderad",
                text2: `${book.title} har raderats från biblioteket.`,
                position: "top",
                visibilityTime: 4000,
              });
              router.dismissAll();
              router.replace("/(tabs)/library");
            }
          }}
        ></Button>
        <Button
          variant="gray"
          value="Avbryt"
          padding={10}
          fontSize={16}
          borderRadius={10}
          onPress={() => {
            router.back();
          }}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },
});
