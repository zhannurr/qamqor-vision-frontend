import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Surface, Chip } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { ContextMenu } from '../../../components/UI/ContextMenu';
import { Institution, ActiveModules } from '../types/institution.types';

interface InstitutionCardProps {
  institution: Institution;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const InstitutionCard: React.FC<InstitutionCardProps> = ({
  institution,
  onPress,
  onEdit,
  onDelete,
}) => {
  const menuItems = [
    { title: 'Редактировать', leadingIcon: 'pencil-outline' as const, onPress: onEdit },
    { title: 'Удалить', leadingIcon: 'delete-outline' as const, onPress: onDelete, destructive: true },
  ];

  // Parse active modules from JSON string
  let activeModules: ActiveModules = {
    smokDetection: false,
    fireDetection: false,
    accessControl: false,
    perimeterMonitoring: false,
  };
  
  try {
    if (institution.active_modules) {
      activeModules = JSON.parse(institution.active_modules);
    }
  } catch (error) {
    console.error('Error parsing active modules:', error);
  }

  const activeModulesCount = Object.values(activeModules).filter(Boolean).length;

  return (
    <Surface style={styles.card} elevation={1}>
      <View style={styles.header}>
        <Chip
          mode="flat"
          style={[
            styles.statusChip,
            institution.is_active ? styles.statusActive : styles.statusInactive,
          ]}
          textStyle={[
            styles.statusText,
            institution.is_active ? styles.statusTextActive : styles.statusTextInactive,
          ]}
        >
          {institution.is_active ? 'Активно' : 'Неактивно'}
        </Chip>
        <ContextMenu
          items={menuItems}
          anchor={
            <View style={styles.menuButton}>
              <Icon name="dots-vertical" size={24} color="#717182" />
            </View>
          }
        />
      </View>

      <Text style={styles.title}>{institution.name}</Text>
      <Text style={styles.manager} numberOfLines={1}>{institution.description || 'Нет описания'}</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Icon name="map-marker-outline" size={20} color="#717182" />
          <Text style={styles.statValue} numberOfLines={1}>{institution.address}</Text>
          <Text style={styles.statLabel}>Адрес</Text>
        </View>
        <View style={styles.statItem}>
          <Icon name="puzzle-outline" size={20} color="#717182" />
          <Text style={styles.statValue}>{activeModulesCount}</Text>
          <Text style={styles.statLabel}>Модулей</Text>
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
  menuButton: {
    padding: 4,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
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
    borderRadius: 16,
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
