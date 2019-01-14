import { action, observable } from 'mobx';

class AppState {
  @observable value = 1;

  @action.bound
  inc(amount) {
    this.value += amount;
  }
}

export default new AppState();
