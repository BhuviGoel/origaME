import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Steps from '../screens/Steps';
import Paper from '../screens/Paper';

const Tab = createMaterialTopTabNavigator();
export const TabNavigator = (props) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarItemStyle: {},
        tabBarStyle: { backgroundColor: '#ec254e' },
        tabBarContentContainerStyle: {},
      }}>
      <Tab.Screen name="Steps" component={Steps} initialParams={props.detail} />
      <Tab.Screen name="Paper" component={Paper} initialParams={props.detail} />
    </Tab.Navigator>
  );
};
