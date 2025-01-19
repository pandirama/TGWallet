import React, {createContext, useState} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import axios from '../axios/axios';
import {useAppDispatch} from '../store';
import {localStorageKey, removeStorage} from '../utils/common';
import {navigateAndSimpleReset} from '../navigators/Root';
import {authAction} from '../reducer/auth/authSlice';

type ToastProp = {
  type: 'success' | 'error' | 'info';
  text1: string;
  text2?: string;
};

type CommonContextType = {
  showToast: (toastProp: ToastProp) => void;
  toggleBackdrop: (val?: boolean) => void;
  onLogout: () => Promise<void>;
};

const CommonContext = createContext<CommonContextType>({
  showToast: (_prop: ToastProp) => {},
  toggleBackdrop: (_val?: boolean) => {},
  onLogout: () => Promise.resolve(),
});

const CommonProvider = ({children}: React.PropsWithChildren): JSX.Element => {
  const [showBackdrop, setBackdrop] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const toggleBackdrop = (val?: boolean) => {
    if (typeof val === 'boolean') {
      setBackdrop(val);
      return;
    }
    setBackdrop(l => !l);
  };

  const showToast = (toastProp: ToastProp) => {
    Toast.show({
      type: toastProp.type,
      text1: toastProp.text1,
      text2: toastProp.text2,
      position: 'bottom',
      autoHide: true,
      visibilityTime: 2000,
      props: {text1: toastProp.text1, text2: toastProp.text2},
    });
  };

  const onLogout = async () => {
    try {
      toggleBackdrop();
    } finally {
      dispatch(authAction.logout());
      await removeStorage(localStorageKey.userInfo);
      toggleBackdrop(false);
      navigateAndSimpleReset('AUTH_ROOT');
    }
  };

  axios.interceptors.response.use(undefined, async (error: any) => {
    if (error.response) {
      const {status} = error.response;
      // Check if unauthorized
      switch (status || undefined) {
        case 401:
          // dispatch(authAction.logout());
          // await clearStorage();
          // navigateAndSimpleReset('AUTH_ROOT');
          break;

        default:
          break;
      }

      return Promise.reject(
        (error.response && error.response.data) || 'Error! Try again later',
      );
    }
    return Promise.reject(error);
  });

  return (
    <CommonContext.Provider
      value={{
        showToast,
        toggleBackdrop,
        onLogout,
      }}>
      {showBackdrop && (
        <View style={styles.backDropView}>
          <ActivityIndicator
            size="small"
            color={'#6B121C'}
            style={{transform: [{scaleX: 2}, {scaleY: 2}]}}
          />
        </View>
      )}
      {children}
    </CommonContext.Provider>
  );
};

const styles = StyleSheet.create({
  backDropView: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1000,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fefefe4d',
  },
});

export {CommonContext, CommonProvider};
