import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import GameDetailScreen from "./src/screens/GameDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#0a0a0a" },
          headerTintColor: "#00d4ff",
          headerTitleStyle: { fontWeight: "800", letterSpacing: 2 },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: "#0a0a0a" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "MCO GAMES", headerShown: false }}
        />
        <Stack.Screen
          name="GameDetail"
          component={GameDetailScreen}
          options={{ title: "Detalhes do Jogo" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
