import { useState } from 'react';
import { register, IRegisterRequest } from '../api/auth';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  pushNotificationPermission: boolean;
}

interface RegisterFormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  general?: string;
}

interface SnackbarState {
  visible: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

export const useRegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    pushNotificationPermission: false,
  });
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    visible: false,
    message: '',
    type: 'info',
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/;
    return password.length >= 8 && passwordRegex.test(password);
  };

  const validateName = (name: string): boolean => {
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-']+$/;
    return name.length >= 2 && name.length <= 50 && nameRegex.test(name);
  };

  const validatePhoneNumber = (phone: string): boolean => {
    if (!phone) return true; // Optional field
    const phoneRegex = /^\+?[\d\s\-()]{10,15}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = (): boolean => {
    const newErrors: RegisterFormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email обязателен для заполнения';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Введите корректный email адрес';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен для заполнения';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Пароль должен содержать минимум 8 символов, заглавные и строчные буквы, цифру и специальный символ';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Подтвердите пароль';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    // First name validation
    if (!formData.firstName) {
      newErrors.firstName = 'Имя обязательно для заполнения';
    } else if (!validateName(formData.firstName)) {
      newErrors.firstName = 'Имя должно содержать от 2 до 50 символов и только буквы';
    }

    // Last name validation
    if (!formData.lastName) {
      newErrors.lastName = 'Фамилия обязательна для заполнения';
    } else if (!validateName(formData.lastName)) {
      newErrors.lastName = 'Фамилия должна содержать от 2 до 50 символов и только буквы';
    }

    // Phone number validation (optional)
    if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Введите корректный номер телефона';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: keyof RegisterFormData, value: string | boolean): void => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof RegisterFormErrors]) {
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
      const registerData: IRegisterRequest = {
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        push_notification_permission: formData.pushNotificationPermission,
      };

      // Add optional phone number if provided
      if (formData.phoneNumber) {
        registerData.phone_number = formData.phoneNumber;
      }

      const response = await register(registerData);

      if (response.error) {
        let errorMessage = 'Произошла ошибка при регистрации';

        if (response.status === 0) {
          errorMessage = response.error.message;
        } else {
          switch (response.status) {
            case 400:
              errorMessage = response.error.message || 'Неверный формат данных запроса';
              break;
            case 409:
              errorMessage = 'Пользователь с таким email уже существует';
              break;
            case 500:
              errorMessage = response.error.message || 'Ошибка сервера. Попробуйте позже.';
              break;
            default:
              errorMessage = response.error.message || 'Произошла ошибка при регистрации';
          }
        }

        setErrors({ general: errorMessage });
        setSnackbar({
          visible: true,
          message: errorMessage,
          type: 'error',
        });
        return;
      }

      if (response.data) {
        setSnackbar({
          visible: true,
          message: response.data.message || 'Регистрация успешна! Проверьте email для подтверждения.',
          type: 'success',
        });

        setRegistrationSuccess(true);

        // Reset form
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          pushNotificationPermission: false,
        });
        setErrors({});
      }
    } catch (error) {
      setErrors({
        general: 'Не удалось подключиться к серверу. Проверьте подключение к интернету.',
      });
      setSnackbar({
        visible: true,
        message: 'Не удалось подключиться к серверу',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const dismissSnackbar = () => {
    setSnackbar({ ...snackbar, visible: false });
  };

  return {
    formData,
    errors,
    isSubmitting,
    showPassword,
    showConfirmPassword,
    snackbar,
    registrationSuccess,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    dismissSnackbar,
  };
};
