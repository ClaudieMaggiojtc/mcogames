import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Badge from '../components/Badge';
import { CartContext } from '../context/CartContext';
import { WHATSAPP_NUMBER } from '../data/games';
import colors from '../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Tela de detalhe de um jogo específico
const GameDetailScreen = ({ route, navigation }) => {
  const { game } = route.params;
  const { addToCart } = useContext(CartContext);

  const discount =
    game.originalPrice && game.originalPrice > game.price
      ? Math.round(((game.originalPrice - game.price) / game.originalPrice) * 100)
      : null;

  // Abre o WhatsApp com mensagem pré-preenchida
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no jogo *${game.title}* (${game.platform}) por R$ ${game.price.toFixed(2)}. Poderia me dar mais informações?`
    );
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    Linking.openURL(url).catch(() =>
      Alert.alert('Erro', 'Não foi possível abrir o WhatsApp.')
    );
  };

  // Adiciona ao carrinho e volta para a tela anterior
  const handleAddToCart = () => {
    addToCart(game);
    Alert.alert('✅ Adicionado!', `${game.title} foi adicionado ao carrinho.`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Imagem grande com gradiente */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: game.cover }}
            style={styles.coverImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', colors.background]}
            style={styles.imageGradient}
          />
          {/* Botão de voltar */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Conteúdo */}
        <View style={styles.content}>
          {/* Badges de plataforma e status */}
          <View style={styles.badges}>
            <Badge type={game.platform} />
            {game.isNew && <Badge type="NOVO" />}
            {game.isPromo && discount && (
              <Badge type="PROMO" discount={discount} />
            )}
          </View>

          {/* Título */}
          <Text style={styles.title}>{game.title}</Text>

          {/* Preços */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>R$ {game.price.toFixed(2)}</Text>
            {game.originalPrice && (
              <Text style={styles.originalPrice}>
                R$ {game.originalPrice.toFixed(2)}
              </Text>
            )}
            {discount && (
              <View style={styles.discountTag}>
                <Text style={styles.discountText}>{discount}% OFF</Text>
              </View>
            )}
          </View>

          {/* Informações do jogo */}
          <View style={styles.infoGrid}>
            <InfoRow icon="globe-outline" label="Idioma" value={game.language} />
            <InfoRow icon="game-controller-outline" label="Gênero" value={game.genre} />
            <InfoRow icon="layers-outline" label="Tipo" value={game.type} />
            <InfoRow icon="logo-playstation" label="Plataforma" value={game.platform} />
          </View>

          {/* Descrição */}
          <Text style={styles.descTitle}>Descrição</Text>
          <Text style={styles.description}>{game.description}</Text>

          {/* Botões de ação */}
          <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
            <Ionicons name="cart-outline" size={20} color={colors.background} />
            <Text style={styles.cartButtonText}>Adicionar ao Carrinho</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
            <Ionicons name="logo-whatsapp" size={20} color={colors.text} />
            <Text style={styles.whatsappButtonText}>Comprar pelo WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Linha de informação com ícone
const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <Ionicons name={icon} size={16} color={colors.accent} />
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageWrapper: {
    position: 'relative',
    height: SCREEN_WIDTH * 0.9,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 12,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 32,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  price: {
    color: colors.accent,
    fontSize: 28,
    fontWeight: '800',
  },
  originalPrice: {
    color: colors.textSecondary,
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  discountTag: {
    backgroundColor: colors.promo,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  discountText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  infoGrid: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    width: 80,
  },
  infoValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  descTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
    marginTop: 8,
  },
  cartButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '700',
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.success,
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  whatsappButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default GameDetailScreen;
