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
import { DeleteConfirmationDialog } from './components/DeleteConfirmationDialog';
import { useInstitutions } from './hooks/useInstitutions';
import { CustomButton } from '../../components/UI/CustomButton';
import CustomSnackbar from '../../components/CustomSnackbar';

const { width } = Dimensions.get('window');

interface InstitutionsScreenProps {
  navigation: any;
}

const InstitutionsScreen: React.FC<InstitutionsScreenProps> = ({ navigation }) => {
  const { institutions, loading, error, createInstitution, updateInstitution, deleteInstitution } = useInstitutions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingInstitution, setEditingInstitution] = useState<any>(null);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [institutionToDelete, setInstitutionToDelete] = useState<any>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState<'success' | 'error' | 'info'>('info');

  const showSnackbar = (message: string, type: 'success' | 'error' | 'info') => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarVisible(true);
  };

  const handleAddInstitution = () => {
    setModalMode('create');
    setEditingInstitution(null);
    setIsModalVisible(true);
  };

  const handleEditInstitution = (institution: any) => {
    setModalMode('edit');
    setEditingInstitution(institution);
    setIsModalVisible(true);
  };

  const handleDeleteInstitution = (institution: any) => {
    setInstitutionToDelete(institution);
    setDeleteDialogVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (institutionToDelete) {
      const result = await deleteInstitution(institutionToDelete.organization_id);
      setInstitutionToDelete(null);
      
      if (result) {
        showSnackbar('Учреждение успешно удалено', 'success');
      } else {
        showSnackbar('Не удалось удалить учреждение', 'error');
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogVisible(false);
    setInstitutionToDelete(null);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingInstitution(null);
  };

  const handleSubmitInstitution = async (data: InstitutionFormData) => {
    console.log('Institution data:', data, 'Mode:', modalMode);
    let result;
    
    if (modalMode === 'edit' && editingInstitution) {
      result = await updateInstitution(editingInstitution.organization_id, data);
      if (result) {
        setIsModalVisible(false);
        setEditingInstitution(null);
        showSnackbar('Учреждение успешно обновлено', 'success');
      } else {
        showSnackbar('Не удалось обновить учреждение', 'error');
      }
    } else {
      result = await createInstitution(data);
      if (result) {
        setIsModalVisible(false);
        setEditingInstitution(null);
        showSnackbar('Учреждение успешно создано', 'success');
      } else {
        showSnackbar('Не удалось создать учреждение', 'error');
      }
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
                onEdit={() => handleEditInstitution(institution)}
                onDelete={() => handleDeleteInstitution(institution)}
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
        mode={modalMode}
        initialData={editingInstitution ? {
          name: editingInstitution.name,
          description: editingInstitution.description,
          address: editingInstitution.address,
          map_url: editingInstitution.map_url,
          active_modules: JSON.parse(editingInstitution.active_modules),
          organization_id: editingInstitution.organization_id,
          is_active: editingInstitution.is_active,
        } : undefined}
        onValidationError={(message) => showSnackbar(message, 'error')}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        visible={deleteDialogVisible}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        institutionName={institutionToDelete?.name || ''}
      />

      {/* Snackbar */}
      <CustomSnackbar
        visible={snackbarVisible}
        message={snackbarMessage}
        type={snackbarType}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
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
