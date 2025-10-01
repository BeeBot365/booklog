import * as SecureStore from "expo-secure-store";

const KEY = "hasLaunched";

export async function gethasLaunched(): Promise<boolean> {
  const value = await SecureStore.getItemAsync(KEY);
  return value === "true";
}

export async function setHasLaunched() {
  await SecureStore.setItemAsync(KEY, "true");
}

export async function resetHasLaunched() {
  await SecureStore.setItemAsync(KEY, "false");
}
