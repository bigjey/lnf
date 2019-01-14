import { Navigation } from 'react-native-navigation';
import { Provider } from 'mobx-react';

import store from '../store';

import TestScreen from './TestScreen/TestScreen';

export default () => {
  Navigation.registerComponentWithRedux(
    `test`,
    () => TestScreen,
    Provider,
    store
  );

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        component: {
          name: 'test',
        },
      },
    });
  });
};
