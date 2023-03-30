import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/login/Login';
import SignUp from './screens/login/SignUp';
import Onboarding from './screens/onboarding/Onboarding';
import Splash from './screens/Splash';
import OTP from './screens/login/OTP';
import TermsAndConditions from './screens/terms/TermsAndConditions';
import Notifications from './screens/Notifications';
import ReferHistory from './screens/Tabs/Refer/ReferHistory';
import PrivacyPolicy from './screens/terms/PrivacyPolicy';
import About from './screens/terms/About';
import Test from './components/Test';
import Wallet from './screens/wallet/Wallet';
import Promotions from './screens/Tabs/others/Promotion';
import YouTubeTask from './screens/Tasks/YouTubeTask';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
        <Stack.Screen name="LogIn" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Welcome', headerShown: false }} />
        <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }} />
        <Stack.Screen name="Terms" component={TermsAndConditions} options={{ title: 'Terms & Conditions' }} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ title: 'Privacy Policy' }} />
        <Stack.Screen name="Notifications" component={Notifications} options={{ title: 'Notifications' }} />
        <Stack.Screen name="Wallet" component={Wallet} options={{ title: 'Wallet', headerShown : false }} />
        <Stack.Screen name="Withdraw" component={Wallet} options={{ title: 'Wallet', headerShown : false }} />
        <Stack.Screen name="Promotions" component={Promotions} options={{ title: 'Promotions' }} />
        <Stack.Screen name="ReferHistory" component={ReferHistory} options={{ title: 'Refer History' }} />
        <Stack.Screen name="About" component={About} options={{ title: 'About Us' }} />
        <Stack.Screen name="Test" component={Test} options={{ title: 'Test' }} />
        <Stack.Screen name="YouTubeTask" component={YouTubeTask} options={{ title: 'YouTube Task', headerShown : false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;