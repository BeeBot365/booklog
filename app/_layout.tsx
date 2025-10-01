import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SQLiteProvider } from "expo-sqlite";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { initDatabase } from "@/src/db/db";
import BooksProvider from "@/providers/books-provider";
import Toast from "react-native-toast-message";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SQLiteProvider databaseName="bookLog.db" onInit={initDatabase}>
      <BooksProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <Toast />
          <StatusBar style="auto" />
        </ThemeProvider>
      </BooksProvider>
    </SQLiteProvider>
  );
}
