import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserFormData } from '../screens/UsersScreen/types/user.types';
import { IApiResponse, IApiError } from '../types/user';

const API_BASE_URL = __DEV__
  ? 'http://localhost:8080'
  : 'https://api.qamqorvision.com';

const handleResponse = async <T>(
  response: Response
): Promise<IApiResponse<T>> => {
  const status = response.status;
  const contentType = response.headers.get('content-type');

  if (!contentType?.includes('application/json')) {
    return {
      status,
      error: {
        error: 'Invalid response',
        message: 'Сервер вернул некорректный ответ',
      },
    };
  }

  try {
    const data = await response.json();

    if (!response.ok) {
      return {
        status,
        error: data as IApiError,
      };
    }

    return {
      status,
      data: data as T,
    };
  } catch (error) {
    return {
      status,
      error: {
        error: 'Parse error',
        message: 'Ошибка при обработке ответа сервера',
      },
    };
  }
};

const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    return token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

interface ListUsersResponse {
  users: User[];
  total: number;
}

interface CreateUserResponse {
  user_id: string;
  message: string;
}

interface UpdateUserResponse {
  message: string;
}

interface DeleteUserResponse {
  message: string;
}

export const listUsers = async (): Promise<IApiResponse<ListUsersResponse>> => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/v1/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    return await handleResponse<ListUsersResponse>(response);
  } catch (error) {
    return {
      status: 0,
      error: {
        error: 'Network error',
        message: 'Не удалось подключиться к серверу',
      },
    };
  }
};

export const createUser = async (
  data: UserFormData
): Promise<IApiResponse<CreateUserResponse>> => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/v1/users/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    return await handleResponse<CreateUserResponse>(response);
  } catch (error) {
    return {
      status: 0,
      error: {
        error: 'Network error',
        message: 'Не удалось подключиться к серверу',
      },
    };
  }
};

export const updateUser = async (
  userId: string,
  data: Partial<UserFormData>
): Promise<IApiResponse<UpdateUserResponse>> => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/v1/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    return await handleResponse<UpdateUserResponse>(response);
  } catch (error) {
    return {
      status: 0,
      error: {
        error: 'Network error',
        message: 'Не удалось подключиться к серверу',
      },
    };
  }
};

export const deleteUser = async (
  userId: string
): Promise<IApiResponse<DeleteUserResponse>> => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/v1/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    return await handleResponse<DeleteUserResponse>(response);
  } catch (error) {
    return {
      status: 0,
      error: {
        error: 'Network error',
        message: 'Не удалось подключиться к серверу',
      },
    };
  }
};

export const blockUser = async (
  userId: string
): Promise<IApiResponse<UpdateUserResponse>> => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/v1/users/${userId}/block`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    return await handleResponse<UpdateUserResponse>(response);
  } catch (error) {
    return {
      status: 0,
      error: {
        error: 'Network error',
        message: 'Не удалось подключиться к серверу',
      },
    };
  }
};
