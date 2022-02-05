import { API_URL } from './config';
import { ICredentials } from './ICredentials';

const signinRoute = `${API_URL}/signin`;

export const signInUser = async (credentials: ICredentials) => {
  const response = await fetch(signinRoute, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (response.ok) return await response.json();
  if (response.status === 403) return { message: 'Incorrect e-mail or password' };
  return { message: response.statusText };
};
