import { Navigation } from 'react-native-navigation';
import setupStore from '../store/index';
import { Provider } from 'react-redux';

const store = setupStore();

// screens
import TestScreen from './TestScreen/TestScreen';

export default () => {
    Navigation.registerComponentWithRedux(`test`, () => TestScreen, Provider, store);

    Navigation.events().registerAppLaunchedListener(() => {
        console.log('register nav');
        Navigation.setRoot({
            root: {
                component: {
                    name: 'test'
                }
            }
        });
    });
}