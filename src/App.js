import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Navigatior} from 'navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigatior />
    </SafeAreaProvider>
  );
}
