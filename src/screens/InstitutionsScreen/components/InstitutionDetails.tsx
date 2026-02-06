import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Surface, Button } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Institution } from '../types/institution.types';

interface InstitutionDetailsProps {
  institution: Institution;
  onClose: () => void;
}

export const InstitutionDetails: React.FC<InstitutionDetailsProps> = ({
  institution,
  onClose,
}) => {
  const handleEdit = () => {
    console.log('Edit institution:', institution.id);
    // Здесь будет логика редактирования
  };

  const handleViewMap = () => {
    console.log('View map for institution:', institution.id);
    // Здесь будет логика просмотра карты
  };

  return (
    <Surface style={styles.container} elevation={4}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with close button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color="#717182" />
          </TouchableOpacity>
        </View>

        {/* Institution Icon */}
        <View style={styles.iconContainer}>
          <Icon name="office-building-outline" size={56} color="#8B7A9E" />
        </View>

        {/* Institution Name */}
        <Text style={styles.title}>{institution.name}</Text>

        {/* Address */}
        <View style={styles.addressContainer}>
          <Icon name="map-marker-outline" size={16} color="#717182" />
          <Text style={styles.address}>{institution.address}</Text>
        </View>

        {/* Manager */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Руководитель</Text>
          <Text style={styles.managerName}>{institution.manager}</Text>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Статистика</Text>
          
          <View style={styles.statRow}>
            <Icon name="camera-outline" size={20} color="#717182" />
            <Text style={styles.statText}>Камеры</Text>
            <Text style={styles.statValue}>{institution.stats.cameras}</Text>
          </View>

          <View style={styles.statRow}>
            <Icon name="account-group-outline" size={20} color="#717182" />
            <Text style={styles.statText}>Пользователи</Text>
            <Text style={styles.statValue}>{institution.stats.users}</Text>
          </View>

          <View style={styles.statRow}>
            <Icon name="alert-outline" size={20} color="#717182" />
            <Text style={styles.statText}>Инциденты за месяц</Text>
            <Text style={styles.statValue}>{institution.stats.incidents}</Text>
          </View>
        </View>

        {/* Active Modules */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Активные модули ЧС</Text>
          
          <View style={styles.moduleRow}>
            <View
              style={[
                styles.moduleDot,
                institution.activeModules.smokDetection && styles.moduleDotActive,
              ]}
            />
            <Text style={styles.moduleText}>Детекция дыма</Text>
          </View>

          <View style={styles.moduleRow}>
            <View
              style={[
                styles.moduleDot,
                institution.activeModules.fireDetection && styles.moduleDotActive,
              ]}
            />
            <Text style={styles.moduleText}>Детекция огня</Text>
          </View>

          <View style={styles.moduleRow}>
            <View
              style={[
                styles.moduleDot,
                institution.activeModules.accessControl && styles.moduleDotActive,
              ]}
            />
            <Text style={styles.moduleText}>Контроль доступа</Text>
          </View>

          <View style={styles.moduleRow}>
            <View
              style={[
                styles.moduleDot,
                institution.activeModules.perimeterMonitoring && styles.moduleDotActive,
              ]}
            />
            <Text style={styles.moduleText}>Мониторинг периметра</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button
            mode="contained"
            onPress={handleEdit}
            style={styles.editButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Редактировать
          </Button>

          <Button
            mode="outlined"
            onPress={handleViewMap}
            style={styles.mapButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.mapButtonLabel}
          >
            Карта объекта
          </Button>
        </View>
      </ScrollView>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 380,
    height: '100%',
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  closeButton: {
    padding: 4,
  },
  iconContainer: {
    width: 88,
    height: 88,
    borderRadius: 22,
    backgroundColor: '#E8E0F0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B1B1B',
    textAlign: 'center',
    marginBottom: 12,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  address: {
    fontSize: 14,
    color: '#717182',
    marginLeft: 6,
  },
  section: {
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1B1B',
    marginBottom: 16,
  },
  managerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  statText: {
    fontSize: 14,
    color: '#717182',
    marginLeft: 12,
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  moduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  moduleDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
    marginRight: 12,
  },
  moduleDotActive: {
    backgroundColor: '#4CAF50',
  },
  moduleText: {
    fontSize: 14,
    color: '#1B1B1B',
  },
  actions: {
    marginTop: 16,
    paddingBottom: 20,
  },
  editButton: {
    backgroundColor: '#A89AB8',
    borderRadius: 12,
    marginBottom: 12,
  },
  mapButton: {
    borderRadius: 12,
    borderColor: '#A89AB8',
    borderWidth: 1.5,
  },
  buttonContent: {
    height: 48,
  },
  buttonLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  mapButtonLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#A89AB8',
  },
});
