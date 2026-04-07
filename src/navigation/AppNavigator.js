import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import CatalogScreen from '../screens/CatalogScreen';
import CartScreen from '../screens/CartScreen';
import GameDetailScreen from '../screens/GameDetailScreen';
import { CartContext } from '../context/CartContext';
import colors from '../theme/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator para a Home (inclui tela de detalhe do jogo)
const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: colors.background },
    }}
  >
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="GameDetail" component={GameDetailScreen} />
  </Stack.Navigator>
);

// Stack navigator para o Catálogo (inclui tela de detalhe do jogo)
const CatalogStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: colors.background },
    }}
  >
    <Stack.Screen name="CatalogMain" component={CatalogScreen} />
    <Stack.Screen name="GameDetail" component={GameDetailScreen} />
  </Stack.Navigator>
);

// Navegação principal com abas inferiores
const AppNavigator = () => {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Catálogo') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Carrinho') {
            iconName = focused ? 'cart' : 'cart-outline';
          }
          return (
            <View>
              <Ionicons name={iconName} size={size} color={color} />
              {/* Badge do carrinho na aba */}
              {route.name === 'Carrinho' && totalItems > 0 && (
                <View style={styles.tabBadge}>
                  <View style={styles.tabBadgeDot} />
                </View>
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Catálogo" component={CatalogStack} />
      <Tab.Screen name="Carrinho" component={CartScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.card,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 6,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  tabBadge: {
    position: 'absolute',
    top: -2,
    right: -4,
  },
  tabBadgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },
});

export default AppNavigator;
