export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  userId: number;
  name: string;
  email: string;
  phone: string;
  role: 'ADMIN' | 'MERCHANDISER' | 'STORE_MANAGER' | 'PURCHASE_MANAGER' | 'CUTTING_MANAGER' | 'SEWING_MANAGER' | 'FINISHING_MANAGER' | 'PACKING_MANAGER'  | 'PRODUCTION_MANAGER';
  hubId?: number;
  hubName?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}