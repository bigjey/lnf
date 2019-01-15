import axios from 'axios';

import registerScreens from './src/screens/navigation';

axios.defaults.baseURL = 'http://localhost:1234/';

registerScreens();
