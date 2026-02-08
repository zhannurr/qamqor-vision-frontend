import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AddUserModal } from './components/AddUserModal';
import { DeleteConfirmationDialog } from './components/DeleteConfirmationDialog';
import { useUsers } from './hooks/useUsers';
import { UserFormData, roleColors, roleDisplayNames } from './types/user.types';
import { CustomButton } from '../../components/UI/CustomButton';
import { Table, TableColumn } from '../../components/UI/Table';
import CustomSnackbar from '../../components/CustomSnackbar';

interface UsersScreenProps {
  navigation?: any;
}

const UsersScreen: React.FC<UsersScreenProps> = ({ navigation }) => {
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingUser, setEditingUser] = useState<any>(null);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState<'success' | 'error' | 'info'>('info');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const showSnackbar = (message: string, type: 'success' | 'error' | 'info') => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarVisible(true);
  };

  const handleAddUser = () => {
    setModalMode('create');
    setEditingUser(null);
    setIsModalVisible(true);
  };

  const handleEditUser = (user: any) => {
    setModalMode('edit');
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleDeleteUser = (user: any) => {
    setUserToDelete(user);
    setDeleteDialogVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      const result = await deleteUser(userToDelete.id);
      setDeleteDialogVisible(false);
      setUserToDelete(null);

      if (result) {
        showSnackbar('Пользователь успешно удален', 'success');
      } else {
        showSnackbar('Не удалось удалить пользователя', 'error');
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogVisible(false);
    setUserToDelete(null);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingUser(null);
  };

  const handleSubmitUser = async (data: UserFormData) => {
    let result;

    if (modalMode === 'edit' && editingUser) {
      result = await updateUser(editingUser.id, data);
      if (result) {
        setIsModalVisible(false);
        setEditingUser(null);
        showSnackbar('Пользователь успешно обновлен', 'success');
      } else {
        showSnackbar('Не удалось обновить пользователя', 'error');
      }
    } else {
      result = await createUser(data);
      if (result) {
        setIsModalVisible(false);
        setEditingUser(null);
        showSnackbar('Пользователь успешно создан', 'success');
      } else {
        showSnackbar('Не удалось создать пользователя', 'error');
      }
    }
  };

  const handleSelectUser = (user: any) => {
    // Navigate to user details if needed
    console.log('Selected user:', user);
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user: any) => {
    const matchesSearch =
      searchQuery === '' ||
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.organization_name && user.organization_name.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSearch;
  });

  const getStatusColor = (isVerified: boolean) => {
    return isVerified ? '#4CAF50' : '#FFA726';
  };

  const getStatusText = (isVerified: boolean) => {
    return isVerified ? 'Активен' : 'Ожидает активации';
  };

  const tableColumns: TableColumn<any>[] = [
    {
      key: 'name',
      header: 'ФИО',
      flex: 1.5,
      render: (user) => (
        <Text style={styles.tableCellText}>
          {user.first_name} {user.last_name}
        </Text>
      ),
    },
    {
      key: 'email',
      header: 'EMAIL',
      flex: 1.8,
      render: (user) => <Text style={styles.tableCellText}>{user.email}</Text>,
    },
    {
      key: 'role',
      header: 'РОЛЬ',
      flex: 1.2,
      render: (user) => (
        <View style={[styles.roleBadge, { backgroundColor: roleColors[user.role] || '#9E9E9E' }]}>
          <Text style={styles.roleBadgeText}>
            {roleDisplayNames[user.role] || user.role}
          </Text>
        </View>
      ),
    },
    {
      key: 'organization',
      header: 'ОРГАНИЗАЦИЯ',
      flex: 1.2,
      render: (user) => <Text style={styles.tableCellText}>{user.organization_name || '-'}</Text>,
    },
    {
      key: 'institution',
      header: 'УЧРЕЖДЕНИЕ',
      flex: 1.2,
      render: (user) => <Text style={styles.tableCellText}>{user.institution_name || '-'}</Text>,
    },
    {
      key: 'status',
      header: 'СТАТУС',
      flex: 1,
      render: (user) => (
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(user.is_verified) }]}>
          <Text style={styles.statusBadgeText}>
            {getStatusText(user.is_verified)}
          </Text>
        </View>
      ),
    },
    {
      key: 'created',
      header: 'ДАТА РЕГИСТРАЦИИ',
      flex: 1,
      render: (user) => (
        <Text style={styles.tableCellText}>
          {new Date(user.created_at).toLocaleDateString('ru-RU')}
        </Text>
      ),
    },
    {
      key: 'lastLogin',
      header: 'ПОСЛЕДНИЙ ВХОД',
      flex: 1,
      render: (user) => (
        <Text style={styles.tableCellText}>
          {user.last_login ? new Date(user.last_login).toLocaleDateString('ru-RU') : 'Никогда'}
        </Text>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Пользователи</Text>
          <Text style={styles.subtitle}>Управление пользователями системы</Text>
        </View>
        <CustomButton
          label="Добавить пользователя"
          onPress={handleAddUser}
          variant="primary"
          icon="account-plus"
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <MaterialCommunityIcons name="magnify" size={20} color="#9E9E9E" />
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск по имени или email..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9E9E9E"
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialCommunityIcons name="close-circle" size={20} color="#9E9E9E" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.filterButtons}>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialCommunityIcons name="filter-variant" size={18} color="#A89AB8" />
            <Text style={styles.filterButtonText}>Все учреждения</Text>
            <MaterialCommunityIcons name="chevron-down" size={18} color="#A89AB8" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Ещё фильтры</Text>
            <MaterialCommunityIcons name="tune" size={18} color="#A89AB8" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Table */}
      <Table
        columns={tableColumns}
        data={filteredUsers}
        keyExtractor={(user) => user.id}
        onRowPress={handleSelectUser}
        alternateRowColors={true}
      />

      {/* Modals */}
      <AddUserModal
        visible={isModalVisible}
        mode={modalMode}
        initialData={editingUser}
        onClose={handleCloseModal}
        onSubmit={handleSubmitUser}
      />

      <DeleteConfirmationDialog
        visible={deleteDialogVisible}
        userName={userToDelete ? `${userToDelete.first_name} ${userToDelete.last_name}` : ''}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <CustomSnackbar
        visible={snackbarVisible}
        message={snackbarMessage}
        type={snackbarType}
        onDismiss={() => setSnackbarVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8B5D8',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerContent: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1B1B1B',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#717182',
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#1B1B1B',
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterButtonText: {
    fontSize: 13,
    color: '#717182',
    fontWeight: '500',
  },
  tableCellText: {
    fontSize: 13,
    color: '#1B1B1B',
  },
  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  roleBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default UsersScreen;
