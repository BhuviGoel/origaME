import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Create from '../screens/Create';
import Explore from '../screens/Explore';
import Creations from '../screens/Creations';
import UserCreations from '../screens/UserCreations';
import CreationDetails from '../screens/CreationDetails';
import WeeklyDetails from '../screens/WeeklyDetails';
const Stack = createStackNavigator();

export const ExploreNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="Create" component={Create} />
      <Stack.Screen name="Creations" component={Creations} />
      <Stack.Screen name="UserCreations" component={UserCreations} />
      <Stack.Screen name="WeeklyDetails" component={WeeklyDetails} />
      <Stack.Screen name="CreationDetails" component={CreationDetails} />
    </Stack.Navigator>
  );
};
