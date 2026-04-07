import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Badge from './Badge';
import colors from '../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.85;

// Carrossel automático exibindo jogos com isNew: true
const Carousel = ({ games, onPress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  // Filtra apenas os lançamentos
  const newGames = games.filter((g) => g.isNew);

  // Auto-play a cada 3 segundos
  useEffect(() => {
    if (newGames.length <= 1) return;
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % newGames.length;
      scrollRef.current?.scrollTo({
        x: nextIndex * (CARD_WIDTH + 16),
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex, newGames.length]);

  // Atualiza o índice ativo ao rolar manualmente
  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (CARD_WIDTH + 16));
    setActiveIndex(index);
  };

  if (newGames.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>🎮 Lançamentos</Text>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 16}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContent}
        onMomentumScrollEnd={handleScroll}
      >
        {newGames.map((game) => (
          <TouchableOpacity
            key={game.id}
            style={styles.card}
            onPress={() => onPress && onPress(game)}
            activeOpacity={0.9}
          >
            <Image source={{ uri: game.cover }} style={styles.image} resizeMode="cover" />
            {/* Gradiente sobre a imagem */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.85)']}
              style={styles.gradient}
            >
              <View style={styles.cardInfo}>
                <View style={styles.badges}>
                  <Badge type={game.platform} />
                  <Badge type="NOVO" />
                </View>
                <Text style={styles.gameTitle} numberOfLines={1}>
                  {game.title}
                </Text>
                <Text style={styles.gamePrice}>R$ {game.price.toFixed(2)}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Dots de navegação */}
      <View style={styles.dotsContainer}>
        {newGames.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === activeIndex && styles.dotActive]}
          />
        ))}
      </View>
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
    gap: 16,
  },
  card: {
    width: CARD_WIDTH,
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: 14,
  },
  cardInfo: {
    gap: 6,
  },
  badges: {
    flexDirection: 'row',
    gap: 6,
  },
  gameTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  gamePrice: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '700',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.accent,
    width: 18,
  },
});

export default Carousel;
