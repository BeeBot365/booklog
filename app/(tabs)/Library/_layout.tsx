import { Stack } from "expo-router";

export default function LibraryLayout() {
  return (
    <Stack>
      <Stack.Screen name="library" options={{ title: "Library" }} />
      <Stack.Screen name="[id]" options={{ title: "Details" }} />
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
