import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Badge from './Badge';
import { CartContext } from '../context/CartContext';
import colors from '../theme/colors';

// Card de jogo exibido na grade do catálogo e da home
const GameCard = ({ game, onPress }) => {
  const { addToCart } = useContext(CartContext);

  // Calcula percentual de desconto se houver preço original
  const discount =
    game.originalPrice && game.originalPrice > game.price
      ? Math.round(((game.originalPrice - game.price) / game.originalPrice) * 100)
      : null;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Imagem da capa do jogo */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: game.cover }}
          style={styles.cover}
          resizeMode="cover"
        />
        {/* Badges sobrepostos na imagem */}
        <View style={styles.badgesContainer}>
          <Badge type={game.platform} />
          {game.isNew && <Badge type="NOVO" />}
          {game.isPromo && discount && <Badge type="PROMO" discount={discount} />}
        </View>
      </View>

      {/* Informações do jogo */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {game.title}
        </Text>

        {/* Idioma */}
        <Text style={styles.language}>🌐 {game.language}</Text>

        {/* Preços */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>R$ {game.price.toFixed(2)}</Text>
          {game.originalPrice && (
            <Text style={styles.originalPrice}>
              R$ {game.originalPrice.toFixed(2)}
            </Text>
          )}
        </View>

        {/* Botão de adicionar ao carrinho */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addToCart(game)}
          activeOpacity={0.7}
        >
          <Ionicons name="cart-outline" size={14} color={colors.background} />
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    flex: 1,
    margin: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 3 / 4,
  },
  cover: {
    width: '100%',
    height: '100%',
  },
  badgesContainer: {
    position: 'absolute',
    top: 6,
    left: 6,
    gap: 4,
  },
  info: {
    padding: 10,
    gap: 4,
  },
  title: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  language: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  price: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: '800',
  },
  originalPrice: {
    color: colors.textSecondary,
    fontSize: 11,
    textDecorationLine: 'line-through',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 7,
    marginTop: 6,
    gap: 4,
  },
  addButtonText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '700',
  },
});

export default GameCard;
