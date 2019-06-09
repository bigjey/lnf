import { action, observable, computed } from 'mobx';
import axios from 'axios';

import { setRootLayout, pushToCurrentStack } from '../services/navigation';
import { api } from '../constants';

class PostStore {
  @observable posts = [];
  @observable activePostId = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed
  get activePost() {
    return this.posts.find(p => p.id === this.activePostId);
  }

  @action.bound
  async loadPosts() {
    try {
      const { data } = await axios.get(api.post);
      this.posts = data;
      console.log('posts: ', data);
    } catch (err) {
      this.rootStore.uiStore.error = 'Failed to load posts!';
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
      const res = await axios.post(api.post, data);
      await this.loadPosts();
      setRootLayout('home');
      return res;
    } catch (e) {
      console.log('post error: ', e);
    }
  }

  @action.bound
  async getMyPosts() {
    const { data } = await axios.get(`${api.post}?userId=${this.userId}`);
    return data;
  }

  @action.bound
  async removePost(postId = '') {
    try {
      await axios.delete(`${api.post}/${postId}`);
      await this.loadPosts();
    } catch (e) {
      console.log(e);
    }
    return;
  }
}

export default PostStore;