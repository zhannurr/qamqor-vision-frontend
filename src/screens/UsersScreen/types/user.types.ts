export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  role: string;
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface UserFormData {
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  role: string;
  password?: string;
  push_notification_permission?: boolean;
}

export type UserRole = 'admin' | 'user' | 'manager' | 'operator' | 'analyst';

export const roleDisplayNames: Record<string, string> = {
  'admin': 'Администратор',
  'user': 'Пользователь',
  'manager': 'Менеджер',
  'operator': 'Оператор',
  'analyst': 'Аналитик',
};

export const roleColors: Record<string, string> = {
  'admin': '#9C27B0',
  'manager': '#FF9800',
  'operator': '#4CAF50',
  'analyst': '#2196F3',
  'user': '#757575',
};
