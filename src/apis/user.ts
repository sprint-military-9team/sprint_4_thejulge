import BASE_URL from '@/constants/BASEURL';
import Cookies from 'js-cookie';

const getShopId = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`);
  if (!response.ok) {
    return '';
  }
  const data = await response.json();
  const responseData = data?.item?.shop?.item;
  return responseData?.id || '';
};
export const postSignin = async (email: string, password: string) => {
  const APIData = {
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
  Cookies.set('token', token);
  Cookies.set('userId', id);
  Cookies.set('type', type);
  return APIData;
};

export const postSignup = async (email: string, password: string, type: 'employee' | 'employer') => {
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
