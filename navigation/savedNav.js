import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Saved from '../screens/Saved';
import TutorialDetails from '../screens/TutorialDetails';
const Stack = createStackNavigator();

export const SavedNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Saved"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Saved" component={Saved} />
      <Stack.Screen name="TutorialDetails" component={TutorialDetails} />
    </Stack.Navigator>
  );
};
