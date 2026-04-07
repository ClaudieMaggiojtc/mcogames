import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CartProvider } from './src/context/CartContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Provedor do carrinho envolve toda a navegação */}
      <CartProvider>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor="#0a0a0f" />
          <AppNavigator />
        </NavigationContainer>
      </CartProvider>
    </GestureHandlerRootView>
  );
}
