import React from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Loader from './src/components/Loader';
import { observer } from 'mobx-react-lite';
import Aleart from './src/components/Aleart';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import InitialScreen from './src/screens/InitialScreen';
import Home from './src/screens/Home';
import Add from './src/screens/Add';
import ShowDetails from './src/screens/ShowDetails';
import store from './src/Store';

 function App() {
 


  return (
    <SafeAreaProvider>
       <NavigationContainer>
         {console.log(store.isLoading)}
        <Loader
          isVisible={store.isLoading}
        />
        <Aleart
           isVisible={store.isAleart}
        />
          <Stack.Navigator>
              <Stack.Screen name="InitialScreen" component={InitialScreen} options={{headerShown: false}}/>
              <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
              <Stack.Screen name="Add" component={Add} options={{headerShown: false}}/>
              <Stack.Screen name="ShowDetails" component={ShowDetails} options={{headerShown: false}}/>

           </Stack.Navigator>
       </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default observer(App)