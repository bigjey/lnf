import { Navigation } from 'react-native-navigation';
import { Provider } from 'mobx-react';

import store from '../store';

import TestScreen from './TestScreen/TestScreen';
import Login from './Login/Login';
import Register from './Register/Register';
import Loader from './Loader/Loader';

export default () => {
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
    Navigation.setRoot({
      root: {
        component: {
          name: 'app.loader',
        },
      },
    });

    await store.checkAuth();

    if (store.user === null) {
      Navigation.setRoot({
        root: {
          component: {
            name: 'app.login',
          },
        },
      });
    } else {
      Navigation.setRoot({
        root: {
          component: {
            name: 'app.register',
          },
        },
      });
    }
  });
};
