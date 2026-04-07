import React from "react";
import {
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
} from "react-native";
import GameCard from "../components/GameCard";
import games from "../data/games";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <View style={styles.header}>
        <Text style={styles.logo}>MCO</Text>
        <Text style={styles.logoSub}>GAMES</Text>
        <Text style={styles.subtitle}>Loja de jogos digitais PS4 & PS5</Text>
      </View>
      <FlatList
        data={games}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <GameCard
            game={item}
            onPress={() => navigation.navigate("GameDetail", { game: item })}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  header: {
    paddingTop: 20,
    paddingBottom: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a2e",
  },
  logo: {
    color: "#00d4ff",
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: 6,
  },
  logoSub: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 8,
    marginTop: -6,
  },
  subtitle: {
    color: "#666",
    fontSize: 12,
    marginTop: 4,
  },
  list: {
    paddingVertical: 10,
  },
});
