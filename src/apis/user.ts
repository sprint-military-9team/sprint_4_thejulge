import BASE_URL from '@/constants/BASEURL';
import { SigninDataType, SignupDataType } from '@/types';

export const postSignin = async (email: string, password: string): Promise<SigninDataType> => {
  const APIData: SigninDataType = {
    token: '',
    id: '',
    type: '',
    error: '',
  };

  const response = await fetch(`${BASE_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (!response.ok) {
    Object.assign(APIData, { error: String(response.status) });
    return APIData;
  }
  const data = await response.json();
  const {
    token,
    user: {
      item: { id, type },
    },
  } = data.item;
  Object.assign(APIData, { token, id, type });
  return APIData;
};

export const postSignup = async (
  email: string,
  password: string,
  type: 'employee' | 'employer',
): Promise<SignupDataType> => {
  const APIData = {
    error: '',
  };

  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      type,
    }),
  });

  if (!response.ok) {
    Object.assign(APIData, { error: String(response.status) });
    return APIData;
  }
  return APIData;
};
