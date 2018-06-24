const authToken = 'token';

let token;

export const getToken = () => {
  token = localStorage.getItem(authToken);
  return token;
};

export const signIn = (newToken) => {
  token = newToken;
  return localStorage.setItem(authToken, newToken);
};

export const signOut = () => {
  token = undefined;
  return localStorage.removeItem(authToken);
};
