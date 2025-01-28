/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './Root';
import SplashScreen from 'react-native-splash-screen';
import {colors} from '../utils/colors';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../store';
import {getStorage, localStorageKey} from '../utils/common';
import {authAction} from '../reducer/auth/authSlice';
import SplashComponent from '../ScreenComponents/Splash/SplashComponent';
import IntroComponent from '../ScreenComponents/Intro/IntroComponent';
import WalletTypeComponent from '../ScreenComponents/DashBoardScreens/WalletType/WalletTypeComponent';
import SelectNetworkComponent from '../ScreenComponents/DashBoardScreens/NewWallet/SelectNetworkComponent';
import WalletPasswordComponent from '../ScreenComponents/DashBoardScreens/NewWallet/WalletPasswordComponent';
import BackupRecoveryComponent from '../ScreenComponents/DashBoardScreens/NewWallet/BackupRecoveryComponent';
import CompletedBackupComponent from '../ScreenComponents/DashBoardScreens/NewWallet/CompletedBackupComponent';
import ConfirmWalletComponent from '../ScreenComponents/DashBoardScreens/NewWallet/ConfirmWalletComponent';
import CheckCodeComponent from '../ScreenComponents/DashBoardScreens/NewWallet/CheckCodeComponent';
import ImportWalletsComponent from '../ScreenComponents/DashBoardScreens/ImportWallet/ImportWalletsComponent';
import SingleNetworkComponent from '../ScreenComponents/DashBoardScreens/ImportWallet/SingleNetworkComponent';
import DashboardBottomNavigator from './DashboardBottomNavigator';

const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

const NewWalletStack = createNativeStackNavigator<any>();

export const NewWalletStackNavigator = () => {
  return (
    <NewWalletStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="NEW_WALLET_PASSWORD">
      <NewWalletStack.Screen
        name="NEW_WALLET_PASSWORD"
        component={WalletPasswordComponent}
      />
      <NewWalletStack.Screen
        name="CONFIRM_WALLET"
        component={ConfirmWalletComponent}
      />
      <NewWalletStack.Screen
        name="BACKUP_RECOVERY"
        component={BackupRecoveryComponent}
      />
      <NewWalletStack.Screen
        name="COMPLETED_BACKUP"
        component={CompletedBackupComponent}
      />
      <NewWalletStack.Screen name="CHECK_CODE" component={CheckCodeComponent} />
    </NewWalletStack.Navigator>
  );
};

const ImportWalletStack = createNativeStackNavigator<any>();

const ImportWalletStackNavigator = () => {
  return (
    <ImportWalletStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="SINGLE_NETWORK">
      <ImportWalletStack.Screen
        name="SINGLE_NETWORK"
        component={SingleNetworkComponent}
      />
      <ImportWalletStack.Screen
        name="IMPORT_WALLET"
        component={ImportWalletsComponent}
      />
    </ImportWalletStack.Navigator>
  );
};

const WalletTypeStack = createNativeStackNavigator<any>();

const WalletTypeStackNavigator = () => {
  return (
    <WalletTypeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="WALLET_TYPE">
      <WalletTypeStack.Screen
        name="WALLET_TYPE"
        component={WalletTypeComponent}
      />
      <NewWalletStack.Screen
        name="SELECT_NETWORK"
        component={SelectNetworkComponent}
      />
      <WalletTypeStack.Screen
        name="NEW_WALLET"
        component={NewWalletStackNavigator}
      />
      <WalletTypeStack.Screen
        name="IMPORT_WALLET"
        component={ImportWalletStackNavigator}
      />
    </WalletTypeStack.Navigator>
  );
};

const MainStack = createNativeStackNavigator<any>();

const MainAppStack = () => {
  const {isFinishStarted, isAuthenticated} = useSelector(
    ({authReducer}: any) => authReducer,
  );
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      {!isFinishStarted ? (
        <MainStack.Screen name="INTRO" component={IntroComponent} />
      ) : null}
      {isAuthenticated ? (
        <MainStack.Screen
          name="DASH_BOARD"
          component={DashboardBottomNavigator}
        />
      ) : (
        <MainStack.Screen
          name="WALLET_TYPES"
          component={WalletTypeStackNavigator}
        />
      )}
    </MainStack.Navigator>
  );
};

const AppNavigationContainer = (): JSX.Element => {
  const {isInitialized} = useSelector(({authReducer}: any) => authReducer);
  const dispatch = useAppDispatch();

  const initializeApp = async () => {
    const walletInfo = await getStorage(localStorageKey.walletInfo);
    dispatch(
      authAction.setInitialize({
        isAuthenticated: walletInfo !== null,
        walletInfo,
      }),
    );
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    initializeApp();
  }, [isInitialized]);

  if (!isInitialized) {
    return <SplashComponent />;
  }
  return (
    <NavigationContainer theme={defaultTheme} ref={navigationRef}>
      <MainAppStack />
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
