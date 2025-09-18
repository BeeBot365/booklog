import { Image } from "expo-image";
import { Platform, StyleSheet, View, Text } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.libraryContainer}>
      <ThemedText style={styles.text}>Inga böcker i biblioteket</ThemedText>
      {/* <Text style={styles.text}>Inga böcker i biblioteket</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  libraryContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  text: {
    alignSelf: "center",
  },
});
