import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';
import { WHATSAPP_NUMBER } from '../data/games';
import colors from '../theme/colors';

// Tela do carrinho de compras
const CartScreen = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);

  // Finaliza pedido pelo WhatsApp com lista de itens
  const handleFinalize = () => {
    if (cartItems.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione jogos antes de finalizar.');
      return;
    }

    const itemsList = cartItems
      .map(
        (item) =>
          `• ${item.title} (${item.platform}) x${item.quantity} — R$ ${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join('\n');

    const message = encodeURIComponent(
      `Olá! Gostaria de finalizar meu pedido:\n\n${itemsList}\n\n*Total: R$ ${cartTotal.toFixed(2)}*`
    );

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    Linking.openURL(url).catch(() =>
      Alert.alert('Erro', 'Não foi possível abrir o WhatsApp.')
    );
  };

  // Renderiza cada item do carrinho
  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Image source={{ uri: item.cover }} style={styles.itemImage} resizeMode="cover" />

      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.itemPlatform}>{item.platform}</Text>
        <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>

        {/* Controle de quantidade */}
        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Ionicons name="remove" size={16} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Ionicons name="add" size={16} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Subtotal e remover */}
      <View style={styles.itemActions}>
        <Text style={styles.itemSubtotal}>
          R$ {(item.price * item.quantity).toFixed(2)}
        </Text>
        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
          <Ionicons name="trash-outline" size={20} color={colors.secondary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Text style={styles.screenTitle}>🛒 Meu Carrinho</Text>

      {cartItems.length === 0 ? (
        // Estado vazio
        <View style={styles.emptyState}>
          <Ionicons name="cart-outline" size={64} color={colors.textSecondary} />
          <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
          <Text style={styles.emptySubText}>
            Adicione jogos pelo catálogo
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />

          {/* Rodapé com total e botões */}
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>R$ {cartTotal.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={styles.whatsappButton}
              onPress={handleFinalize}
            >
              <Ionicons name="logo-whatsapp" size={20} color={colors.text} />
              <Text style={styles.whatsappText}>Finalizar pelo WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.clearButton}
              onPress={() =>
                Alert.alert('Limpar carrinho', 'Remover todos os itens?', [
                  { text: 'Cancelar', style: 'cancel' },
                  { text: 'Limpar', onPress: clearCart, style: 'destructive' },
                ])
              }
            >
              <Text style={styles.clearText}>Limpar carrinho</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screenTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
  },
  listContent: {
    padding: 12,
    gap: 10,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 2,
  },
  itemImage: {
    width: 80,
    height: 107,
  },
  itemInfo: {
    flex: 1,
    padding: 10,
    gap: 3,
  },
  itemTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 17,
  },
  itemPlatform: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  itemPrice: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  qtyButton: {
    backgroundColor: colors.border,
    borderRadius: 6,
    padding: 4,
  },
  qtyText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    minWidth: 20,
    textAlign: 'center',
  },
  itemActions: {
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  itemSubtotal: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  emptyText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  emptySubText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  footer: {
    backgroundColor: colors.card,
    padding: 16,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  totalValue: {
    color: colors.accent,
    fontSize: 24,
    fontWeight: '800',
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.success,
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },
  whatsappText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  clearButton: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  clearText: {
    color: colors.secondary,
    fontSize: 13,
  },
});

export default CartScreen;
