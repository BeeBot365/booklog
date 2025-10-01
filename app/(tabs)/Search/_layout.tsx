import { Stack } from "expo-router";

export default function SearchLayout() {
  return (
    <Stack>
      <Stack.Screen name="search" options={{ headerShown: true }} />
      <Stack.Screen name="[id]" options={(props) => ({ headerShown: true })} />
    </Stack>
  );
}
