import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AddUserModal } from './components/AddUserModal';
import { DeleteConfirmation } from '../../components/DeleteConfrimation';
import { UserDetailsModal } from './components/UserDetailsModal';
import { useUsersScreen } from './hooks/useUsersScreen';
import { roleColors, roleDisplayNames } from './types/user.types';
import { CustomButton } from '../../components/UI/CustomButton';
import { ContextMenu } from '../../components/UI/ContextMenu';
import { Table, TableColumn } from '../../components/UI/Table';
import CustomSnackbar from '../../components/CustomSnackbar';

interface UsersScreenProps {
  navigation?: any;
}

const UsersScreen: React.FC<UsersScreenProps> = ({ navigation }) => {
  const {
    filteredUsers,
    searchQuery,
    setSearchQuery,
    isModalVisible,
    modalMode,
    editingUser,
    deleteDialogVisible,
    detailsModalVisible,
    selectedUser,
    snackbarVisible,
    snackbarMessage,
    snackbarType,
    setSnackbarVisible,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    handleConfirmDelete,
    handleCancelDelete,
    handleCloseModal,
    handleSubmitUser,
    handleSelectUser,
    handleCloseDetailsModal,
    handleEditFromDetails,
    handleDeleteFromDetails,
    getUserDetails,
    getLoginHistory,
  } = useUsersScreen();

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
      key: 'phone_number',
      header: 'ТЕЛЕФОН',
      flex: 1.2,
      render: (user) => <Text style={styles.tableCellText}>{user.phone_number}</Text>,
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
      key: 'actions',
      header: 'ДЕЙСТВИЯ',
      flex: 0.4,
      render: (user) => (
        <ContextMenu
          items={[
            {
              title: 'Редактировать',
              leadingIcon: 'pencil-outline',
              onPress: () => handleEditUser(user),
            },
            {
              title: 'Удалить',
              leadingIcon: 'delete-outline',
              onPress: () => handleDeleteUser(user),
              destructive: true,
            },
          ]}
          anchor={
            <View style={styles.actionsAnchor}>
              <MaterialCommunityIcons name="dots-vertical" size={24} color="#717182" />
            </View>
          }
        />
      ),
    },
  ];

  return (
    <View style={styles.container}>
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
      </View>

      <Table
        columns={tableColumns}
        data={filteredUsers}
        keyExtractor={(user) => user.id}
        onRowPress={handleSelectUser}
        alternateRowColors={true}
      />

      <AddUserModal
        visible={isModalVisible}
        mode={modalMode}
        initialData={editingUser}
        onClose={handleCloseModal}
        onSubmit={handleSubmitUser}
      />

      <DeleteConfirmation
        visible={deleteDialogVisible}
        onConfirm={handleConfirmDelete}
        onClose={handleCancelDelete}
        message="Вы уверены, что хотите удалить пользователя?"
        warning="Все связанные данные, включая камеры и записи, будут безвозвратно удалены."
      />

      <UserDetailsModal
        visible={detailsModalVisible}
        user={selectedUser}
        onClose={handleCloseDetailsModal}
        onEdit={handleEditFromDetails}
        onBlock={() => {}}
        onDelete={handleDeleteFromDetails}
        onGetUserDetails={getUserDetails}
        onGetLoginHistory={getLoginHistory}
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
  actionsAnchor: {
    padding: 4,
    alignItems: 'flex-end',
  },
});

export default UsersScreen;
