import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './src/Splash';
import Store from './src/reduxV2/config/store';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Main() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Store"
          component={Store}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
