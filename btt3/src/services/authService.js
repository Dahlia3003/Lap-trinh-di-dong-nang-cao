import realm from '../realm';
import API_BASE_URL from '../config/apiConfig';

export const saveAccount = (account) => {
  realm.write(() => {
    realm.create('Account', account, 'modified');
  });
};

export const getAccount = () => {
  return realm.objects('Account')[0];
};

export const clearAccount = () => {
  realm.write(() => {
    const allAccounts = realm.objects('Account');
    realm.delete(allAccounts);
  });
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/oauth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { token, account } = await response.json();
      saveAccount({ ...account, token });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Login failed', error);
    return false;
  }
};