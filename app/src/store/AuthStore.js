import { AsyncStorage } from 'react-native';
import { action, observable } from 'mobx';
import axios from 'axios';

import { setRootLayout, pushToCurrentStack } from '../services/navigation';
import { TOKEN_STORAGE_KEY, USER_ID } from '../constants';

class AuthStore {
  @observable user = null;
  @observable userId = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  async checkAuth() {
    const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

    if (token) {
      this.userId = await AsyncStorage.getItem(USER_ID);
      this.postLogin(token);
    } else {
      this.logout();
    }

    return new Promise(res => setTimeout(res, 2000));
  }

  @action.bound
  async login(email, password) {
    this.error = '';
    try {
      const { data } = await axios.post('/auth/login', { email, password });
      this.userId = data.userId;
      await AsyncStorage.setItem(USER_ID, data.userId.toString());
      await this.postLogin(data.token);
      return data;
    } catch (error) {
      console.log('login failed: ', error);
      this.rootStore.uiStore.error = 'Login failed';
      throw error;
    }
  }

  @action.bound
  async postLogin(token) {
    if (!token) {
      throw new Error('no token');
    }
    await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    this.user = 1;
    await this.loadPosts();
    setRootLayout('home');
  }

  @action.bound
  async logout() {
    try {
      await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
      await AsyncStorage.removeItem(USER_ID);
      delete axios.defaults.headers.common['Authorization'];
      this.user = null;
      await setRootLayout('login');
    } catch (err) {
      console.log(err);
    }
  }

  @action.bound
  async register(email, password) {
    this.rootStore.uiStore.error = '';
    try {
      await axios.post('/auth/register', { email, password });
      setRootLayout('login');
    } catch (e) {
      this.rootStore.uiStore.error = 'Failed to register';
      console.log('register error: ', e);
    }
  }
}

export default AuthStore;