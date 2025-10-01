import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SQLiteProvider } from "expo-sqlite";
import { initDatabase } from "@/src/db/db";
import BooksProvider from "@/providers/books-provider";
import Toast from "react-native-toast-message";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="bookLog.db" onInit={initDatabase}>
      <BooksProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <Toast />
        <StatusBar style="auto" />
      </BooksProvider>
    </SQLiteProvider>
  );
}
