import { QueryClient } from "@tanstack/react-query";
import { AppDispatch } from "@/store/index";
import { clearCredentials } from "../store/auth.slice";
import { TokenService } from "@/services/storage/token.service";

interface ClearAuthStateOptions {
  dispatch: AppDispatch;
  queryClient: QueryClient;
}

export function clearAuthState({ dispatch, queryClient }: ClearAuthStateOptions) {
  TokenService.clearAuthTokens();
  dispatch(clearCredentials());
  queryClient.clear();
}
