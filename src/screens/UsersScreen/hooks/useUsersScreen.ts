import { useState, useCallback, useMemo } from 'react';
import { UserFormData } from '../types/user.types';
import { useUsers } from './useUsers';

export function useUsersScreen() {
  const {
    users,
    createUser,
    updateUser,
    deleteUser,
    getUserDetails,
    getLoginHistory,
  } = useUsers();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingUser, setEditingUser] = useState<any>(null);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState<'success' | 'error' | 'info'>('info');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const showSnackbar = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarVisible(true);
  }, []);

  const handleAddUser = useCallback(() => {
    setModalMode('create');
    setEditingUser(null);
    setIsModalVisible(true);
  }, []);

  const handleEditUser = useCallback((user: any) => {
    setModalMode('edit');
    setEditingUser(user);
    setIsModalVisible(true);
  }, []);

  const handleDeleteUser = useCallback((user: any) => {
    setUserToDelete(user);
    setDeleteDialogVisible(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!userToDelete) return;
    const result = await deleteUser(userToDelete.id);
    setDeleteDialogVisible(false);
    setUserToDelete(null);
    if (result) {
      showSnackbar('Пользователь успешно удален', 'success');
    } else {
      showSnackbar('Не удалось удалить пользователя', 'error');
    }
  }, [userToDelete, deleteUser, showSnackbar]);

  const handleCancelDelete = useCallback(() => {
    setDeleteDialogVisible(false);
    setUserToDelete(null);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
    setEditingUser(null);
  }, []);

  const handleSubmitUser = useCallback(async (data: UserFormData) => {
    if (modalMode === 'edit' && editingUser) {
      const result = await updateUser(editingUser.id, data);
      if (result) {
        setIsModalVisible(false);
        setEditingUser(null);
        showSnackbar('Пользователь успешно обновлен', 'success');
      } else {
        showSnackbar('Не удалось обновить пользователя', 'error');
      }
    } else {
      const result = await createUser(data);
      if (result) {
        setIsModalVisible(false);
        setEditingUser(null);
        showSnackbar('Пользователь успешно создан', 'success');
      } else {
        showSnackbar('Не удалось создать пользователя', 'error');
      }
    }
  }, [modalMode, editingUser, updateUser, createUser, showSnackbar]);

  const handleSelectUser = useCallback((user: any) => {
    setSelectedUser(user);
    setDetailsModalVisible(true);
  }, []);

  const handleCloseDetailsModal = useCallback(() => {
    setDetailsModalVisible(false);
    setSelectedUser(null);
  }, []);

  const handleEditFromDetails = useCallback(() => {
    if (selectedUser) {
      setDetailsModalVisible(false);
      handleEditUser(selectedUser);
    }
  }, [selectedUser, handleEditUser]);

  const handleDeleteFromDetails = useCallback(() => {
    if (selectedUser) {
      setDetailsModalVisible(false);
      handleDeleteUser(selectedUser);
    }
  }, [selectedUser, handleDeleteUser]);

  const filteredUsers = useMemo(
    () =>
      (users || []).filter((user: any) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          user.first_name?.toLowerCase().includes(q) ||
          user.last_name?.toLowerCase().includes(q) ||
          user.email?.toLowerCase().includes(q) ||
          user.organization_name?.toLowerCase().includes(q)
        );
      }),
    [users, searchQuery]
  );

  return {
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
    showSnackbar,
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
  };
}
