import { AsyncStorage } from 'react-native';
import { action, observable } from 'mobx';

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
}

export default new AppState();
