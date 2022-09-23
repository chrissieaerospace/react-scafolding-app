/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme, LogBox, Text, TextInput } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
// import appsFlyer from 'react-native-appsflyer';
import { useAuthenticationHoc, useQuery, useMutateReducer } from './Shared/hoc';
import * as APP_ROUTES from './AppRoutes';

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
// global.FormData = global.originalFormData || global.FormData;

if (window.FETCH_SUPPORT) {
  window.FETCH_SUPPORT.blob = false;
} else {
  global.Blob = global.originalBlob || global.Blob;
  global.FileReader = global.originalFileReader || global.FileReader;
}

if (Text.defaultProps) {
  Text.defaultProps.allowFontScaling = false;
} else {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

// const Tab = createBottomTabNavigator();

// function Tabs() {
//   return (
//     <Tab.Navigator
//       headerMode="none"
//       headerShown={false}
//       screenOptions={{
//         headerShown: false,
//       }}
//       tabBar={(props) => (
//         <FixedFooter
//           navigation={props.navigation}
//           state={props.state}
//           descriptors={props.descriptors}
//         />
//       )}
//     >
//       <Tab.Screen name="HomePage" component={HomePage} />
//       <Tab.Screen name="ReportPage" component={ReportPage} />
//       <Tab.Screen name="ChatPage" component={ChatPage} />
//       <Tab.Screen name="AccountPage" component={AccountPage} />
//     </Tab.Navigator>
//   );
// }

/** TABS
  const STACK_SCREEN = Object.entries({ Home: Tabs, ...APP_ROUTES }).map(
    ([name, component]) => (
      <Stack.Screen key={name} name={name} component={component} />
    ),
  );
*/

const STACK_SCREEN = Object.entries(APP_ROUTES).map(([name, component]) => (
  <Stack.Screen key={name} name={name} component={component} />
));

const App = () => {
  const navigationRef = useRef();
  const {
    reducerName,
    reducerConstants: { GET_USER_PROFILE_API },
  } = useAuthenticationHoc();
  const mutateReducerState = useMutateReducer(reducerName);
  const [currentRoute, setCurrentRoute] = useState();
  const [isOffline, setIsOffline] = useState(null);
  const [profile, isLoggedIn] = useQuery(reducerName, [
    GET_USER_PROFILE_API,
    'isLoggedIn',
  ]);
  const isDarkMode = useColorScheme() === 'dark';
  console.log(isDarkMode, currentRoute, isOffline, profile, isLoggedIn);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected !== null) {
        if (state.isConnected) {
          setIsOffline((_isOffline) => {
            if (_isOffline) {
              if (_isOffline !== null) {
                // successToast('Network is online');
              }
              // setIsRetry(false);
            }
            mutateReducerState(() => ({
              isOffline: false,
            }));
            return false;
          });
        } else {
          setIsOffline(true);
          mutateReducerState(() => ({
            isOffline: true,
          }));
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <NavigationContainer
        onStateChange={() => {
          if (navigationRef.current) {
            setCurrentRoute(navigationRef.current.getCurrentRoute().name);
          }
        }}
        ref={navigationRef}
      >
        <Stack.Navigator
          headerMode="none"
          headerShown={false}
          screenOptions={{
            headerShown: false,
            cardStyle: {
              backgroundColor: 'rgba(24,26,27,0.8)',
            },
            cardOverlayEnabled: true,
            // gestureEnabled: false,
            animationEnabled: false,
          }}
          initialRouteName="Test"
        >
          {STACK_SCREEN}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
// });
