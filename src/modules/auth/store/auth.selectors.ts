import { RootState } from "@/store";

export const selectAuthUser = (state: RootState) => state.auth.user;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export const selectIsAuthInitialized = (state: RootState) => state.auth.isInitialized;

export const selectUserRole = (state: RootState) => state.auth.user?.role;
