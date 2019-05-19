import { AsyncStorage } from 'react-native';
import { action, observable } from 'mobx';
import axios from 'axios';

import { setRootLayout, pushToCurrentStack } from '../services/navigation';
import { TOKEN_STORAGE_KEY, USER_ID } from '../constants';

class UIStore {
  @observable error = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action.bound
  clearError() {
    this.error = '';
  }
}

export default UIStore;