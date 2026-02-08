import { useState, useCallback, useEffect } from 'react';
import { User, UserFormData } from '../types/user.types';
import * as usersApi from '../../../api/users';
import { mockUsers } from '../data/mockUsers';

// Set to false to use real backend API
const USE_MOCK_DATA = true;

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setUsers(mockUsers);
      } else {
        const response = await usersApi.listUsers();
        if (response.data) {
          setUsers(response.data.users);
        } else if (response.error) {
          setError(response.error.message);
        }
      }
    } catch (err) {
      setError('Ошибка при загрузке пользователей');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (data: UserFormData) => {
    setLoading(true);
    setError(null);
    try {
      if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        const newUser: User = {
          id: `${Date.now()}`,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.phone_number || '',
          role: data.role,
          is_verified: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setUsers(prev => [...prev, newUser]);
        return true;
      } else {
        const response = await usersApi.createUser(data);

        if (response.data) {
          await loadUsers();
          return true;
        } else if (response.error) {
          setError(response.error.message);
          return false;
        }
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
      if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setUsers(prev => prev.map(user => 
          user.id === userId 
            ? { ...user, ...data, updated_at: new Date().toISOString() } 
            : user
        ));
        return true;
      } else {
        const response = await usersApi.updateUser(userId, data);

        if (response.data) {
          await loadUsers();
          return true;
        } else if (response.error) {
          setError(response.error.message);
          return false;
        }
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
      if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setUsers(prev => prev.filter(user => user.id !== userId));
        return true;
      } else {
        const response = await usersApi.deleteUser(userId);

        if (response.data) {
          await loadUsers();
          return true;
        } else if (response.error) {
          setError(response.error.message);
          return false;
        }
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
      if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setUsers(prev => prev.map(user => 
          user.id === userId 
            ? { ...user, is_verified: false } 
            : user
        ));
        return true;
      } else {
        const response = await usersApi.blockUser(userId);

        if (response.data) {
          await loadUsers();
          return true;
        } else if (response.error) {
          setError(response.error.message);
          return false;
        }
      }
    } catch (err) {
      setError('Ошибка при блокировке пользователя');
      console.error('Error blocking user:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadUsers]);

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
  };
};
