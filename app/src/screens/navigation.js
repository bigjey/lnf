import { Navigation } from 'react-native-navigation';
import { Provider } from 'mobx-react';

import { setRootComponent } from '../services/navigation';

import store from '../store';

import TestScreen from './TestScreen/TestScreen';
import Login from './Login/Login';
import Register from './Register/Register';
import Loader from './Loader/Loader';

export default () => {
  Navigation.registerComponentWithRedux(
    'app.main',
    () => TestScreen,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'app.loader',
    () => Loader,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'app.login',
    () => Login,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'app.register',
    () => Register,
    Provider,
    store
  );

  Navigation.events().registerAppLaunchedListener(async () => {
    await setRootComponent('app.loader');

    await store.checkAuth();

    if (store.user === null) {
      setRootComponent('app.login');
    } else {
      setRootComponent('app.main');
    }
  });
};
