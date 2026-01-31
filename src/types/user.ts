export interface IUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
  push_notification_permission: boolean;
  created_at: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  message: string;
  user: IUser;
}

export interface IApiError {
  error: string;
  message: string;
}

export interface IApiResponse<T> {
  data?: T;
  error?: IApiError;
  status: number;
}