import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Badge from './Badge';
import colors from '../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PROMO_CARD_WIDTH = SCREEN_WIDTH * 0.55;

// Seção horizontal de promoções com badge de desconto
const PromoSection = ({ games, onPress }) => {
  // Filtra jogos em promoção que tenham preço original
  const promoGames = games.filter(
    (g) => g.isPromo && g.originalPrice && g.originalPrice > g.price
  );

  if (promoGames.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>🔥 Promoções em Destaque</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {promoGames.map((game) => {
          const discount = Math.round(
            ((game.originalPrice - game.price) / game.originalPrice) * 100
          );

          return (
            <TouchableOpacity
              key={game.id}
              style={styles.card}
              onPress={() => onPress && onPress(game)}
              activeOpacity={0.8}
            >
              {/* Imagem */}
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: game.cover }}
                  style={styles.image}
                  resizeMode="cover"
                />
                {/* Badge de desconto */}
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-{discount}%</Text>
                </View>
              </View>

              {/* Informações */}
              <View style={styles.info}>
                <Badge type={game.platform} />
                <Text style={styles.title} numberOfLines={2}>
                  {game.title}
                </Text>
                <Text style={styles.originalPrice}>
                  R$ {game.originalPrice.toFixed(2)}
                </Text>
                <Text style={styles.price}>R$ {game.price.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    width: PROMO_CARD_WIDTH,
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 3 / 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.promo,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
  },
  info: {
    padding: 10,
    gap: 4,
  },
  title: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 17,
  },
  originalPrice: {
    color: colors.textSecondary,
    fontSize: 11,
    textDecorationLine: 'line-through',
  },
  price: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: '800',
  },
});

export default PromoSection;
