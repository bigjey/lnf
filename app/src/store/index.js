import { AsyncStorage } from 'react-native';
import { action, observable } from 'mobx';
import axios from 'axios';

import { setRootComponent } from '../services/navigation';
import { TOKEN_STORAGE_KEY } from '../constants';

class AppState {
  @observable value = 1;

  @observable user = null;

  constructor() {}

  @action.bound
  inc(amount = 1) {
    this.value += amount;
  }

  async checkAuth() {
    const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

    if (!token) {
      this.user = null;
    } else {
      this.user = 1;
    }

    return new Promise(res => setTimeout(res, 2000));
  }

  @action.bound
  async login(token) {
    if (!token) {
      throw new Error('no token');
    }

    try {
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      this.user = 1;
      setRootComponent('app.main');
    } catch (err) {
      console.log(err);
    }
  }

  @action.bound
  async logout() {
    try {
      await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
      delete axios.defaults.headers.common['Authorization'];
      this.user = null;
      setRootComponent('app.login');
    } catch (err) {
      console.log(err);
    }
  }
}

export default new AppState();
