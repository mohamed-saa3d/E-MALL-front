let accessToken: string | null = null;

export const TokenService = {
  // Store the access token in memory

  setAccessToken: (token: string) => {
    accessToken = token;
  },

  //  Retrieve the current access token from memory

  getAccessToken: () => {
    return accessToken;
  },

  //  Clear the access token (e.g., on logout or refresh failure)

  clearAccessToken: () => {
    accessToken = null;
  },
};
