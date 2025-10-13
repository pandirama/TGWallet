/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import './src/i18n/i18n';

if (__DEV__) {
  import('./ReactotronConfig').then(() => {});
}

AppRegistry.registerComponent(appName, () => App);
