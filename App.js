import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './screens/Login';
import LandingScreen from './screens/Landing';
import DashboardScreen from './screens/DashboardScreen';
import SignUpScreen from './screens/Signup';
import LoadingScreen from './screens/LoadingScreen';

export default function App() {
  return <AppContainer />;
}

const switchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  Landing: { screen: LandingScreen },
  Login: { screen: LoginScreen },
  Signup: { screen: SignUpScreen },
  DashboardScreen: { screen: DashboardScreen },
});

const AppContainer = createAppContainer(switchNavigator);