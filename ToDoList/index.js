import { AppRegistry } from 'react-native';
import App from './app/App';
import { name as appName } from './app.json'; 
// or if app.json doesn't exist, create a name or refer to your project name

AppRegistry.registerComponent(appName, () => App);
