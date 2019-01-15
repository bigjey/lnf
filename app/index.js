import registerScreens from './src/screens/navigation';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:1234/';

registerScreens();
