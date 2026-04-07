import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function GameCard({ game, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: game.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{game.platform}</Text>
          </View>
          <Text style={styles.genre}>{game.genre}</Text>
        </View>
        <Text style={styles.title}>{game.title}</Text>
        <Text style={styles.developer}>{game.developer}</Text>
        <View style={styles.priceRow}>
          <View style={styles.priceBlock}>
            <Text style={styles.priceLabel}>Console Primário</Text>
            <Text style={styles.price}>{game.prices.primary}</Text>
          </View>
          <View style={styles.priceBlock}>
            <Text style={styles.priceLabel}>Console Secundário</Text>
            <Text style={styles.priceSecondary}>{game.prices.secondary}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  image: {
    width: "100%",
    height: 200,
  },
  info: {
    padding: 14,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  badge: {
    backgroundColor: "#003087",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  genre: {
    color: "#aaa",
    fontSize: 12,
  },
  title: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 2,
  },
  developer: {
    color: "#888",
    fontSize: 13,
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: "row",
    gap: 16,
  },
  priceBlock: {
    flex: 1,
  },
  priceLabel: {
    color: "#888",
    fontSize: 11,
    marginBottom: 2,
  },
  price: {
    color: "#00d4ff",
    fontSize: 16,
    fontWeight: "700",
  },
  priceSecondary: {
    color: "#00c896",
    fontSize: 16,
    fontWeight: "700",
  },
});
