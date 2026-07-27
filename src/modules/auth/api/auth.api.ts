import { api } from "@/services/api/requests";
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  RefreshResponse,
  RegisterResponse,
  SendVerificationCodePayload,
  SendCodeResponse,
  VerifyEmailPayload,
  VerifyEmailResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  ChangePasswordPayload,
  ChangePasswordResponse,
} from "../types/auth.types";
import { refreshClient } from "@/services/api/client";

export const authApi = {
  login(payload: LoginPayload) {
    return api.post<AuthResponse, LoginPayload>("/auth/login", payload);
  },

  register(payload: RegisterPayload) {
    return api.post<RegisterResponse, RegisterPayload>("/auth/register", payload);
  },

  refresh() {
    return api.post<RefreshResponse>("/auth/refresh");
  },

  logout() {
    return api.get<void>("/auth/logout");
  },

  resendVerificationCode(payload: SendVerificationCodePayload) {
    return api.post<SendCodeResponse, SendVerificationCodePayload>(
      "/auth/resend-code-email-verification",
      payload,
    );
  },

  verifyEmail(payload: VerifyEmailPayload) {
    return api.patch<VerifyEmailResponse, VerifyEmailPayload>(
      "/auth/email-verification",
      payload,
    );
  },

  forgotPassword(payload: ForgotPasswordPayload) {
    return api.post<ForgotPasswordResponse, ForgotPasswordPayload>(
      "/auth/forgot-password/",
      payload,
    );
  },
  resetPassword(token: string, payload: ResetPasswordPayload) {
    return api.post<ResetPasswordResponse, ResetPasswordPayload>(
      `/auth/reset-password/${token}`,
      payload,
    );
  },

  changePassword(payload: ChangePasswordPayload) {
    return api.post<ChangePasswordResponse, ChangePasswordPayload>(
      "/auth/change-password",
      payload,
    );
  },
};

export async function refreshSession() {
  const res = await refreshClient.post<RefreshResponse>("/auth/refresh");
  return res.data;
}
