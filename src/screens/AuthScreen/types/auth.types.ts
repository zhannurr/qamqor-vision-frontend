export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  pushNotificationPermission: boolean;
}

export interface AuthFormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  general?: string;
}

export interface SnackbarState {
  visible: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}
