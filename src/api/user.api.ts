import { API_URL } from './config';
import { IUser } from './IUser';

const usersRoute = `${API_URL}/users`;

export const createUser = async (user: IUser) => {
  const response = await fetch(usersRoute, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (response.ok) return 'Success';
  if (response.status === 417) return 'User already exist';
  if (response.status === 422) return 'Incorrect e-mail or password';
  return response.statusText;
};
