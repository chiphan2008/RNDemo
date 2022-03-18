import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from './Routes';
import * as Screens from 'screens';
import {navigationRef} from './NavigationService';
// import {whiteColor} from 'utils/theme';

const Stack = createNativeStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name={Routes.ListUsers} component={Screens.ListUsers} />
    <Stack.Screen
      name={Routes.ListUsersFilter}
      component={Screens.ListUsersFilter}
    />
  </Stack.Navigator>
);

export const Navigatior = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigator />
    </NavigationContainer>
  );
};
