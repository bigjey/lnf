import { AsyncStorage } from 'react-native';
import { action, observable, computed } from 'mobx';
import axios from 'axios';

import { setRootLayout, pushToCurrentStack } from '../services/navigation';
import { TOKEN_STORAGE_KEY } from '../constants';

class AppState {
  @observable value = 1;

  @observable user = null;
  @observable activePostId = null;

  @observable posts = [];

  @computed
  get activePost() {
    return this.posts.find(p => p.id === this.activePostId);
  }

  constructor() {}

  @action.bound
  inc(amount = 1) {
    this.value += amount;
  }

  async checkAuth() {
    const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

    if (token) {
      this.login(token);
    } else {
      this.logout();
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

      await this.loadPosts();

      await setRootLayout('home');
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
      await setRootLayout('login');
    } catch (err) {
      console.log(err);
    }
  }

  @action.bound
  async loadPosts() {
    try {
      const { data } = await axios.get('/api/post');

      this.posts = data;
      console.log('posts: ', data);
    } catch (err) {
      console.log({ ...err }, err);
    }
  }

  @action.bound
  showPost(id = null, componentId) {
    if (id === null) {
      throw new Error('no Post id provided');
    }

    this.activePostId = id;

    pushToCurrentStack(componentId, 'postDetails');
  }
}

export default new AppState();
