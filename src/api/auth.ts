import {
  ILoginRequest,
  ILoginResponse,
  IApiError,
  IApiResponse,
} from "../types/user";

// For React Native, you can configure this via expo-constants or react-native-config
// For now, using a direct constant - update this based on your environment setup
const API_BASE_URL = __DEV__
  ? "http://localhost:8080"
  : "https://api.qamqorvision.com";

const handleResponse = async <T>(
  response: Response
): Promise<IApiResponse<T>> => {
  const status = response.status;
  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    return {
      status,
      error: {
        error: "Invalid response",
        message: "Сервер вернул некорректный ответ",
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
        error: "Parse error",
        message: "Ошибка при обработке ответа сервера",
      },
    };
  }
};

export const login = async (
  credentials: ILoginRequest
): Promise<IApiResponse<ILoginResponse>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    return await handleResponse<ILoginResponse>(response);
  } catch (error) {
    let errorMessage = "Не удалось подключиться к серверу";

    if (error instanceof TypeError && error.message === "Failed to fetch") {
      errorMessage = `Не удалось подключиться к серверу API (${API_BASE_URL}). Убедитесь, что сервер запущен и доступен.`;
    } else if (error instanceof Error) {
      errorMessage = `Ошибка сети: ${error.message}`;
    }

    return {
      status: 0,
      error: {
        error: "Network error",
        message: errorMessage,
      },
    };
  }
};

export interface IRegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  push_notification_permission: boolean;
  role?: string;
}

export interface IRegisterResponse {
  message: string;
}

export const register = async (
  data: IRegisterRequest
): Promise<IApiResponse<IRegisterResponse>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await handleResponse<IRegisterResponse>(response);
  } catch (error) {
    let errorMessage = "Не удалось подключиться к серверу";

    if (error instanceof TypeError && error.message === "Failed to fetch") {
      errorMessage = `Не удалось подключиться к серверу API (${API_BASE_URL}). Убедитесь, что сервер запущен и доступен.`;
    } else if (error instanceof Error) {
      errorMessage = `Ошибка сети: ${error.message}`;
    }

    return {
      status: 0,
      error: {
        error: "Network error",
        message: errorMessage,
      },
    };
  }
};
