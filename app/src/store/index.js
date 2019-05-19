import { AsyncStorage } from 'react-native';
import { action, observable, computed } from 'mobx';
import axios from 'axios';

import { setRootLayout, pushToCurrentStack } from '../services/navigation';
import { TOKEN_STORAGE_KEY, USER_ID } from '../constants';

class AppState {
  @observable error = null;

  @observable user = null;
  @observable userId = null;

  @observable posts = [];
  @observable activePostId = null;

  @computed
  get activePost() {
    return this.posts.find(p => p.id === this.activePostId);
  }

  @action.bound
  clearError() {
    this.error = '';
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
      this.error = 'Login failed';
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
    this.error = '';
    try {
      await axios.post('/auth/register', { email, password });
      setRootLayout('login');
    } catch (e) {
      this.error = 'Failed to register';
      console.log('register error: ', e);
    }
  }

  @action.bound
  async loadPosts() {
    try {
      const { data } = await axios.get('/api/post');
      this.posts = data;
      console.log('posts: ', data);
    } catch (err) {
      this.error = 'Failed to load posts!';
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

  @action.bound
  async addPost(data = {}) {
    try {
      const res = await axios.post('/api/post', data);
      await this.loadPosts();
      setRootLayout('home');
      return res;
    } catch (e) {
      console.log('post error: ', e);
    }
  }

  @action.bound
  async getMyPosts() {
    const { data } = await axios.get(`/api/post?userId=${this.userId}`);
    return data;
  }

  @action.bound
  async removePost(postId = '') {
    try {
      await axios.delete(`/api/post/${postId}`);
      await this.loadPosts();
    } catch (e) {
      console.log(e);
    }
    return;
  }
}

export default new AppState();
