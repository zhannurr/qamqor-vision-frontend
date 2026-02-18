import { useState, useEffect, useCallback } from 'react';
import { UserFormData } from '../types/user.types';

const initialFormData: UserFormData = {
  email: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  role: 'user',
  password: '',
  push_notification_permission: false,
};

export function useAddUserForm(
  visible: boolean,
  mode: 'create' | 'edit',
  initialData: UserFormData | null | undefined,
  onClose: () => void,
  onSubmit: (data: UserFormData) => void
) {
  const [formData, setFormData] = useState<UserFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  useEffect(() => {
    if (visible) {
      if (mode === 'edit' && initialData) {
        setFormData({ ...initialData, password: '' });
      } else {
        setFormData(initialFormData);
      }
      setErrors({});
    }
  }, [visible, mode, initialData]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'Имя обязательно';
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Фамилия обязательна';
    }
    if (mode === 'create' && !formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, mode]);

  const handleSubmit = useCallback(() => {
    if (validateForm()) {
      onSubmit(formData);
    }
  }, [formData, validateForm, onSubmit]);

  const handleInputChange = useCallback((field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const handleClose = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setShowRoleDropdown(false);
    onClose();
  }, [onClose]);

  return {
    formData,
    errors,
    showRoleDropdown,
    setShowRoleDropdown,
    handleInputChange,
    handleSubmit,
    handleClose,
  };
}
