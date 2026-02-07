import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Text } from 'react-native-paper';
import { InstitutionCard } from './components/InstitutionCard';
import { AddInstitutionModal, InstitutionFormData } from './components/AddInstitutionModal';
import { useInstitutions } from './hooks/useInstitutions';
import { CustomButton } from '../../components/UI/CustomButton';
import { green } from 'react-native-reanimated/lib/typescript/Colors';

const { width } = Dimensions.get('window');

interface InstitutionsScreenProps {
  navigation: any;
}

const InstitutionsScreen: React.FC<InstitutionsScreenProps> = ({ navigation }) => {
  const { institutions, loading, error, createInstitution } = useInstitutions();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddInstitution = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmitInstitution = async (data: InstitutionFormData) => {
    console.log('New institution data:', data);
    const result = await createInstitution(data);
    if (result) {
      setIsModalVisible(false);
    }
  };

  const handleSelectInstitution = (institution: any) => {
    navigation.navigate('InstitutionDetails', { institution });
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
          <View style={styles.headerContent}>
            <Text style={styles.title}>Управление учреждениями</Text>
            <Text style={styles.subtitle}>
              Обзор и управление всеми учреждениями
            </Text>
          </View>
          <CustomButton
            label="Добавить учреждение"
            onPress={handleAddInstitution}
            variant="primary"
            icon="plus"
          />
        </View>

        {/* Institutions Grid */}
        <View style={styles.grid}>
          {institutions.map((institution) => (
            <View key={institution.organization_id} style={styles.gridItem}>
              <InstitutionCard
                institution={institution}
                onPress={() => handleSelectInstitution(institution)}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Add Institution Modal */}
      <AddInstitutionModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSubmitInstitution}
      />
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
    borderRadius: 16,
    alignSelf: 'flex-start',
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
});

export default InstitutionsScreen;
