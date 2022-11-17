/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import restaurantsList from './src/container/restaurantsList';

AppRegistry.registerComponent(appName, () => App);
