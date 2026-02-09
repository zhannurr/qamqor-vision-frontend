import { registerRootComponent } from 'expo';
import { Text, TextInput } from 'react-native';

import App from './App';

// Устанавливаем дефолтный шрифт для всех Text компонентов
if (Text.defaultProps == null) {
  Text.defaultProps = {};
}
Text.defaultProps.style = { fontFamily: 'Montserrat-Regular' };

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
}
TextInput.defaultProps.style = { fontFamily: 'Montserrat-Regular' };

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
