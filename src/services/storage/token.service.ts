const TOKEN_STORAGE_KEY = "token";
const REFRESH_TOKEN_STORAGE_KEY = "refreshToken";
const EXPIRES_AT_STORAGE_KEY = "expiresAt";

let accessToken: string | null = null;
let refreshToken: string | null = null;
let expiresAt: string | number | null = null;

function getStorage() {
  return typeof window !== "undefined" ? window.localStorage : null;
}

function setStorageValue(key: string, value: string) {
  const storage = getStorage();
  storage?.setItem(key, value);
}

function removeStorageValue(key: string) {
  const storage = getStorage();
  storage?.removeItem(key);
}

function normalizeExpiresAt(value: string | number | undefined) {
  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value === "number") {
    return value;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? value : parsed;
}

function syncCookie(key: string, value: string | null) {
  if (typeof document === "undefined") return;

  if (!value) {
    document.cookie = `${key}=; Max-Age=0; path=/;`;
    return;
  }

  document.cookie = `${key}=${encodeURIComponent(value)}; path=/; SameSite=Lax`;
}

export const TokenService = {
  setAccessToken: (token: string) => {
    accessToken = token;
    setStorageValue(TOKEN_STORAGE_KEY, token);
    syncCookie(TOKEN_STORAGE_KEY, token);
  },

  getAccessToken: () => {
    if (accessToken) return accessToken;

    const storedToken = getStorage()?.getItem(TOKEN_STORAGE_KEY);
    if (storedToken) {
      accessToken = storedToken;
      syncCookie(TOKEN_STORAGE_KEY, storedToken);
    }

    return accessToken;
  },

  setRefreshToken: (token: string) => {
    refreshToken = token;
    setStorageValue(REFRESH_TOKEN_STORAGE_KEY, token);
    syncCookie(REFRESH_TOKEN_STORAGE_KEY, token);
  },

  getRefreshToken: () => {
    if (refreshToken) return refreshToken;

    const storedToken = getStorage()?.getItem(REFRESH_TOKEN_STORAGE_KEY);
    if (storedToken) {
      refreshToken = storedToken;
      syncCookie(REFRESH_TOKEN_STORAGE_KEY, storedToken);
    }

    return refreshToken;
  },

  setAuthTokens: ({ token, refreshToken, expiresAt: rawExpiresAt }: { token: string; refreshToken: string; expiresAt?: string | number }) => {
    const normalizedExpiresAt = normalizeExpiresAt(rawExpiresAt);

    accessToken = token;
    refreshToken = refreshToken;
    expiresAt = normalizedExpiresAt;

    setStorageValue(TOKEN_STORAGE_KEY, token);
    setStorageValue(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
    syncCookie(TOKEN_STORAGE_KEY, token);
    syncCookie(REFRESH_TOKEN_STORAGE_KEY, refreshToken);

    if (normalizedExpiresAt !== null) {
      const storedValue = typeof normalizedExpiresAt === "number" ? String(normalizedExpiresAt) : normalizedExpiresAt;
      setStorageValue(EXPIRES_AT_STORAGE_KEY, storedValue);
      syncCookie(EXPIRES_AT_STORAGE_KEY, storedValue);
    }
  },

  getExpiresAt: () => {
    if (expiresAt !== null) return expiresAt;

    const storedValue = getStorage()?.getItem(EXPIRES_AT_STORAGE_KEY);
    if (storedValue) {
      expiresAt = normalizeExpiresAt(storedValue);
    }

    return expiresAt;
  },

  clearAccessToken: () => {
    accessToken = null;
    removeStorageValue(TOKEN_STORAGE_KEY);
    syncCookie(TOKEN_STORAGE_KEY, null);
  },

  clearRefreshToken: () => {
    refreshToken = null;
    removeStorageValue(REFRESH_TOKEN_STORAGE_KEY);
    syncCookie(REFRESH_TOKEN_STORAGE_KEY, null);
  },

  clearAuthTokens: () => {
    accessToken = null;
    refreshToken = null;
    expiresAt = null;
    removeStorageValue(TOKEN_STORAGE_KEY);
    removeStorageValue(REFRESH_TOKEN_STORAGE_KEY);
    removeStorageValue(EXPIRES_AT_STORAGE_KEY);
    syncCookie(TOKEN_STORAGE_KEY, null);
    syncCookie(REFRESH_TOKEN_STORAGE_KEY, null);
    syncCookie(EXPIRES_AT_STORAGE_KEY, null);
  },
};
