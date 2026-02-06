import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Surface, Chip } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Institution } from '../types/institution.types';

interface InstitutionCardProps {
  institution: Institution;
  onPress: () => void;
}

export const InstitutionCard: React.FC<InstitutionCardProps> = ({
  institution,
  onPress,
}) => {
  return (
    <Surface style={styles.card} elevation={1}>
      <View style={styles.header}>
        <Chip
          mode="flat"
          style={[
            styles.statusChip,
            institution.isActive ? styles.statusActive : styles.statusInactive,
          ]}
          textStyle={[
            styles.statusText,
            institution.isActive ? styles.statusTextActive : styles.statusTextInactive,
          ]}
        >
          {institution.isActive ? 'Активно' : 'Неактивно'}
        </Chip>
      </View>

      <Text style={styles.title}>{institution.name}</Text>
      <Text style={styles.manager}>Руководитель: {institution.manager}</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Icon name="camera-outline" size={20} color="#717182" />
          <Text style={styles.statValue}>{institution.stats.cameras}</Text>
          <Text style={styles.statLabel}>Камер</Text>
        </View>
        <View style={styles.statItem}>
          <Icon name="account-group-outline" size={20} color="#717182" />
          <Text style={styles.statValue}>{institution.stats.users}</Text>
          <Text style={styles.statLabel}>Польз.</Text>
        </View>
        <View style={styles.statItem}>
          <Icon name="alert-outline" size={20} color="#717182" />
          <Text style={styles.statValue}>{institution.stats.incidents}</Text>
          <Text style={styles.statLabel}>Инцид.</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
        <Icon name="eye-outline" size={18} color="#FFFFFF" />
        <Text style={styles.buttonText}>Детали</Text>
      </TouchableOpacity>
    </Surface>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#E8E0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusChip: {
    height: 28,
  },
  statusActive: {
    backgroundColor: '#D4F4DD',
  },
  statusInactive: {
    backgroundColor: '#FFE5E5',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  statusTextActive: {
    color: '#2D7A4C',
  },
  statusTextInactive: {
    color: '#C73E3E',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B1B1B',
    marginBottom: 8,
  },
  manager: {
    fontSize: 14,
    color: '#717182',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B1B1B',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#717182',
    marginTop: 2,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#A89AB8',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
});
