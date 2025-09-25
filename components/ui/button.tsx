import { Pressable, Text } from "react-native";
export interface ButtonObject {
  variant: "blue" | "gray" | "red" | "green";
  padding: number;
  fontSize: number;
  value: string;
  borderRadius: number;
  onPress: () => void;
}

export default function Button(props: ButtonObject) {
  let backgroundColor: string;
  switch (props.variant) {
    case "red":
      backgroundColor = "#cb2828ff";
      break;
    case "blue":
      backgroundColor = "#185abc";
      break;
    case "green":
      backgroundColor = "#10B981";
      break;
    case "gray":
      backgroundColor = "#444444";
      break;
  }

  return (
    <Pressable
      onPress={props.onPress}
      style={{
        backgroundColor: backgroundColor,
        padding: props.padding,
        borderRadius: props.borderRadius ?? 0,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 2,
      }}
    >
      <Text
        style={{
          fontSize: props.fontSize,
          color: "#FFFFFF",
        }}
      >
        {props.value}
      </Text>
    </Pressable>
  );
}
