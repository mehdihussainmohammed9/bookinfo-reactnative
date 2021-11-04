import 'react-native-gesture-handler';
import * as React from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AppIntroScreen from './src/screens/appIntro/AppIntroScreen';
import Splash from './src/screens/splash/SplashScreen';
import SearchScreen from './src/screens/search/SearchScreen';
import DetailsScreen from './src/screens/details/DetailsScreen';
import WebViewScreen from './src/screens/webView/WebView';
import {Routes} from './src/utils/MyNavigations';

const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName={Routes.Search}>
//         {/* Home */}
//         <Stack.Screen
//           name={Routes.Search}
//           component={SearchScreen}
//           options={{headerShown: false}}
//         />{' '}
//         {/* Details */}
//         <Stack.Screen
//           name={Routes.Details}
//           component={DetailsScreen}
//           options={{headerShown: false}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.Splash}
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.Search}
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.Details}
        options={{headerShown: false}}
        component={DetailsScreen}
      />
      <Stack.Screen
        name={Routes.WebView}
        options={{headerShown: true}}
        component={WebViewScreen}
      />
      <Stack.Screen
        name={Routes.AppIntro}
        options={{headerShown: false}}
        component={AppIntroScreen}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

export default App;
