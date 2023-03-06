import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Home from './screens/Home';
import Login from './screens/login/Login';
import SignUp from './screens/login/SignUp';
import Onboarding from './screens/onboarding/Onboarding';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Splash from './screens/Splash';
import OTP from './screens/login/OTP';
const Stack = createNativeStackNavigator();

// const Splash = React.lazy(() => import('./screens/Splash'));
const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        {<Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />}
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LogIn"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Welcome', headerShown: false }}
        />
        <Stack.Screen
          name="OTP"
          component={OTP}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;