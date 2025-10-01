import { Stack } from "expo-router";

export default function SearchLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Sök", headerShown: true }}
      />
      <Stack.Screen name="[id]" options={(props) => ({ headerShown: true })} />
    </Stack>
  );
}
