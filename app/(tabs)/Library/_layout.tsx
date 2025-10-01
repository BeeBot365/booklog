import { Stack } from "expo-router";

export default function LibraryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="library"
        options={{ headerShown: true, title: "Bibliotek" }}
      />
      <Stack.Screen name="[id]" options={(props) => ({ headerShown: true })} />
      <Stack.Screen
        name="delete-book"
        options={{
          title: "Delete Book",
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="book-modal-result"
        options={{
          title: "Book Removed",
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
