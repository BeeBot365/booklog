import { useBooksContext } from "@/providers/books-provider";
import { Book } from "@/src/db/books/data/book.types";
import { Image, StyleSheet, Text, View } from "react-native";
import Button, { ButtonObject } from "../ui/button";

interface Props {
  book: Book;
  buttons: ButtonObject[];
  owned?: boolean;
}

export default function BookCard({ book, buttons, owned }: Props) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageWrapper}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{
            uri:
              book.imageUrl ??
              "https://via.placeholder.com/300x450?text=No+Cover",
          }}
        />
        {owned && (
          <View style={styles.ownedBadge}>
            <Text style={styles.ownedBadgeText}>I biblioteket</Text>
          </View>
        )}
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.titleText} numberOfLines={2} ellipsizeMode="tail">
          {book.title}
        </Text>
        <Text style={styles.authorText} numberOfLines={1} ellipsizeMode="tail">
          {book.authors.map((a) => a.name).join(", ")}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        {buttons.map((button, index) => (
          <Button key={index} {...button} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 180,
    minHeight: 380,
    margin: 12,
    borderRadius: 14,
    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },

  imageWrapper: {
    overflow: "hidden",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: "#f3f3f3",
  },

  image: {
    width: "100%",
    aspectRatio: 2 / 3,
  },

  textContainer: {
    paddingHorizontal: 12,
    paddingTop: 10,
  },

  titleText: {
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 20,
  },

  authorText: {
    marginTop: 4,
    fontSize: 13,
    color: "#666",
  },

  buttonContainer: {
    paddingHorizontal: 12,
    paddingBottom: 14,
    paddingTop: 10,
    gap: 3,
    alignSelf: "stretch",
  },

  ownedBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#185abc",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },

  ownedBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
});
