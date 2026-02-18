import { useState, useCallback, useEffect } from 'react';
import { User, UserFormData } from '../types/user.types';
import * as usersApi from '../../../api/users';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
        const response = await usersApi.listUsers();
        if (response.data) {
          setUsers(response.data.users || []);
        } else if (response.error) {
          setError(response.error.message);
        }
    } catch (err) {
      setError('Ошибка при загрузке пользователей');
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (data: UserFormData) => {
    setLoading(true);
    setError(null);
    try {
        const response = await usersApi.createUser(data);

        if (response.data) {
          await loadUsers();
          return true;
        } else if (response.error) {
          setError(response.error.message);
          return false;
        }
      
      return false;
    } catch (err) {
      setError('Ошибка при создании пользователя');
      console.error('Error creating user:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadUsers]);

  const updateUser = useCallback(async (
    userId: string,
    data: Partial<UserFormData>
  ) => {
    setLoading(true);
    setError(null);
    try {
        const response = await usersApi.updateUser(userId, data);

        if (response.data) {
          await loadUsers();
          return true;
        } else if (response.error) {
          setError(response.error.message);
          return false;
        }
    
    } catch (err) {
      setError('Ошибка при обновлении пользователя');
      console.error('Error updating user:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadUsers]);

  const deleteUser = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {

        const response = await usersApi.deleteUser(userId);

        if (response.data) {
          await loadUsers();
          return true;
        } else if (response.error) {
          setError(response.error.message);
          return false;
        }
    
    } catch (err) {
      setError('Ошибка при удалении пользователя');
      console.error('Error deleting user:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadUsers]);

  const blockUser = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
        const response = await usersApi.blockUser(userId);

        if (response.data) {
          await loadUsers();
          return true;
        } else if (response.error) {
          setError(response.error.message);
          return false;
        }
      
    } catch (err) {
      setError('Ошибка при блокировке пользователя');
      console.error('Error blocking user:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadUsers]);

  const getUserDetails = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {

        const response = await usersApi.getUserDetails(userId);

        if (response.data) {
          return response.data;
        } else if (response.error) {
          setError(response.error.message);
          return null;
        }
   
      return null;
    } catch (err) {
      setError('Ошибка при получении деталей пользователя');
      console.error('Error getting user details:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [users]);

  const getLoginHistory = useCallback(
    async (userId: string, limit: number = 10, offset: number = 0) => {
      const response = await usersApi.getUserLoginHistory(userId, limit, offset);
      if (response.data) return response.data;
      return null;
    },
    []
  );

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    loading,
    error,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
    blockUser,
    getUserDetails,
    getLoginHistory,
  };
};
