import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GameCard from '../components/GameCard';
import { games } from '../data/games';
import colors from '../theme/colors';

// Filtros disponíveis no catálogo
const FILTERS = [
  { key: 'Todos', label: 'Todos' },
  { key: 'PS5', label: 'PS5' },
  { key: 'PS4', label: 'PS4' },
  { key: 'Promoções', label: '🔥 Promoções' },
  { key: 'Lançamentos', label: '🆕 Lançamentos' },
  { key: 'Jogos', label: 'Jogos' },
  { key: 'Contas', label: 'Contas' },
];

// Tela de catálogo com busca e filtros
const CatalogScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  // Filtra os jogos conforme busca e filtro selecionado
  const filteredGames = useMemo(() => {
    let result = [...games];

    // Aplica filtro de categoria
    switch (activeFilter) {
      case 'PS5':
        result = result.filter(
          (g) => g.platform === 'PS5' || g.platform === 'PS4/PS5'
        );
        break;
      case 'PS4':
        result = result.filter(
          (g) => g.platform === 'PS4' || g.platform === 'PS4/PS5'
        );
        break;
      case 'Promoções':
        result = result.filter((g) => g.isPromo);
        break;
      case 'Lançamentos':
        result = result.filter((g) => g.isNew);
        break;
      case 'Jogos':
        result = result.filter((g) => g.type === 'Jogo');
        break;
      case 'Contas':
        result = result.filter((g) => g.type === 'Conta');
        break;
      default:
        break;
    }

    // Aplica busca por texto
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(query) ||
          g.genre.toLowerCase().includes(query)
      );
    }

    return result;
  }, [search, activeFilter]);

  // Agrupa em pares para grade de 2 colunas
  const gamePairs = filteredGames.reduce((result, game, index) => {
    if (index % 2 === 0) result.push([game]);
    else result[result.length - 1].push(game);
    return result;
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <GameCard
        game={item[0]}
        onPress={() => navigation.navigate('GameDetail', { game: item[0] })}
      />
      {item[1] ? (
        <GameCard
          game={item[1]}
          onPress={() => navigation.navigate('GameDetail', { game: item[1] })}
        />
      ) : (
        <View style={styles.emptyCard} />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Barra de busca */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar jogo ou gênero..."
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Chips de filtro */}
      <FlatList
        horizontal
        data={FILTERS}
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterChip,
              activeFilter === item.key && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter(item.key)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === item.key && styles.filterTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        style={styles.filtersRow}
      />

      {/* Lista de jogos */}
      <FlatList
        data={gamePairs}
        keyExtractor={(_, index) => String(index)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum jogo encontrado</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchBar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInput: {
    backgroundColor: colors.background,
    color: colors.text,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filtersRow: {
    maxHeight: 52,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filtersContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'transparent',
  },
  filterChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  filterText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  filterTextActive: {
    color: colors.background,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  emptyCard: {
    flex: 1,
    margin: 6,
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});

export default CatalogScreen;
