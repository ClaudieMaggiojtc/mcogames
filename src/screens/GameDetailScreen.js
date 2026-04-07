import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function GameDetailScreen({ route, navigation }) {
  const { game } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: game.image }} style={styles.image} resizeMode="cover" />

      <View style={styles.body}>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{game.platform}</Text>
          </View>
          <Text style={styles.genre}>{game.genre}</Text>
        </View>

        <Text style={styles.title}>{game.title}</Text>
        <Text style={styles.developer}>{game.developer}</Text>
        <Text style={styles.releaseDate}>🗓  Lançamento: {game.releaseDate}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Sobre o jogo</Text>
        <Text style={styles.description}>{game.description}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Preços</Text>

        <View style={styles.priceCard}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>🎮 Console Primário</Text>
            <Text style={styles.price}>{game.prices.primary}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>🎮 Console Secundário</Text>
            <Text style={styles.priceSecondary}>{game.prices.secondary}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.buyButton} activeOpacity={0.8}>
          <Text style={styles.buyButtonText}>Comprar Agora</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>← Voltar ao catálogo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  content: {
    paddingBottom: 40,
  },
  image: {
    width: "100%",
    height: 280,
  },
  body: {
    padding: 20,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 10,
  },
  badge: {
    backgroundColor: "#003087",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  genre: {
    color: "#aaa",
    fontSize: 13,
  },
  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 4,
  },
  developer: {
    color: "#888",
    fontSize: 14,
    marginBottom: 6,
  },
  releaseDate: {
    color: "#666",
    fontSize: 13,
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#1a1a2e",
    marginVertical: 18,
  },
  sectionTitle: {
    color: "#00d4ff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    letterSpacing: 1,
  },
  description: {
    color: "#ccc",
    fontSize: 14,
    lineHeight: 22,
  },
  priceCard: {
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceLabel: {
    color: "#aaa",
    fontSize: 14,
  },
  price: {
    color: "#00d4ff",
    fontSize: 18,
    fontWeight: "800",
  },
  priceSecondary: {
    color: "#00c896",
    fontSize: 18,
    fontWeight: "800",
  },
  buyButton: {
    backgroundColor: "#003087",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1,
  },
  backButton: {
    marginTop: 14,
    alignItems: "center",
  },
  backButtonText: {
    color: "#666",
    fontSize: 13,
  },
});
