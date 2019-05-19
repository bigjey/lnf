import AuthStore from './AuthStore';
import PostStore from './PostStore';
import UIStore from './UIStore';

class AppState {
  constructor() {
    this.authStore = new AuthStore(this);
    this.postStore = new PostStore(this);
    this.uiStore = new UIStore(this);
  }
}

export default new AppState();
