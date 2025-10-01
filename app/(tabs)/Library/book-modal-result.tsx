import { router, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function BookModalResult() {
  const { title } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text>Du har tagit bort {title} från din sammling</Text>
      <Pressable
        onPress={() => {
          router.back();
        }}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: "#2196F3",
          borderRadius: 5,
        }}
      >
        <Text></Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
