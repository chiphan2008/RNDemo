import {SafeAreaView} from 'react-native';
import React from 'react';
import {List} from 'screens/listusers';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <List />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
