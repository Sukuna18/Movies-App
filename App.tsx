import React from 'react';
import Home from './screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import Details from './screens/Details';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
