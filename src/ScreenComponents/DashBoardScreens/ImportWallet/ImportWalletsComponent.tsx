/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../utils/appStyles';
import {colors} from '../../../utils/colors';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import CustomTabs, {getWalletTabs} from '../../../components/CustomTabs';
import LinearGradient from 'react-native-linear-gradient';
import {Feather, Ionicons} from '../../../utils/IconUtils';
import useCommon from '../../../hooks/useCommon';
import {useSelector} from 'react-redux';
import {
  getErrorMessage,
  localStorageKey,
  setStorage,
} from '../../../utils/common';
import {
  usePrivateKeyMutation,
  useSecretPhaseMutation,
} from '../../../api/walletAPI';
import Clipboard from '@react-native-clipboard/clipboard';
import {useAppDispatch} from '../../../store';
import {authAction} from '../../../reducer/auth/authSlice';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

type Props = NativeStackScreenProps<any, 'IMPORT_WALLET'>;

const ImportWalletsComponent = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  const WalletTabs = getWalletTabs(t);
  const {walletTabs, walletNetwork} = route?.params ?? {};

  const {showToast, toggleBackdrop} = useCommon();
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState(walletTabs);
  const [walletName, setWalletName] = useState('');
  const [recoveryPhrase, setRecoveryPhrase] = useState('');
  const [accept, toggleAccept] = useState(false);
  const [showPassword, togglePassword] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorTxt, setPasswordErrorTxt] = useState('');

  const [privateKey, {isLoading}] = usePrivateKeyMutation();
  const [secretPhase, {isLoading: isSecretLoading}] = useSecretPhaseMutation();

  const {userInfo = {}, isHomeNewWallet} = useSelector(
    ({authReducer}: any) => authReducer,
  );

  useEffect(() => {
    toggleBackdrop(isLoading || isSecretLoading);
  }, [isLoading || isSecretLoading]);

  const recoveryPhraseTab = activeTab === WalletTabs.RecoveryPhrase;

  const placeHolderTxt = recoveryPhraseTab
    ? t('RECOVERY_PHRASE_PLACE_HOLDER')
    : t('PRIVATE_KEY_PLACE_HOLDER');
  const titleTxt = recoveryPhraseTab
    ? t('RECOVERY_PHRASE_TITLE')
    : t('RECOVERY_PHRASE_TITLE');

  const fetchCopiedKey = async () => {
    const text = await Clipboard.getString();
    if (text) {
      setRecoveryPhrase(text);
    }
  };

  const tabsView = () => {
    return (
      <View style={styles.containerView}>
        {!recoveryPhraseTab && <Text style={styles.titleTxt}>{titleTxt}</Text>}
        <View style={styles.multiLineContainer}>
          <TextInput
            style={styles.multiLineInput}
            placeholder={placeHolderTxt}
            placeholderTextColor="#9C9DA0"
            value={recoveryPhrase}
            multiline={true}
            onChangeText={text => setRecoveryPhrase(text)}
          />
          <View style={styles.pasteCard}>
            <TouchableOpacity>
              <Text style={styles.pasteTxt}>{t('KEYPAL_CARD')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => fetchCopiedKey()}>
              <Text style={styles.pasteTxt}>{t('PASTE')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.inputTitleTxt}>{t('WALLET_NAME')}</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder={t('WALLET_NAME_PLACE_HOLDER')}
            placeholderTextColor="#9C9DA0"
            value={walletName}
            onChangeText={text => setWalletName(text)}
          />
        </View>
        <Text style={styles.inputTitleTxt}>{t('PASSWORD')}</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder={t('PASSWORD_PLACE_HOLDER')}
            placeholderTextColor="#9C9DA0"
            value={password}
            secureTextEntry={showPassword}
            onChangeText={text => {
              setPassword(text);
              setPasswordError(false);
              setPasswordErrorTxt('');
            }}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          />
          <TouchableOpacity onPress={() => togglePassword(p => !p)}>
            <Feather
              name={showPassword ? 'eye-off' : 'eye'}
              size={18}
              color={passwordErrorTxt && passwordError ? '#F04438' : '#9C9DA0'}
            />
          </TouchableOpacity>
        </View>
        {passwordErrorTxt && passwordError && (
          <Text style={styles.errorTxt}>{passwordErrorTxt}</Text>
        )}
      </View>
    );
  };

  const importKeys = async () => {
    try {
      let params: any = {
        network: walletNetwork?.ID,
        userid: userInfo?.generated_Id,
        wallet_name: walletName,
        password: password,
      };
      params =
        activeTab === WalletTabs.PrivateKey
          ? {
              ...params,
              private_key: recoveryPhrase,
            }
          : {
              ...params,
              secret_key: Array.isArray(recoveryPhrase)
                ? recoveryPhrase?.join(' ')
                : recoveryPhrase,
            };
      let response: any;
      if (activeTab === WalletTabs.PrivateKey) {
        response = await privateKey(params).unwrap();
      } else {
        response = await secretPhase(params).unwrap();
      }
      if (response?.success) {
        const wallet = {
          ...response?.walletinfo,
          Wallet_icon: walletNetwork?.Wallet_icon,
        };
        dispatch(authAction.setWalletInfo(wallet));
        await setStorage(localStorageKey.walletInfo, JSON.stringify(wallet));
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
      <SafeAreaView
        style={appStyles.container}
        edges={['right', 'left', 'top']}>
        <DashBoardHeaderComponent title={t('IMPORT_WALLETS')} />
        <View style={styles.tabsView}>
          <CustomTabs
            activeTab={activeTab}
            onSelectItem={(val: any) => setActiveTab(val)}
            titles={[WalletTabs.RecoveryPhrase, WalletTabs.PrivateKey]}
          />
        </View>
        {tabsView()}
        <View style={styles.bottomView}>
          <View style={styles.readAgreeView}>
            <TouchableOpacity onPress={() => toggleAccept(a => !a)}>
              <Ionicons
                name={accept ? 'checkbox-outline' : 'square-outline'}
                size={scale(14)}
                color={'#0054A6'}
              />
            </TouchableOpacity>
            <Text style={styles.readAgreeTxt}>
              {t('I_HAVE_READ_AND_AGREE')}
            </Text>
            <Text style={styles.agreeTxt}>{t('TERMS_OF_SERVICE')}</Text>
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
              <Text style={styles.startedBtnTxt}>{t('CONFIRM')}</Text>
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
    fontSize: moderateScale(12),
    fontWeight: 400,
    color: '#333333',
    marginTop: 10,
    marginLeft: 5,
  },
  inputTitleTxt: {
    fontSize: moderateScale(14),
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
    height: verticalScale(130),
  },
  input: {
    flex: 1,
    paddingVertical: moderateScale(12),
    color: colors.black,
    fontSize: moderateScale(12),
  },
  multiLineInput: {
    height: verticalScale(90),
    marginBottom: 10,
    color: colors.black,
    textAlignVertical: 'top',
    fontSize: moderateScale(12),
  },
  pasteCard: {
    height: verticalScale(30),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  advanceCard: {
    marginRight: 5,
  },
  pasteTxt: {
    color: '#0054A6',
    fontSize: moderateScale(12),
    fontWeight: 400,
    marginRight: 10,
  },
  modeTxt: {
    color: '#7C8FAC',
    fontSize: moderateScale(12),
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
    alignItems: 'center',
  },
  readAgreeTxt: {
    color: '#7C8FAC',
    fontSize: moderateScale(14),
    fontWeight: 400,
    marginLeft: 3,
  },
  agreeTxt: {
    color: '#0054A6',
    fontSize: moderateScale(14),
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
    fontSize: moderateScale(16),
    textAlign: 'center',
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 15,
  },
  bottomView: {
    marginBottom: 40,
  },
  errorTxt: {
    fontSize: moderateScale(14),
    fontWeight: 400,
    color: '#F04438',
    marginLeft: 5,
    marginTop: 2,
    marginBottom: 2,
  },
});

export default ImportWalletsComponent;
