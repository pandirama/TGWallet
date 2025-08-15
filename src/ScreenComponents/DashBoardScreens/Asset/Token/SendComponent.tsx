/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */

import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../../utils/appStyles';
import {colors} from '../../../../utils/colors';
import DashBoardHeaderComponent from '../../../../components/DashBoardHeaderComponent';
import {useSelector} from 'react-redux';
import useCommon from '../../../../hooks/useCommon';
import {
  useGetSendWalletMutation,
  useSendWalletMutation,
} from '../../../../api/walletAPI';
import {getErrorMessage} from '../../../../utils/common';
import LinearGradient from 'react-native-linear-gradient';
import ChooseWalletComponent from './ChooseWalletComponent';
import {useFocusEffect} from '@react-navigation/native';
import {useGetNetworksQuery} from '../../../../api/auth/authAPI';
import { moderateScale } from 'react-native-size-matters';

type Props = NativeStackScreenProps<any, 'SEND'>;

const SendComponent = ({navigation}: Props) => {
  const {t} = useTranslation();
  const {showToast, toggleBackdrop} = useCommon();
  const {walletInfo = {}, userInfo = {}} = useSelector(
    ({authReducer}: any) => authReducer,
  );
  const {network_mode} = walletInfo ?? {};

  const [inputName, setInputName] = useState('');
  const [inputAmount, setInputAmount] = useState('');
  const [showWallets, setShowWallets] = useState(false);
  const [networks, setNetworks] = useState<any>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<any>(null);
  const [sendResponse, setSendResponse] = useState<any>(null);

  const [sendWallet, {isLoading}] = useSendWalletMutation();

  const {isFetching, refetch} = useGetNetworksQuery();

  const [getSendWallet, {isLoading: isTokenLoading}] =
    useGetSendWalletMutation();

  useEffect(() => {
    toggleBackdrop(isLoading || isFetching || isTokenLoading);
  }, [isLoading || isFetching || isTokenLoading]);

  const getWalletInfos = async () => {
    try {
      const params = {
        wallet_id: walletInfo?.wallet_id,
        userid: userInfo?.generated_Id,
        token_address: walletInfo?.address,
      };
      const response: any = await getSendWallet(params).unwrap();
      if (response?.success) {
        setSendResponse(response);
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

  useFocusEffect(
    useCallback(() => {
      refetch().then(response => {
        const {isSuccess, isError, data, error} = response;
        if (isSuccess) {
          setNetworks(data?.networks);
          setSelectedNetwork(data?.networks[0]);
        } else if (isError) {
          showToast({
            type: 'error',
            text1: getErrorMessage(error),
          });
        }
      });
      getWalletInfos();
      return () => {};
    }, []),
  );

  const onConfirmSend = async () => {
    try {
      const params = {
        wallet_id: walletInfo?.wallet_id,
        userid: userInfo?.generated_Id,
        network: walletInfo?.ID,
        receive_address: inputName,
        amount: inputAmount,
        token_address: walletInfo?.address,
      };
      const response: any = await sendWallet(params).unwrap();
      if (response?.success) {
        navigation.goBack();
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <DashBoardHeaderComponent title={t('SEND')} />
          <View style={styles.walletContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  flex: 1,
                  fontSize: moderateScale(14),
                  fontWeight: 600,
                  color: '#333333',
                }}>
                {t('SEND_TO')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowWallets(true);
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(10),
                    fontWeight: 400,
                    color: '#0054A6',
                  }}>
                  {t('CHOOSE_WALLET_ARROW')}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                placeholder={t('PLEASE_ENTER_WALLET_ADDRESS')}
                placeholderTextColor="#9C9DA0"
                value={inputName}
                onChangeText={text => {
                  setInputName(text);
                }}
              />
            </View>

            <Text
              style={{
                fontSize: moderateScale(14),
                fontWeight: 600,
                color: '#333333',
                marginTop: 25,
              }}>
              {t('TRANSFER')}
            </Text>

            <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
              <View style={{marginBottom: 10, marginTop: 5}}>
                <TextInput
                  style={styles.inputAmount}
                  placeholder="0"
                  placeholderTextColor="#9C9DA0"
                  value={inputAmount}
                  keyboardType="numeric"
                  returnKeyType="done"
                  onChangeText={text => {
                    setInputAmount(text);
                  }}
                />
              </View>
              <View style={styles.walletTouch}>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontWeight: 400,
                    color: '#333333',
                    textAlign: 'center',
                  }}>
                  {t('BALANCE')}
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontWeight: 400,
                    color: '#9C9DA0',
                    marginLeft: 5,
                    textAlign: 'center',
                  }}>
                  {sendResponse?.Balance}
                </Text>
              </View>
              <View style={styles.walletUSDTouch}>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontWeight: 400,
                    color: '#333333',
                    textAlign: 'center',
                  }}>
                  {t('BALANCE_IN_USD')}
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontWeight: 400,
                    color: '#9C9DA0',
                    marginLeft: 5,
                    textAlign: 'center',
                  }}>
                  {sendResponse?.BalanceInUSD}
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: moderateScale(14),
                fontWeight: 600,
                color: '#333333',
                marginTop: 25,
              }}>
              {t('NETWORK_FEE')}
            </Text>

            <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
              <View
                style={{marginLeft: 5, marginBottom: 10, flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontWeight: 500,
                    flex: 1,
                    color: '#9C9DA0',
                  }}>
                  {t('ESTIMATED')}
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontWeight: 500,
                    flex: 1,
                    textAlign: 'right',
                    marginRight: 15,
                    color: '#333333',
                  }}>
                  {sendResponse?.NetworkFee}
                </Text>
              </View>
              <View
                style={{marginLeft: 5, marginBottom: 10, flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontWeight: 500,
                    flex: 1,
                    color: '#9C9DA0',
                  }}>
                  {t('MAX_FEE')}
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontWeight: 500,
                    flex: 1,
                    textAlign: 'right',
                    marginRight: 15,
                    color: '#333333',
                  }}>
                  {sendResponse?.MaxFee}
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.bottomView}>
          <TouchableOpacity
            style={[styles.startedTouch]}
            onPress={onConfirmSend}>
            <LinearGradient
              colors={['#6B121C', '#ED1C24']}
              style={styles.startedBtn}>
              <Text style={styles.startedBtnTxt}>{t('CONFIRM')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <ChooseWalletComponent
          navigation={navigation}
          showWallets={showWallets}
          setShowWallets={setShowWallets}
          networkMode={network_mode}
          selectedNetworkMode={selectedNetwork}
          networks={networks}
          chooseWallets={sendResponse?.choose_wallets}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  walletContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  walletSubContainer: {
    backgroundColor: colors.white,
    paddingLeft: 15,
    borderRadius: 8,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  walletSubContainer1: {
    margin: 20,
    marginBottom: 5,
    flex: 1,
  },
  walletTitleTxt: {
    fontSize: moderateScale(14),
    fontWeight: 600,
    color: '#333333',
    flex: 1,
    marginLeft: 8,
  },
  networkTxt: {
    fontSize: moderateScale(15),
    fontWeight: 600,
    color: '#333333',
    textAlignVertical: 'center',
    marginLeft: 23,
    marginTop: 25,
  },
  icon: {
    marginRight: 15,
  },
  walletTouch: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'flex-end',
    marginRight: 20,
  },
  walletUSDTouch: {
    flexDirection: 'row',
    paddingBottom: 10,
    justifyContent: 'flex-end',
    marginRight: 20,
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
    marginRight: 15,
    paddingLeft: 0,
  },
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
    marginRight: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8, // Adjust the value to change the roundness
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.gray1,
    marginTop: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    color: colors.black,
  },
  inputAmount: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingVertical: 15,
    color: colors.black,
    marginRight: 15,
  },
  nftNameTxt: {
    fontSize: moderateScale(12),
    fontWeight: 500,
    color: '#333333',
  },
  nftValueTxt: {
    fontSize: moderateScale(10),
    fontWeight: 400,
    color: '#7C8FAC',
  },
  nftNameView: {
    flex: 1,
    marginLeft: 10,
  },
  listHeaderView: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  listView: {
    width: '88%',
  },
  addIcon: {
    marginBottom: 15,
    padding: 10,
  },
  assetItemTouch: {
    padding: 10,
  },
  selectedAssetItemTxt: {
    fontSize: moderateScale(14),
    fontWeight: 600,
    color: '#333333',
  },
  assetItemTxt: {
    fontSize: moderateScale(14),
    fontWeight: 600,
    color: '#7C8FAC',
  },
  itemTitleTxt: {
    fontSize: moderateScale(16),
    flex: 0.15,
    fontWeight: 800,
    color: '#33333',
  },
  itemSubTxt: {
    fontSize: moderateScale(14),
    fontWeight: 400,
    flex: 1,
    color: '#333333',
  },
  verticalView: {
    width: 25,
    height: 3,
    backgroundColor: '#333333',
    alignSelf: 'center',
    borderRadius: 5,
  },
  headerSubContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  menuItemTouch: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemTxt: {
    fontSize: moderateScale(14),
    fontWeight: 400,
    color: '#333333',
    textAlign: 'center',
  },
  horizontalBorder: {
    borderWidth: 0.5,
    width: 1,
    height: 25,
    borderColor: colors.gray1,
  },
  itemLogo: {
    width: 45,
    height: 45,
    alignSelf: 'center',
  },
  balanceTxt: {
    fontSize: moderateScale(12),
    fontWeight: 400,
    color: '#7C8FAC',
    marginTop: 2,
  },
  balanceValTxt: {
    fontSize: moderateScale(18),
    fontWeight: 600,
    color: '#333333',
    marginTop: 2,
  },
  balanceUSDTxt: {
    fontSize: moderateScale(14),
    fontWeight: 600,
    color: '#7C8FAC',
    marginTop: 2,
  },
  inputTitleTxt: {
    fontSize: moderateScale(14),
    fontWeight: 400,
    color: '#333333',
    marginBottom: 1,
    marginTop: 20,
    marginLeft: 5,
    lineHeight: 20,
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
  walletCopyView: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width / 1.5,
  },
  walletCopyTxt: {
    fontSize: moderateScale(12),
    fontWeight: 400,
    color: '#333333',
    marginRight: 5,
    marginTop: 2,
  },
});

export default SendComponent;
