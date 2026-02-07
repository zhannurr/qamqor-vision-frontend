import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../api/auth';
import { ILoginResponse } from '../types/user';
import { useAuth } from '../contexts/AuthContext';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface SnackbarState {
  visible: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

export const useLoginForm = () => {
  const { login: authLogin } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    visible: false,
    message: '',
    type: 'info',
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email обязателен для заполнения';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Введите корректный email адрес';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен для заполнения';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: keyof LoginFormData, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      if (response.error) {
        let errorMessage = 'Произошла ошибка при входе в систему';

        if (response.status === 0) {
          errorMessage = response.error.message;
        } else {
          switch (response.status) {
            case 400:
              errorMessage = response.error.message || 'Неверный формат данных запроса';
              break;
            case 401:
              errorMessage = 'Неверный email или пароль';
              break;
            case 403:
              errorMessage = 'Email не подтвержден. Проверьте почту для подтверждения.';
              break;
            case 500:
              errorMessage = response.error.message || 'Ошибка сервера. Попробуйте позже.';
              break;
            default:
              errorMessage = response.error.message || 'Произошла ошибка при входе в систему';
          }
        }

        setErrors({ general: errorMessage });
        return;
      }

      if (response.data) {
        const loginData: ILoginResponse = response.data;

        // Сохраняем токен в AsyncStorage (для совместимости)
        await AsyncStorage.setItem('access_token', loginData.access_token);
        await AsyncStorage.setItem('user', JSON.stringify(loginData.user));

        // Используем контекст авторизации
        await authLogin(loginData.access_token, {
          user_id: loginData.user.id,
          email: loginData.user.email,
          role: loginData.user.role,
          full_name: `${loginData.user.first_name} ${loginData.user.last_name}`,
        });

        setSnackbar({
          visible: true,
          message: `Добро пожаловать в систему мониторинга, ${loginData.user.first_name}!`,
          type: 'success',
        });

        setFormData({ email: '', password: '' });
        setErrors({});
      }
    } catch (error) {
      setErrors({
        general: 'Не удалось подключиться к серверу. Проверьте подключение к интернету.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dismissSnackbar = () => {
    setSnackbar({ ...snackbar, visible: false });
  };

  return {
    formData,
    errors,
    isSubmitting,
    showPassword,
    snackbar,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    dismissSnackbar,
  };
};
