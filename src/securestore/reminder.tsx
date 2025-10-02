import * as SecureStrore from "expo-secure-store";

const KEY = "reminder";

export async function loadReminder(): Promise<String | null> {
  const value = await SecureStrore.getItemAsync(KEY);
  return value ? JSON.parse(value) : null;
}

export async function saveReminder(date: Date) {
  const dateString = JSON.stringify(date.toISOString());
  await SecureStrore.setItemAsync(KEY, dateString);
}

export async function resetReminder() {
  await SecureStrore.deleteItemAsync(KEY);
}
