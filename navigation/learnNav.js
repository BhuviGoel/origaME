import * as React from 'react';

import Beginner from '../learn/beginner.js'
import Advanced from '../learn/advanced'
import Professional from '../learn/professional'
import TutorialDetails from '../screens/TutorialDetails';
import Learn from '../screens/Learn';
import { createStackNavigator } from '@react-navigation/stack';

const Stack1 = createStackNavigator();  
export const LearnNavigator=()=> {
  return (
    <Stack1.Navigator screenOptions={{headerShown:false}}>
      <Stack1.Screen name="Learn" component={Learn} />
      <Stack1.Screen name="Beginner" component={Beginner} />
      <Stack1.Screen name="Advanced" component={Advanced} />
      <Stack1.Screen name="Professional" component={Professional} />
      <Stack1.Screen name="TutorialDetails" component={TutorialDetails} />

    </Stack1.Navigator>
  );
} 
