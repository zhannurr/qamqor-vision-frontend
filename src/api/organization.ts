import { IApiError, IApiResponse } from "../types/user";

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

const getAuthToken = async (): Promise<string | null> => {
  try {
    // Импортируем AsyncStorage для получения токена
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

export interface Organization {
  organization_id: string;
  name: string;
  description: string;
  address: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  map_url: string;
  active_modules: string;
}

export interface CreateOrganizationRequest {
  name: string;
  description: string;
  address: string;
  map_url: string;
  active_modules: string;
}

export interface UpdateOrganizationRequest {
  organization_id: string;
  name: string;
  description: string;
  address: string;
  is_active: boolean;
  map_url: string;
  active_modules: string;
}

export interface OrganizationResponse {
  organization: Organization;
}

export interface ListOrganizationsResponse {
  organizations: Organization[];
}

export interface DeleteOrganizationResponse {
  success: boolean;
  message: string;
}

export interface AddManagerRequest {
  organization_id: string;
  manager_user_id: string;
}

export interface AddManagerResponse {
  success: boolean;
  message: string;
}

export interface RemoveManagerRequest {
  organization_id: string;
  manager_user_id: string;
}

export interface RemoveManagerResponse {
  success: boolean;
  message: string;
}

export interface GetOrganizationManagersResponse {
  manager_user_ids: string[];
}

// Create Organization
export const createOrganization = async (
  data: CreateOrganizationRequest
): Promise<IApiResponse<OrganizationResponse>> => {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${API_BASE_URL}/api/v1/organizations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    return await handleResponse<OrganizationResponse>(response);
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

// Get Organization by ID
export const getOrganization = async (
  organizationId: string
): Promise<IApiResponse<OrganizationResponse>> => {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `${API_BASE_URL}/api/v1/organizations/${organizationId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    return await handleResponse<OrganizationResponse>(response);
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

// Update Organization
export const updateOrganization = async (
  data: UpdateOrganizationRequest
): Promise<IApiResponse<OrganizationResponse>> => {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `${API_BASE_URL}/api/v1/organizations/${data.organization_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(data),
      }
    );

    return await handleResponse<OrganizationResponse>(response);
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

// Delete Organization
export const deleteOrganization = async (
  organizationId: string
): Promise<IApiResponse<DeleteOrganizationResponse>> => {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `${API_BASE_URL}/api/v1/organizations/${organizationId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    return await handleResponse<DeleteOrganizationResponse>(response);
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

// List User Organizations
export const listUserOrganizations = async (): Promise<
  IApiResponse<ListOrganizationsResponse>
> => {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${API_BASE_URL}/api/v1/organizations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    return await handleResponse<ListOrganizationsResponse>(response);
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

// Add Manager to Organization
export const addManager = async (
  data: AddManagerRequest
): Promise<IApiResponse<AddManagerResponse>> => {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `${API_BASE_URL}/api/v1/organizations/${data.organization_id}/managers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ manager_user_id: data.manager_user_id }),
      }
    );

    return await handleResponse<AddManagerResponse>(response);
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

// Remove Manager from Organization
export const removeManager = async (
  data: RemoveManagerRequest
): Promise<IApiResponse<RemoveManagerResponse>> => {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `${API_BASE_URL}/api/v1/organizations/${data.organization_id}/managers/${data.manager_user_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    return await handleResponse<RemoveManagerResponse>(response);
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

// Get Organization Managers
export const getOrganizationManagers = async (
  organizationId: string
): Promise<IApiResponse<GetOrganizationManagersResponse>> => {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `${API_BASE_URL}/api/v1/organizations/${organizationId}/managers`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    return await handleResponse<GetOrganizationManagersResponse>(response);
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
