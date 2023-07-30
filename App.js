/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Active from './src/pages/Active';
import Inactive from './src/pages/Inactive';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AddOrder from './src/pages/AddOrder';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Pending" component={Active} options={{ headerShown: false, tabBarIcon: ({focused}) => focused ? 
            (
                <FontAwesome5 name="clipboard-list" size={24} color="#003588" />
            ):
            (
                <FontAwesome5 name="clipboard-list" size={24} color="#98AFC7" />
            )
        }}/>
      <Tab.Screen name="Completed" component={Inactive} 
       options={{ headerShown: false, tabBarIcon: ({focused}) => focused ? 
       (
           <FontAwesome5 name="clipboard-check" size={24} color="#003588" />            
       ):
       (
           <FontAwesome5 name="clipboard-check" size={24} color="#98AFC7" />            
       )
   }}/>
    </Tab.Navigator>
  );
}

function App(){
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Orders" component={MyTabs} />
        <Stack.Screen name="Add Order" component={AddOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;
