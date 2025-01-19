/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PlatformPressable} from '@react-navigation/elements';
import {StyleSheet, Platform, View, Text} from 'react-native';
import {useLinkBuilder, useTheme} from '@react-navigation/native';
import ProfileComponent from '../ScreenComponents/DashBoardScreens/Profile/ProfileComponent';
import Assets from '../assets/assets.svg';
import AssetsActive from '../assets/assets_active.svg';
import Markets from '../assets/markets.svg';
import MarketsActive from '../assets/markets_active.svg';
import Discover from '../assets/discover.svg';
import DiscoverActive from '../assets/discover_active.svg';
import Profile from '../assets/profile.svg';
import ProfileActive from '../assets/profile_active.svg';
import MarketsComponent from '../ScreenComponents/DashBoardScreens/Markets/MarketsComponent';
import DiscoverComponent from '../ScreenComponents/DashBoardScreens/Discover/DiscoverComponent';
import NewWalletComponent from '../ScreenComponents/DashBoardScreens/NewWallet/SelectNetworkComponent';
import WalletPasswordComponent from '../ScreenComponents/DashBoardScreens/NewWallet/WalletPasswordComponent';
import SingleNetworkComponent from '../ScreenComponents/DashBoardScreens/ImportWallet/SingleNetworkComponent';
import ImportWalletsComponent from '../ScreenComponents/DashBoardScreens/ImportWallet/ImportWalletsComponent';
import AddressBookComponent from '../ScreenComponents/DashBoardScreens/Profile/AddressBook/AddressBookComponent';
import AssetComponent from '../ScreenComponents/DashBoardScreens/Asset/AssetComponent';
import AboutUsComponent from '../ScreenComponents/DashBoardScreens/Profile/AboutUs/AboutUsComponent';
import SettingsComponent from '../ScreenComponents/DashBoardScreens/Profile/Settings/SettingsComponent';
import NotificationsComponent from '../ScreenComponents/DashBoardScreens/Profile/Settings/NotificationsComponent';
import LanguageComponent from '../ScreenComponents/DashBoardScreens/Profile/Settings/LanguageComponent';
import CurrencyUnitComponent from '../ScreenComponents/DashBoardScreens/Profile/Settings/CurrencyUnitComponent';
import MarketSettingsComponent from '../ScreenComponents/DashBoardScreens/Profile/Settings/MarketSettingsComponent';
import ChangeBasisComponents from '../ScreenComponents/DashBoardScreens/Profile/Settings/ChangeBasisComponents';
import NumberDisplayComponent from '../ScreenComponents/DashBoardScreens/Profile/Settings/NumberDisplayComponent';
import InviteFriendsComponent from '../ScreenComponents/DashBoardScreens/Profile/InviteFriends/InviteFriendsComponent';
import AddNewNFTComponent from '../ScreenComponents/DashBoardScreens/Asset/AddNewNFTComponent';
import AddNFTComponent from '../ScreenComponents/DashBoardScreens/Asset/AddNFTComponent';
import NFTsComponent from '../ScreenComponents/DashBoardScreens/Asset/NFTsComponent';
import NFTDetailsComponent from '../ScreenComponents/DashBoardScreens/Asset/NFTDetailsComponent';

const ProductsStack = createNativeStackNavigator<any>();

const AssetStack = createNativeStackNavigator<any>();

const AssetStackNavigator = () => {
  return (
    <AssetStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ASSET">
      <AssetStack.Screen name="ASSET" component={AssetComponent} />
      <AssetStack.Screen name="ADDNFT" component={AddNFTComponent} />
      <AssetStack.Screen name="ADDNEWNFT" component={AddNewNFTComponent} />
      <AssetStack.Screen name="NFTs" component={NFTsComponent} />
      <AssetStack.Screen name="NFTDETAILS" component={NFTDetailsComponent} />
    </AssetStack.Navigator>
  );
};

const MarketsStackNavigator = () => {
  return (
    <ProductsStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="MARKETS">
      <ProductsStack.Screen name="MARKETS" component={MarketsComponent} />
    </ProductsStack.Navigator>
  );
};

const DiscoverStackNavigator = () => {
  return (
    <ProductsStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="DISCOVER">
      <ProductsStack.Screen name="DISCOVER" component={DiscoverComponent} />
    </ProductsStack.Navigator>
  );
};

const AddressBookStack = createNativeStackNavigator<any>();

const AddressBookStackNavigator = () => {
  return (
    <AddressBookStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ADDRESS_LIST">
      <AddressBookStack.Screen
        name="ADDRESS_LIST"
        component={AddressBookComponent}
      />
      {/* <ProfileStack.Screen name="NEW_ADDRESS" component={ProfileComponent} /> */}
      {/* <ProfileStack.Screen name="EDIT_ADDRESS" component={ProfileComponent} /> */}
    </AddressBookStack.Navigator>
  );
};

const SettingsStack = createNativeStackNavigator<any>();

const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="SETTINGS_LIST">
      <SettingsStack.Screen
        name="SETTINGS_LIST"
        component={SettingsComponent}
      />
      <SettingsStack.Screen
        name="NOTIFICATION"
        component={NotificationsComponent}
      />
      <SettingsStack.Screen name="LANGUAGE" component={LanguageComponent} />
      <SettingsStack.Screen
        name="CURRENCY_UNIT"
        component={CurrencyUnitComponent}
      />
      <SettingsStack.Screen
        name="MARKET_SETTINGS"
        component={MarketSettingsComponent}
      />
      <SettingsStack.Screen
        name="CHANGE_BASIS"
        component={ChangeBasisComponents}
      />
      <SettingsStack.Screen
        name="NUMBER_DISPLAY"
        component={NumberDisplayComponent}
      />
    </SettingsStack.Navigator>
  );
};

const ProfileStack = createNativeStackNavigator<any>();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="PROFILE">
      <ProfileStack.Screen name="PROFILE" component={ProfileComponent} />
      <ProfileStack.Screen
        name="ADDRESS_BOOK"
        component={AddressBookStackNavigator}
      />
      <ProfileStack.Screen name="ABOUT_US" component={AboutUsComponent} />
      <ProfileStack.Screen name="SETTINGS" component={SettingsStackNavigator} />
      <ProfileStack.Screen
        name="INVITE_FRIENDS"
        component={InviteFriendsComponent}
      />
    </ProfileStack.Navigator>
  );
};

const Tab = createBottomTabNavigator<any>();

const DashBoardTabBar = ({state, descriptors, navigation}: any) => {
  const {buildHref} = useLinkBuilder();

  return (
    <View style={styles.bottomView}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let icon: any = {
          unSelected: <Assets width={32} height={32} />,
          selected: <AssetsActive width={32} height={32} />,
        };
        switch (route.name) {
          case 'Asset':
            icon = {
              unSelected: <Assets width={32} height={32} />,
              selected: <AssetsActive width={32} height={32} />,
            };
            break;
          case 'Markets':
            icon = {
              unSelected: <Markets width={32} height={32} />,
              selected: <MarketsActive width={32} height={32} />,
            };
            break;
          case 'Discover':
            icon = {
              unSelected: <Discover width={32} height={32} />,
              selected: <DiscoverActive width={32} height={32} />,
            };
            break;
          case 'Profile':
            icon = {
              unSelected: <Profile width={32} height={32} />,
              selected: <ProfileActive width={32} height={32} />,
            };
            break;
        }

        return (
          <PlatformPressable
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.bottomTab}>
            {isFocused ? icon?.selected : icon?.unSelected}
            <Text
              style={[styles.labelTxt, isFocused && styles.labelFocusedTxt]}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
};

const DashboardBottomNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <DashBoardTabBar {...props} />}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen name="Asset" component={AssetStackNavigator} />
      <Tab.Screen name="Markets" component={MarketsStackNavigator} />
      <Tab.Screen name="Discover" component={DiscoverStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default DashboardBottomNavigator;

const styles = StyleSheet.create({
  bottomTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
  },
  bottomView: {
    flexDirection: 'row',
  },
  icon: {
    width: 25,
    height: 20,
  },
  iconunSelected: {
    marginTop: 15,
  },
  labelTxt: {
    color: '#757575',
    fontSize: 13,
    fontWeight: 500,
    marginBottom: 15,
  },
  labelFocusedTxt: {
    color: '#ED1C24',
  },
  selectedBack: {
    height: 32,
    width: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
});
