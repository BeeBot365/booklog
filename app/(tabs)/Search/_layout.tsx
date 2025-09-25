import { Stack } from "expo-router";

export default function SearchLayout() {
  return (
    <Stack>
      <Stack.Screen name="search" options={{ headerShown: false }} />
      <Stack.Screen name="book/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
