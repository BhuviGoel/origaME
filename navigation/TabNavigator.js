import * as React from 'react';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ExploreNavigator } from './exploreNav';
import { LearnNavigator } from './learnNav';
import { SettingsNavigator } from './settingsNav';
import { SavedNavigator } from './savedNav';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      labeled={false}
      barStyle={styles.bottomTabStyle}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Learn') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'Saved') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return (
            <Ionicons
              name={iconName}
              size={25}
              color={color}
              style={styles.icons}
            />
          );
        },
      })}
      activeColor={'#ffffff'}
      inactiveColor={'#ffffff'}>
      <Tab.Screen name="Learn" component={LearnNavigator} />
      <Tab.Screen name="Saved" component={SavedNavigator} />
      <Tab.Screen name="Explore" component={ExploreNavigator} />
      <Tab.Screen name="Settings" component={SettingsNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: '#ec254e',
    height: '8%',
    overflow: 'hidden',
    position: 'absolute',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  icons: {
    width: 30,
    height: 30,
  },
});
