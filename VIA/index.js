import {AppRegistry} from 'react-native';
import App from './App';
import 'react-native-gesture-handler';
import {name as appName} from './app.json';
var SQLite = require('react-native-sqlite-storage')

AppRegistry.registerComponent(appName, () => App);
