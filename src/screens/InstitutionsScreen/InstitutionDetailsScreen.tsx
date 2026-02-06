import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Text, Surface, Button, Chip } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Institution } from './types/institution.types';

const { width } = Dimensions.get('window');

interface InstitutionDetailsScreenProps {
  route: {
    params: {
      institution: Institution;
    };
  };
  navigation: any;
}

const InstitutionDetailsScreen: React.FC<InstitutionDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const { institution } = route.params;

  const handleEdit = () => {
    console.log('Edit institution:', institution.id);
    // Здесь будет логика редактирования
  };

  const handleViewMap = () => {
    console.log('View map for institution:', institution.id);
    // Здесь будет логика просмотра карты
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-left" size={20} color="#717182" />
            <Text style={styles.backButtonText}>Назад к учреждениям</Text>
          </TouchableOpacity>

          <View style={styles.headerActions}>
            <Button
              mode="outlined"
              onPress={handleViewMap}
              style={styles.mapButton}
              contentStyle={styles.mapButtonContent}
              labelStyle={styles.mapButtonLabel}
              icon={() => <Icon name="map-marker-outline" size={18} color="#A89AB8" />}
            >
              Карта объекта
            </Button>
            <Button
              mode="contained"
              onPress={handleEdit}
              style={styles.editButton}
              contentStyle={styles.editButtonContent}
              labelStyle={styles.editButtonLabel}
              icon={() => <Icon name="pencil-outline" size={18} color="#FFFFFF" />}
            >
              Редактировать
            </Button>
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{institution.name}</Text>
            <Chip
              mode="flat"
              style={styles.statusChip}
              textStyle={styles.statusChipText}
            >
              Активно
            </Chip>
          </View>
          <View style={styles.addressRow}>
            <Icon name="map-marker-outline" size={16} color="#717182" />
            <Text style={styles.address}>{institution.address}</Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <Surface style={styles.statCard} elevation={1}>
            <View style={[styles.statIconContainer, { backgroundColor: '#E3F2FD' }]}>
              <Icon name="camera-outline" size={24} color="#2196F3" />
            </View>
            <Text style={styles.statValue}>{institution.stats.cameras}</Text>
            <Text style={styles.statLabel}>Всего камер</Text>
          </Surface>

          <Surface style={styles.statCard} elevation={1}>
            <View style={[styles.statIconContainer, { backgroundColor: '#E8F5E9' }]}>
              <Icon name="account-group-outline" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.statValue}>{institution.stats.users}</Text>
            <Text style={styles.statLabel}>Пользователей</Text>
          </Surface>

          <Surface style={styles.statCard} elevation={1}>
            <View style={[styles.statIconContainer, { backgroundColor: '#FFF3E0' }]}>
              <Icon name="alert-outline" size={24} color="#FF9800" />
            </View>
            <Text style={styles.statValue}>{institution.stats.incidents}</Text>
            <Text style={styles.statLabel}>Инцидентов за месяц</Text>
          </Surface>

          <Surface style={styles.statCard} elevation={1}>
            <View style={[styles.statIconContainer, { backgroundColor: '#F3E5F5' }]}>
              <Icon name="clock-outline" size={24} color="#9C27B0" />
            </View>
            <Text style={styles.statValue}>98%</Text>
            <Text style={styles.statLabel}>Время работы</Text>
          </Surface>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <View style={styles.leftColumn}>
            {/* General Information */}
            <Surface style={styles.section} elevation={1}>
              <Text style={styles.sectionTitle}>Общая информация</Text>
              
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Описание</Text>
                <Text style={styles.infoValue}>
                  Центральный офис компании с административными помещениями
                </Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Руководитель</Text>
                <Text style={styles.infoValue}>{institution.manager}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Статус</Text>
                <Text style={[styles.infoValue, styles.activeStatus]}>Активно</Text>
              </View>
            </Surface>

            {/* Active Modules */}
            <Surface style={styles.section} elevation={1}>
              <Text style={styles.sectionTitle}>Активные модули ЧС</Text>
              
              <View style={styles.modulesGrid}>
                <View
                  style={[
                    styles.moduleCard,
                    institution.activeModules.smokDetection && styles.moduleCardActive,
                  ]}
                >
                  <View style={styles.moduleIcon}>
                    <Icon name="smoke" size={24} color="#4CAF50" />
                  </View>
                  <Text style={styles.moduleTitle}>Детекция дыма</Text>
                  <Text style={styles.moduleStatus}>
                    {institution.activeModules.smokDetection ? 'Активен' : 'Неактивен'}
                  </Text>
                </View>

                <View
                  style={[
                    styles.moduleCard,
                    institution.activeModules.fireDetection && styles.moduleCardActive,
                  ]}
                >
                  <View style={styles.moduleIcon}>
                    <Icon name="fire" size={24} color="#4CAF50" />
                  </View>
                  <Text style={styles.moduleTitle}>Детекция огня</Text>
                  <Text style={styles.moduleStatus}>
                    {institution.activeModules.fireDetection ? 'Активен' : 'Неактивен'}
                  </Text>
                </View>

                <View
                  style={[
                    styles.moduleCard,
                    institution.activeModules.accessControl && styles.moduleCardActive,
                  ]}
                >
                  <View style={styles.moduleIcon}>
                    <Icon name="shield-check-outline" size={24} color="#4CAF50" />
                  </View>
                  <Text style={styles.moduleTitle}>Контроль доступа</Text>
                  <Text style={styles.moduleStatus}>
                    {institution.activeModules.accessControl ? 'Активен' : 'Неактивен'}
                  </Text>
                </View>

                <View
                  style={[
                    styles.moduleCard,
                    institution.activeModules.perimeterMonitoring && styles.moduleCardActive,
                  ]}
                >
                  <View style={styles.moduleIcon}>
                    <Icon name="eye-circle-outline" size={24} color="#4CAF50" />
                  </View>
                  <Text style={styles.moduleTitle}>Мониторинг периметра</Text>
                  <Text style={styles.moduleStatus}>
                    {institution.activeModules.perimeterMonitoring ? 'Активен' : 'Неактивен'}
                  </Text>
                </View>
              </View>
            </Surface>

            {/* Recent Incidents */}
            <Surface style={styles.section} elevation={1}>
              <Text style={styles.sectionTitle}>Последние инциденты</Text>
              
              <View style={styles.incidentItem}>
                <View style={[styles.incidentDot, { backgroundColor: '#FF9800' }]} />
                <View style={styles.incidentContent}>
                  <Text style={styles.incidentTitle}>Дым обнаружен</Text>
                  <Text style={styles.incidentTime}>2 часа назад</Text>
                </View>
                <Chip
                  mode="flat"
                  style={styles.incidentChip}
                  textStyle={styles.incidentChipText}
                >
                  Решено
                </Chip>
              </View>

              <View style={styles.incidentItem}>
                <View style={[styles.incidentDot, { backgroundColor: '#F44336' }]} />
                <View style={styles.incidentContent}>
                  <Text style={styles.incidentTitle}>Несанкционированный доступ</Text>
                  <Text style={styles.incidentTime}>5 часов назад</Text>
                </View>
                <Chip
                  mode="flat"
                  style={styles.incidentChip}
                  textStyle={styles.incidentChipText}
                >
                  Решено
                </Chip>
              </View>

              <View style={styles.incidentItem}>
                <View style={[styles.incidentDot, { backgroundColor: '#2196F3' }]} />
                <View style={styles.incidentContent}>
                  <Text style={styles.incidentTitle}>Движение на периметре</Text>
                  <Text style={styles.incidentTime}>1 день назад</Text>
                </View>
                <Chip
                  mode="flat"
                  style={styles.incidentChip}
                  textStyle={styles.incidentChipText}
                >
                  Решено
                </Chip>
              </View>
            </Surface>
          </View>

          {/* Right Sidebar */}
          <View style={styles.rightColumn}>
            {/* Quick Actions */}
            <Surface style={styles.sidebarSection} elevation={1}>
              <Text style={styles.sidebarTitle}>Быстрые действия</Text>
              
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="camera-plus-outline" size={20} color="#8B7A9E" />
                <Text style={styles.actionButtonText}>Управление камерами</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Icon name="account-multiple-outline" size={20} color="#8B7A9E" />
                <Text style={styles.actionButtonText}>Управление пользователями</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Icon name="history" size={20} color="#8B7A9E" />
                <Text style={styles.actionButtonText}>История инцидентов</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Icon name="chart-line" size={20} color="#8B7A9E" />
                <Text style={styles.actionButtonText}>Аналитика</Text>
              </TouchableOpacity>
            </Surface>

            {/* Contact Information */}
            <Surface style={styles.sidebarSection} elevation={1}>
              <Text style={styles.sidebarTitle}>Контактная информация</Text>
              
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Руководитель</Text>
                <Text style={styles.contactValue}>{institution.manager}</Text>
              </View>

              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Адрес</Text>
                <Text style={styles.contactValue}>{institution.address}</Text>
              </View>

              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Телефон</Text>
                <Text style={styles.contactValue}>+7 (727) 123-45-67</Text>
              </View>
            </Surface>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBBBD8',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 14,
    color: '#717182',
    marginLeft: 8,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  mapButton: {
    borderRadius: 8,
    borderColor: '#A89AB8',
    borderWidth: 1.5,
    backgroundColor: '#FFFFFF',
  },
  mapButtonContent: {
    height: 40,
    paddingHorizontal: 12,
  },
  mapButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A89AB8',
  },
  editButton: {
    backgroundColor: '#A89AB8',
    borderRadius: 8,
  },
  editButtonContent: {
    height: 40,
    paddingHorizontal: 12,
  },
  editButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  titleSection: {
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1B1B1B',
    marginRight: 16,
  },
  statusChip: {
    backgroundColor: '#E8F5E9',
    height: 28,
  },
  statusChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    fontSize: 14,
    color: '#717182',
    marginLeft: 6,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1B1B1B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#717182',
    textAlign: 'center',
  },
  mainContent: {
    flexDirection: 'row',
    gap: 24,
  },
  leftColumn: {
    flex: 2,
    gap: 24,
  },
  rightColumn: {
    width: 320,
    gap: 24,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B1B1B',
    marginBottom: 20,
  },
  infoItem: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: '#717182',
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 16,
    color: '#1B1B1B',
    lineHeight: 22,
  },
  activeStatus: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  moduleCard: {
    width: '48%',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  moduleCardActive: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  moduleIcon: {
    marginBottom: 12,
  },
  moduleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B1B1B',
    marginBottom: 4,
  },
  moduleStatus: {
    fontSize: 12,
    color: '#717182',
  },
  incidentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  incidentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  incidentContent: {
    flex: 1,
  },
  incidentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B1B1B',
    marginBottom: 2,
  },
  incidentTime: {
    fontSize: 12,
    color: '#717182',
  },
  incidentChip: {
    backgroundColor: '#E8F5E9',
    height: 24,
  },
  incidentChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4CAF50',
  },
  sidebarSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  sidebarTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B1B1B',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#1B1B1B',
    marginLeft: 12,
  },
  contactItem: {
    marginBottom: 16,
  },
  contactLabel: {
    fontSize: 12,
    color: '#717182',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
    color: '#1B1B1B',
    fontWeight: '500',
  },
});

export default InstitutionDetailsScreen;
