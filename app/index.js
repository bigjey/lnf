import axios from 'axios';
import {YellowBox} from 'react-native';

import registerScreens from './src/screens/navigation';

axios.defaults.baseURL = 'http://localhost:1234/';

// disable some warnings
YellowBox.ignoreWarnings([
    'Require cycle:'
])

registerScreens();
