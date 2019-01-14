import { action, observable } from 'mobx';

class AppState {
  @observable value = 1;

  @action.bound
  inc(amount = 1) {
    this.value += amount;
  }
}

export default new AppState();
