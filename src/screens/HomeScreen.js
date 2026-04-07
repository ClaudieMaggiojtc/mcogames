import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from '../components/Carousel';
import PromoSection from '../components/PromoSection';
import GameCard from '../components/GameCard';
import Header from '../components/Header';
import { games } from '../data/games';
import colors from '../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Tela inicial com carrossel, promoções e grade completa de jogos
const HomeScreen = ({ navigation }) => {
  const handleGamePress = (game) => {
    navigation.navigate('GameDetail', { game });
  };

  // Renderiza par de cards (2 colunas)
  const renderGamePair = ({ item }) => (
    <View style={styles.row}>
      <GameCard
        game={item[0]}
        onPress={() => handleGamePress(item[0])}
      />
      {item[1] ? (
        <GameCard
          game={item[1]}
          onPress={() => handleGamePress(item[1])}
        />
      ) : (
        <View style={styles.emptyCard} />
      )}
    </View>
  );

  // Agrupa jogos em pares para o FlatList de 2 colunas
  const gamePairs = games.reduce((result, game, index) => {
    if (index % 2 === 0) result.push([game]);
    else result[result.length - 1].push(game);
    return result;
  }, []);

  const ListHeader = () => (
    <View>
      {/* Carrossel de lançamentos */}
      <Carousel games={games} onPress={handleGamePress} />

      {/* Promoções em destaque */}
      <PromoSection games={games} onPress={handleGamePress} />

      {/* Título da grade */}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header fixo com ícone do carrinho */}
      <Header navigation={navigation} />

      <FlatList
        data={gamePairs}
        keyExtractor={(_, index) => String(index)}
        renderItem={renderGamePair}
        ListHeaderComponent={<ListHeader />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: 20,
    paddingTop: 16,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  emptyCard: {
    flex: 1,
    margin: 6,
  },
});

export default HomeScreen;
