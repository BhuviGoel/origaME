import React from 'react';
import Settings from '../screens/Settings';
import Update from '../screens/Update';
import About from '../screens/About';
import Contact from '../screens/Contact';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Update" component={Update} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
  );
};

