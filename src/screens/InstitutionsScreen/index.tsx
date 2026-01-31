import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { InstitutionCard } from './components/InstitutionCard';
import { InstitutionDetails } from './components/InstitutionDetails';
import { useInstitutions } from './hooks/useInstitutions';

const { width } = Dimensions.get('window');

const InstitutionsScreen: React.FC = () => {
  const {
    institutions,
    selectedInstitution,
    isDetailsVisible,
    handleSelectInstitution,
    handleCloseDetails,
  } = useInstitutions();

  const handleAddInstitution = () => {
    console.log('Add new institution');
    // Здесь будет логика добавления нового учреждения
  };

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <ScrollView
        style={[
          styles.scrollView,
          isDetailsVisible && styles.scrollViewWithPanel,
        ]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Управление учреждениями</Text>
            <Text style={styles.subtitle}>
              Обзор и управление всеми учреждениями
            </Text>
          </View>
          <Button
            mode="contained"
            onPress={handleAddInstitution}
            style={styles.addButton}
            contentStyle={styles.addButtonContent}
            labelStyle={styles.addButtonLabel}
            icon={() => <Icon name="plus" size={20} color="#FFFFFF" />}
          >
            Добавить учреждение
          </Button>
        </View>

        {/* Institutions Grid */}
        <View style={styles.grid}>
          {institutions.map((institution) => (
            <View
              key={institution.id}
              style={[
                styles.gridItem,
                isDetailsVisible && styles.gridItemNarrow,
              ]}
            >
              <InstitutionCard
                institution={institution}
                onPress={() => handleSelectInstitution(institution)}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Details Panel */}
      {isDetailsVisible && selectedInstitution && (
        <Animated.View style={styles.detailsPanel}>
          <InstitutionDetails
            institution={selectedInstitution}
            onClose={handleCloseDetails}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBBBD8',
    flexDirection: 'row',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewWithPanel: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  headerContent: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1B1B1B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#717182',
  },
  addButton: {
    backgroundColor: '#A89AB8',
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  addButtonContent: {
    height: 48,
    paddingHorizontal: 8,
  },
  addButtonLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  gridItem: {
    width: width > 1200 ? '33.33%' : width > 800 ? '50%' : '100%',
    paddingHorizontal: 8,
  },
  gridItemNarrow: {
    width: width > 1400 ? '33.33%' : '50%',
  },
  detailsPanel: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default InstitutionsScreen;
