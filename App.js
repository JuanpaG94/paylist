import { createSwitchNavigator, createAppContainer } from 'react-navigation';

// Import screens
import Loading from './components/Loading';
import Landing from './components/Landing';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Main from './components/Main';

/* const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
}); */

export default createAppContainer(createSwitchNavigator(
  {
    Loading,
    Landing,
    Signup,
    Login,
    Main
  },
  {
    initialRouteName: 'Loading'
  }
));
