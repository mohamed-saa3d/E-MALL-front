export type UserRole = "user" | "vendor" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role?: UserRole;
  avatarUrl?: string | null;
}

/* =========================
   Base Shared Types
========================= */

type EmailPayload = {
  email: string;
};
type PasswordPayload = {
  password: string;
};

type NewPasswordPayload = {
  newPassword: string;
  confirmPassword: string;
};

interface MessageResponse {
  message: string;
}

export interface AuthBaseResponse {
  token: string;
  refreshToken: string;
  expiresAt: string | number;
  user: AuthUser;
}

/* =========================
   Auth Payloads
========================= */

export type LoginPayload = EmailPayload & PasswordPayload;

export type RegisterPayload = EmailPayload &
  PasswordPayload & {
    name: string;
  };

export type ResetPasswordPayload = NewPasswordPayload;

export type ResetPasswordInput = {
  token: string;
  payload: ResetPasswordPayload;
};

export type ChangePasswordPayload = NewPasswordPayload & {
  oldPassword: string;
};
export type ForgotPasswordPayload = EmailPayload;

export type SendVerificationCodePayload = EmailPayload;

export interface VerifyEmailPayload extends EmailPayload {
  verifyCode: string;
}

export type UseLogoutOptions = {
  redirectToLogin?: boolean;
};

/* =========================
   Responses
========================= */

export interface AuthResponse extends AuthBaseResponse {}

export interface RefreshResponse extends AuthBaseResponse {}

export interface RegisterResponse extends AuthBaseResponse {
  session?: any;
}

export type SendCodeResponse = MessageResponse;

export type ForgotPasswordResponse = MessageResponse;

export interface ResetPasswordResponse extends MessageResponse {
  status: string;
}

export interface ChangePasswordResponse extends MessageResponse {
  status: string;
}

export interface VerifyEmailResponse {
  status: "success" | "fail" | "error";
  message: string;
  error?: {
    statusCode: number;
    status: string;
    isOperational: boolean;
  };
  stack?: string;
}

/* =========================
   Redux State
========================= */

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}
