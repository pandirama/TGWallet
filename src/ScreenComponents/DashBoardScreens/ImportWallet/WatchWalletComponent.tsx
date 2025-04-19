/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../utils/appStyles';
import Scan from '../../../assets/scan.svg';
import {colors} from '../../../utils/colors';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import LinearGradient from 'react-native-linear-gradient';
import {Ionicons} from '../../../utils/IconUtils';
import useCommon from '../../../hooks/useCommon';
import {useSelector} from 'react-redux';
import {
  getErrorMessage,
  localStorageKey,
  setStorage,
} from '../../../utils/common';
import {
  useWatchAddressMutation,
} from '../../../api/walletAPI';
import Clipboard from '@react-native-clipboard/clipboard';
import {useAppDispatch} from '../../../store';
import {authAction} from '../../../reducer/auth/authSlice';

type Props = NativeStackScreenProps<any, 'WATCH_WALLET'>;

const WatchWalletComponent = ({navigation, route}: Props) => {
  const {walletNetwork} = route?.params ?? {};

  const {showToast, toggleBackdrop} = useCommon();
  const dispatch = useAppDispatch();

  const [chainType, setChainType] = useState(
    walletNetwork?.Wallet_network ?? '',
  );
  const [walletName, setWalletName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [accept, toggleAccept] = useState(false);

  const [watchAddress, {isLoading}] = useWatchAddressMutation();

  const {userInfo = {}, isHomeNewWallet} = useSelector(
    ({authReducer}: any) => authReducer,
  );

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  const fetchCopiedKey = async () => {
    const text = await Clipboard.getString();
    if (text) {
      setWalletAddress(text);
    }
  };

  const tabsView = () => {
    return (
      <View style={styles.containerView}>
        <Text style={styles.titleTxt}>
          Please use cold wallet in disconnected environment. The cold wallet
          must be used in conjunction with watch wallet. You can create you new
          wallet offline here, please back it up well.
        </Text>
        <View style={styles.multiLineContainer}>
          <TextInput
            style={styles.multiLineInput}
            placeholder={'Please enter private key or scan its QR code'}
            placeholderTextColor="#9C9DA0"
            value={walletAddress}
            multiline={true}
            onChangeText={text => setWalletAddress(text)}
          />
          <View style={styles.pasteCard}>
            <TouchableOpacity onPress={() => fetchCopiedKey()}>
              <Text style={styles.pasteTxt}>Paste</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.inputTitleTxt}>Chain Type</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Chain Type"
            placeholderTextColor="#9C9DA0"
            value={chainType}
            editable={false}
            onChangeText={text => setChainType(text)}
          />
        </View>
        <Text style={styles.inputTitleTxt}>Wallet Name</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Wallet Name"
            placeholderTextColor="#9C9DA0"
            value={walletName}
            onChangeText={text => setWalletName(text)}
          />
        </View>
      </View>
    );
  };

  const importKeys = async () => {
    try {
      let params: any = {
        network: walletNetwork?.ID,
        userid: userInfo?.generated_Id,
        wallet_name: walletName,
        wallet_address: walletAddress,
      };
      const response: any = await watchAddress(params).unwrap();

      if (response?.success) {
        dispatch(authAction.setWalletInfo(response?.walletinfo));
        await setStorage(
          localStorageKey.walletInfo,
          JSON.stringify(response?.walletinfo),
        );
        if (isHomeNewWallet) {
          dispatch(authAction.setHomeNewWallet(false));
          navigation.navigate('DASH_BOARD', {
            screen: 'Asset',
          });
          navigation.replace('DASH_BOARD');
        } else {
          dispatch(authAction.setAuthenticated(true));
        }
      } else {
        showToast({
          type: 'error',
          text1: response?.message,
        });
      }
    } catch (err: any) {
      showToast({
        type: 'error',
        text1: getErrorMessage(err),
      });
    }
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.background}
        animated
      />
      <SafeAreaView style={appStyles.container}>
        <DashBoardHeaderComponent
          title={'Watch Wallet'}
          rightIcon={<Scan width={24} height={24} style={styles.scanIcon} />}
        />
        {tabsView()}
        <View style={styles.bottomView}>
          <View style={styles.readAgreeView}>
            <TouchableOpacity onPress={() => toggleAccept(a => !a)}>
              <Ionicons
                name={accept ? 'checkbox-outline' : 'square-outline'}
                size={18}
                color={'#0054A6'}
              />
            </TouchableOpacity>
            <Text style={styles.readAgreeTxt}>I have read and agree </Text>
            <Text style={styles.agreeTxt}>Terms of Service</Text>
          </View>
          <TouchableOpacity
            style={[styles.startedTouch, !accept && styles.touchOpacity]}
            disabled={!accept}
            onPress={() => {
              importKeys();
            }}>
            <LinearGradient
              colors={['#6B121C', '#ED1C24']}
              style={styles.startedBtn}>
              <Text style={styles.startedBtnTxt}>Confirm</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scanIcon: {
    marginRight: 15,
  },
  tabsView: {
    marginTop: 15,
  },
  titleTxt: {
    fontSize: 12,
    fontWeight: 400,
    color: '#333333',
    marginTop: 10,
    marginLeft: 5,
  },
  inputTitleTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    marginBottom: 1,
    marginTop: 10,
    marginLeft: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8, // Adjust the value to change the roundness
    paddingHorizontal: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray1,
  },
  multiLineContainer: {
    backgroundColor: colors.white,
    borderRadius: 8, // Adjust the value to change the roundness
    paddingHorizontal: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray1,
    marginTop: 20,
    height: 130,
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    color: colors.black,
  },
  multiLineInput: {
    height: 90,
    marginBottom: 10,
    color: colors.black,
    textAlignVertical: 'top',
  },
  pasteCard: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  advanceCard: {
    marginRight: 5,
  },
  pasteTxt: {
    color: '#0054A6',
    fontSize: 12,
    fontWeight: 400,
    marginRight: 10,
  },
  modeTxt: {
    color: '#7C8FAC',
    fontSize: 12,
    fontWeight: 400,
  },
  containerView: {
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
  },
  readAgreeView: {
    flexDirection: 'row',
    marginLeft: 25,
  },
  readAgreeTxt: {
    color: '#7C8FAC',
    fontSize: 14,
    fontWeight: 400,
    marginLeft: 3,
  },
  agreeTxt: {
    color: '#0054A6',
    fontSize: 14,
    fontWeight: 400,
  },
  touchOpacity: {
    opacity: 0.5,
  },
  startedTouch: {
    width: '100%',
    marginTop: 8,
  },
  startedBtn: {
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '88%',
  },
  startedBtnTxt: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 15,
  },
  bottomView: {
    marginBottom: 40,
  },
  errorTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#F04438',
    marginLeft: 5,
    marginTop: 2,
    marginBottom: 2,
  },
});

export default WatchWalletComponent;
