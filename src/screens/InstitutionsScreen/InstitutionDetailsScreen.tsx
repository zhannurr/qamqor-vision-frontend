import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import { Text, Surface, Chip } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Institution, ActiveModules } from './types/institution.types';
import { StatCard } from '../../components/UI/StatCard';
import { CustomButton } from '../../components/UI/CustomButton';

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

  const handleEdit = () => {
    console.log('Edit institution:', institution.organization_id);
    // Здесь будет логика редактирования
  };

  const handleViewMap = async () => {
    if (institution.map_url) {
      try {
        await Linking.openURL(institution.map_url);
      } catch (error) {
        console.error('Error opening map:', error);
      }
    } else {
      console.log('No map URL available for institution:', institution.organization_id);
    }
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
            <CustomButton
              label="Карта объекта"
              onPress={handleViewMap}
              variant="outline"
              size="small"
              icon="map-marker-outline"
            />
            <CustomButton
              label="Редактировать"
              onPress={handleEdit}
              variant="primary"
              size="small"
              icon="pencil-outline"
            />
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{institution.name}</Text>
            <Chip
              mode="flat"
              style={[
                styles.statusChip,
                institution.is_active && styles.statusChipActive,
              ]}
              textStyle={styles.statusChipText}
            >
              {institution.is_active ? 'Активно' : 'Неактивно'}
            </Chip>
          </View>
          <View style={styles.addressRow}>
            <Icon name="map-marker-outline" size={16} color="#717182" />
            <Text style={styles.address}>{institution.address}</Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <StatCard
            icon="information-outline"
            iconColor="#2196F3"
            iconBackgroundColor="#E3F2FD"
            value={institution.is_active ? 'Активно' : 'Неактивно'}
            label="Статус учреждения"
          />

          <StatCard
            icon="calendar-outline"
            iconColor="#4CAF50"
            iconBackgroundColor="#E8F5E9"
            value={new Date(institution.created_at).toLocaleDateString('ru-RU')}
            label="Дата создания"
          />

          <StatCard
            icon="clock-outline"
            iconColor="#FF9800"
            iconBackgroundColor="#FFF3E0"
            value={new Date(institution.updated_at).toLocaleDateString('ru-RU')}
            label="Последнее обновление"
          />

          <StatCard
            icon="puzzle-outline"
            iconColor="#9C27B0"
            iconBackgroundColor="#F3E5F5"
            value={Object.values(activeModules).filter(Boolean).length.toString()}
            label="Активных модулей"
          />
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
                  {institution.description || 'Описание не указано'}
                </Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>ID учреждения</Text>
                <Text style={styles.infoValue}>{institution.organization_id}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Статус</Text>
                <Text style={[styles.infoValue, institution.is_active && styles.activeStatus]}>
                  {institution.is_active ? 'Активно' : 'Неактивно'}
                </Text>
              </View>
            </Surface>

            {/* Active Modules */}
            <Surface style={styles.section} elevation={1}>
              <Text style={styles.sectionTitle}>Активные модули ЧС</Text>
              
              <View style={styles.modulesGrid}>
                <View
                  style={[
                    styles.moduleCard,
                    activeModules.smokDetection && styles.moduleCardActive,
                  ]}
                >
                  <View style={styles.moduleIcon}>
                    <Icon name="smoke" size={24} color={activeModules.smokDetection ? "#4CAF50" : "#717182"} />
                  </View>
                  <Text style={styles.moduleTitle}>Детекция дыма</Text>
                  <Text style={styles.moduleStatus}>
                    {activeModules.smokDetection ? 'Активен' : 'Неактивен'}
                  </Text>
                </View>

                <View
                  style={[
                    styles.moduleCard,
                    activeModules.fireDetection && styles.moduleCardActive,
                  ]}
                >
                  <View style={styles.moduleIcon}>
                    <Icon name="fire" size={24} color={activeModules.fireDetection ? "#4CAF50" : "#717182"} />
                  </View>
                  <Text style={styles.moduleTitle}>Детекция огня</Text>
                  <Text style={styles.moduleStatus}>
                    {activeModules.fireDetection ? 'Активен' : 'Неактивен'}
                  </Text>
                </View>

                <View
                  style={[
                    styles.moduleCard,
                    activeModules.accessControl && styles.moduleCardActive,
                  ]}
                >
                  <View style={styles.moduleIcon}>
                    <Icon name="shield-check-outline" size={24} color={activeModules.accessControl ? "#4CAF50" : "#717182"} />
                  </View>
                  <Text style={styles.moduleTitle}>Контроль доступа</Text>
                  <Text style={styles.moduleStatus}>
                    {activeModules.accessControl ? 'Активен' : 'Неактивен'}
                  </Text>
                </View>

                <View
                  style={[
                    styles.moduleCard,
                    activeModules.perimeterMonitoring && styles.moduleCardActive,
                  ]}
                >
                  <View style={styles.moduleIcon}>
                    <Icon name="eye-circle-outline" size={24} color={activeModules.perimeterMonitoring ? "#4CAF50" : "#717182"} />
                  </View>
                  <Text style={styles.moduleTitle}>Мониторинг периметра</Text>
                  <Text style={styles.moduleStatus}>
                    {activeModules.perimeterMonitoring ? 'Активен' : 'Неактивен'}
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
                <Text style={styles.contactLabel}>Адрес</Text>
                <Text style={styles.contactValue}>{institution.address}</Text>
              </View>

              {institution.map_url && (
                <TouchableOpacity 
                  style={styles.contactItem}
                  onPress={handleViewMap}
                >
                  <Text style={styles.contactLabel}>Карта</Text>
                  <Text style={[styles.contactValue, styles.linkText]}>Открыть на карте</Text>
                </TouchableOpacity>
              )}
              
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Создано</Text>
                <Text style={styles.contactValue}>
                  {new Date(institution.created_at).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </Text>
              </View>

              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Обновлено</Text>
                <Text style={styles.contactValue}>
                  {new Date(institution.updated_at).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </Text>
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
    borderRadius: 16,
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
    padding: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B1B1B',
    marginBottom: 24,
    letterSpacing: -0.5,
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
    gap: 16,
  },
  moduleCard: {
    width: '48%',
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#F0F0F0',
  },
  moduleCardActive: {
    backgroundColor: '#E8F5E9',
    borderColor: '#81C784',
  },
  moduleIcon: {
    marginBottom: 16,
  },
  moduleTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B1B1B',
    marginBottom: 6,
    lineHeight: 20,
  },
  moduleStatus: {
    fontSize: 13,
    color: '#717182',
    fontWeight: '500',
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
    borderRadius: 16,
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
    padding: 24,
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B1B1B',
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    marginBottom: 10,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#1B1B1B',
    marginLeft: 14,
    fontWeight: '500',
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
  linkText: {
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
  statusChipActive: {
    backgroundColor: '#D4F4DD',
  },
});

export default InstitutionDetailsScreen;
