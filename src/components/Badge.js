import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

// Badge colorido para plataforma, status de novo e promoção
const Badge = ({ type, discount }) => {
  const getBadgeStyle = () => {
    switch (type) {
      case 'PS5':
        return { backgroundColor: colors.ps5Badge };
      case 'PS4':
        return { backgroundColor: colors.ps4Badge };
      case 'PS4/PS5':
        return { backgroundColor: '#1a5276' };
      case 'NOVO':
        return { backgroundColor: colors.accent };
      case 'PROMO':
        return { backgroundColor: colors.promo };
      case 'Conta':
        return { backgroundColor: '#6c3483' };
      case 'DLC':
        return { backgroundColor: '#117a65' };
      default:
        return { backgroundColor: colors.card };
    }
  };

  const getLabel = () => {
    if (type === 'PROMO' && discount) return `-${discount}%`;
    return type;
  };

  return (
    <View style={[styles.badge, getBadgeStyle()]}>
      <Text style={styles.text}>{getLabel()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  text: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default Badge;
