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
import { useStore } from 'react-redux';

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme, LogBox, Text, TextInput } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
// import appsFlyer from 'react-native-appsflyer';
import { useAuthenticationHoc, useQuery, useMutateReducer } from 'Shared/hoc';
import { useProfileDetailHook } from 'Shared/hooks';
// import BottomTab from 'app/Components/BottomTab';
// import TestContainer from 'app/Containers/Test';
import * as APP_ROUTES from './AppRoutes';

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
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
//         <BottomTab
//           navigation={props.navigation}
//           state={props.state}
//           descriptors={props.descriptors}
//         />
//       )}
//     >
//       <Tab.Screen name="HomePage" component={TestContainer} />
//     </Tab.Navigator>
//   );
// }

// const STACK_SCREEN = Object.entries({ ...APP_ROUTES, Dashboard: Tabs }).map(
//   ([name, component]) => (
//     <Stack.Screen key={name} name={name} component={component} />
//   ),
// );

const STACK_SCREEN = Object.entries(APP_ROUTES).map(([name, component]) => (
  <Stack.Screen key={name} name={name} component={component} />
));

const App = () => {
  const store = useStore();
  const { onResetAndClearToken } = useProfileDetailHook();
  const navigationRef = useRef();
  const {
    reducerName,
    reducerConstants: { GET_USER_PROFILE_API },
    axios,
  } = useAuthenticationHoc();
  const mutateReducerState = useMutateReducer(reducerName);
  const [currentRoute, setCurrentRoute] = useState();
  const [isOffline, setIsOffline] = useState(null);
  const [apiErrorModal, setApiErrorModal] = useState(null);
  // const isDarkMode = useColorScheme() === 'dark';
  // const mutateReducer = useMutateReducer(reducerName);
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

  React.useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log(error);
        if (
          store.getState().Authentication.isLoggedIn &&
          error.response &&
          error.response.status === 401
        ) {
          setTimeout(() => {
            setApiErrorModal('Application Logged out due to session timeout');
          }, 150);
          onResetAndClearToken();
          navigationRef.current.reset({
            index: 0,
            routes: [
              {
                name: 'Login',
              },
            ],
          });
        } else if (
          (store.getState().Authentication.isLoggedIn &&
            error.response &&
            error.response.status === 403) ||
          error.response.status >= 500
        ) {
          setTimeout(() => {
            setApiErrorModal(
              error.response.status === 403
                ? error.response.data.message ||
                    `Sorry you don't have access. Please speak to your residential authorities to get access to the app.`
                : `Sorry.Temporarily we are facing internal server error.Please try again later.`,
            );
          }, 200);
        } else if (error.message === 'Network Error') {
          setTimeout(() => {
            setApiErrorModal(
              'Sorry! Your are offline.Please check your internet connection',
            );
          }, 150);
        }
        return Promise.reject(error);
      },
    );
  }, []);
  console.log(apiErrorModal);
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
