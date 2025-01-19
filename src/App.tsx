import React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import Toast, {ErrorToast, SuccessToast} from 'react-native-toast-message';
import {PaperProvider} from 'react-native-paper';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {Provider as ReduxProvider} from 'react-redux';
import store, {persistor} from './store';
import AppNavigationContainer from './navigators/ApplicationNavigator';
import {CommonProvider} from './contexts/CommonContext';

import SplashComponent from './ScreenComponents/Splash/SplashComponent';

// Firebase FCM TOKEN

const toastConfig = {
  success: (props: any) => <SuccessToast {...props} text1NumberOfLines={3} />,
  error: (props: any) => <ErrorToast {...props} text1NumberOfLines={3} />,
};

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ReduxProvider store={store}>
        <PaperProvider>
          <CommonProvider>
            <PersistGate loading={<SplashComponent />} persistor={persistor}>
              <AppNavigationContainer />
            </PersistGate>
            <Toast config={toastConfig} />
          </CommonProvider>
        </PaperProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
};

export default App;
