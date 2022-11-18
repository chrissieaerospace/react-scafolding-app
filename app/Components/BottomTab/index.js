/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
// import homeIcon from '../../../asserts/Images/home.png';
// import services from '../../../asserts/Images/services.png';
// import wallet from '../../../asserts/Images/wallet.png';
// import amenities from '../../../asserts/Images/bubble.png';
// import homeIconActive from '../../../asserts/Images/homeActive.png';
// import servicesActive from '../../../asserts/Images/services-active.png';
// import walletActive from '../../../asserts/Images/walletActive.png';
// import amenitiesActive from '../../../asserts/Images/bubbleActive.png';
import { wp } from '../../utils/Dimensions';

// import { colors, typography } from '../styles/Stylesheet';

// import { colors } from '../styles/Stylesheet';
const dimen = Dimensions.get('window');

const BottomTab = ({ descriptors, navigation, state = {} }) => {
  console.log(dimen, 'navigation....');
  const customTabBarIcons = {
    // Home: {
    //   default: homeIcon,
    //   isFocused: homeIconActive,
    //   //   width: orientation.isPortrait ? 9 : 3,
    //   //   height: orientation.isPortrait ? 5.5 : 3,
    //   //   left: -2.6,
    // },
    // Services: {
    //   default: services,
    //   isFocused: servicesActive,
    //   //   width: orientation.isPortrait ? 7 : 3,
    //   //   height: orientation.isPortrait ? 5.5 : 3,
    //   //   left: -1.8,
    // },
    // Wallet: {
    //   default: wallet,
    //   isFocused: walletActive,
    //   //   width: orientation.isPortrait ? 12 : 6,
    //   //   height: orientation.isPortrait ? 6 : 3,
    //   //   left: -1,
    // },
    // Amenities: {
    //   default: amenities,
    //   isFocused: amenitiesActive,
    //   //   width: orientation.isPortrait ? 5 : 3,
    //   //   height: orientation.isPortrait ? 5.5 : 3,
    //   //   left: -0.6,
    // },
  };

  const focusedOptions = descriptors[state.routes[state.index].key].options;
  // console.log('routes', state, state.index);

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  //   const { reducerName } = useDashboardHoc();

  //   const { isLoggedIn = false, isCMLoggedIn = false } = useQuery(reducerName, {
  //     requiredKey: ['isLoggedIn', 'isCMLoggedIn'],
  //   });

  // const [activeTab, setActiveTab] = useState(currentTab || 1);

  //   const { getUserProfile } = useUserProfileHook();

  //   useEffect(() => {
  //     if (isLoggedIn) {
  //       getUserProfile();
  //     }
  //   }, [isLoggedIn]);

  // useEffect(() => {
  //   if (currentTab) setActiveTab(currentTab);
  // }, [currentTab]);

  //   useEffect(() => {
  //     if (isLoggedIn && isCMLoggedIn) onCreateAccessTypeToken();
  //   }, [isLoggedIn, isCMLoggedIn]);

  // useEffect(() => {
  //   const backAction = () => {
  //     if (navigation.isFocused() && activeTab !== 1) {
  //       setActiveTab(1);
  //       return true;
  //     }
  //     if (
  //       activeTab === 1 &&
  //       navigation.isFocused() &&
  //       !navigation.canGoBack()
  //     ) {
  //       Alert.alert('Hold on!', 'Are you sure you want to exit?', [
  //         {
  //           text: 'Cancel',
  //           onPress: () => null,
  //           style: 'cancel',
  //         },
  //         { text: 'YES', onPress: () => BackHandler.exitApp() },
  //       ]);
  //       return true;
  //     }

  //     return false;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, [activeTab]);

  // const handleTabPress = (clickedTab) => {
  //   setActiveTab(clickedTab);
  //   // navigation.setParams({
  //   //   currentTab: clickedTab,
  //   // });
  // };

  const NAMES = {
    Home: 'Home',
    Services: 'Services',
    Wallet: 'Wallet',
    Amenities: 'Amenities',
  };

  return (
    <View style={styles.fixedFooter}>
      <View style={styles.footerWrapper}>
        {/* {activeTab === 1 ? (
          <Home navigation={navigation} />
        ) : activeTab === 2 ? (
          <Video navigation={navigation} />
        ) : activeTab === 3 ? (
          <Podcast navigation={navigation} noSpace />
        ) : activeTab === 4 ? (
          <Saved navigation={navigation} />
        ) : activeTab === 5 ? (
          <Menu navigation={navigation} />
        ) : (
          <View />
        )} */}
        {/* <BottomTabBar
          // callback={(tab) => {
          //   handleTabPress(tab);
          // }}
          navigation={navigation}
          // activeTab={activeTab}
          tabs={[
            {
              title: 'Home',
              // image: activeTab === 1 ? homeIconActive : homeIcon,
            },
            {
              title: 'Videos',
              // image: activeTab === 2 ? videoIconActive : videoIcon,
              width: 7,
            },
            {
              title: 'Podcast',
              // image: activeTab === 3 ? podIconActive : podIcon,
              width: 10,
            },
            {
              title: 'Saved',
              // image: activeTab === 4 ? savedIconActive : savedIcon,
            },
            {
              title: 'Menu',
              // image: activeTab === 5 ? otherIconActive : otherIcon,
            },
          ]}
        /> */}
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            NAMES[
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name
            ];
          console.log(route);
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
            console.log(event, 'event...');
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const tabBarImage =
            customTabBarIcons[route.name] &&
            customTabBarIcons[route.name][isFocused ? 'isFocused' : 'default'];

          // const opacity = isFocused ? 1 : 0.4;

          const activeColor = isFocused ? '#20A836' : '#647288';

          return (
            <View style={{ width: '20.5%' }} key={route.key}>
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.footerCard}
              >
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  {/* <View style={{ paddingLeft: wp(1) }}> */}
                  <Image
                    resizeMode="contain"
                    style={styles.footerIcon}
                    source={tabBarImage}
                  />
                  {/* </View> */}
                  <Text style={[styles.footerTitle, { color: activeColor }]}>
                    {label}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fixedFooter: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingVertical: 10,
    shadowColor: '#999999',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.01,
    shadowRadius: 12,
    elevation: 10,
    marginTop: 40,
  },
  footerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerIcon: {
    width: wp(5.55),
    height: wp(5.55),
  },
  footerTitle: {
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    FontSize: wp(3.75),
    textAlign: 'center',
    marginTop: 6,
  },
});

BottomTab.propTypes = {
  navigation: PropTypes.object,
  state: PropTypes.object,
  descriptors: PropTypes.object,
};

export default BottomTab;
