import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface StatCardProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
  iconBackgroundColor: string;
  value: string | number;
  label: string;
  elevation?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  iconColor,
  iconBackgroundColor,
  value,
  label,
  elevation = 1,
}) => {
  return (
    <Surface style={styles.statCard} elevation={elevation}>
      <View style={styles.statHeader}>
        <View style={[styles.statIconContainer, { backgroundColor: iconBackgroundColor }]}>
          <MaterialCommunityIcons name={icon} size={24} color={iconColor} />
        </View>
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <Text style={styles.statLabel}>{label}</Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'flex-start',
    minHeight: 140,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  statLabel: {
    fontSize: 13,
    color: '#717182',
    lineHeight: 18,
  },
});
