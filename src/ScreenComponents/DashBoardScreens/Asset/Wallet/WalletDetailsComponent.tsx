/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import {colors} from '../../../../utils/colors';
import appStyles from '../../../../utils/appStyles';
import DashBoardHeaderComponent from '../../../../components/DashBoardHeaderComponent';
import {Feather, Ionicons} from '../../../../utils/IconUtils';
import ModalComponent from '../../../../components/ModalComponent';
import {
  useWalletDeleteMutation,
  useWalletModeMutation,
  useWalletNameChangeMutation,
  useWalletVerifyPwdMutation,
} from '../../../../api/walletAPI';
import useCommon from '../../../../hooks/useCommon';
import {useSelector} from 'react-redux';
import {
  getErrorMessage,
  localStorageKey,
  setStorage,
} from '../../../../utils/common';
import Clipboard from '@react-native-clipboard/clipboard';
import {authAction} from '../../../../reducer/auth/authSlice';
import {useAppDispatch} from '../../../../store';

type Props = NativeStackScreenProps<any, 'WALLET_DETAILS'>;

const WalletDetailsComponent = ({navigation, route}: Props) => {
  const {walletDetails, networkIcon = ''} = route?.params ?? {};

  const {showToast, toggleBackdrop} = useCommon();
  const dispatch = useAppDispatch();

  const [showPassword, togglePassword] = useState(true);
  const [updateWalletDetails, setUpdateWalletDetails] = useState(walletDetails);
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [walletName, setWalletname] = useState(walletDetails?.wallet_name);
  const [walletModes, setWalletModes] = useState('0');
  const [deletePressed, setDeletePressed] = useState(false);

  const [isDelete, setIsDelete] = useState(false);

  const [pwdModalVisible, setPwdModalVisible] = useState(false);
  const [exportText, setExportText] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorTxt, setPasswordErrorTxt] = useState('');

  const {userInfo = {}, walletInfo = {}} = useSelector(
    ({authReducer}: any) => authReducer,
  );

  const [walletNameChange, {isLoading}] = useWalletNameChangeMutation();
  const [walletMode, {isLoading: isModeLoading}] = useWalletModeMutation();
  const [walletDelete, {isLoading: isDeleteLoading}] =
    useWalletDeleteMutation();
  const [walletVerifyPwd, {isLoading: verifyLoading}] =
    useWalletVerifyPwdMutation();

  useEffect(() => {
    toggleBackdrop(
      isLoading || verifyLoading || isModeLoading || isDeleteLoading,
    );
  }, [isLoading || verifyLoading || isModeLoading || isDeleteLoading]);

  useFocusEffect(
    useCallback(() => {
      getWalletMode();
      return () => {};
    }, []),
  );

  const getWalletMode = async () => {
    try {
      const params = {
        network: walletInfo?.network_mode,
        userid: userInfo?.generated_Id,
        walletid: updateWalletDetails?.wallet_id,
      };
      const response: any = await walletMode(params).unwrap();
      if (response?.status) {
        showToast({
          type: 'success',
          text1: response?.message,
        });
        setWalletModes(response?.data?.mode);
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

  const onDismiss = () => {
    setNameModalVisible(false);
    setPwdModalVisible(false);
    setPasswordError(false);
    setPassword('');
    setIsDelete(false);
  };

  const onConfirmNameChange = async () => {
    setNameModalVisible(false);
    if (walletName !== updateWalletDetails?.wallet_name) {
      try {
        const params = {
          network: walletInfo?.network_mode,
          userid: userInfo?.generated_Id,
          wallet_id: updateWalletDetails?.wallet_id,
          wallet_name: walletName,
        };
        const response: any = await walletNameChange(params).unwrap();
        if (response?.success) {
          showToast({
            type: 'success',
            text1: response?.message,
          });
          setUpdateWalletDetails(response?.walletinfo);
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
    }
  };

  const onConfirmExportKeys = async () => {
    if (password === '') {
      setPasswordError(true);
      setPasswordErrorTxt('Password is Missing');
      return;
    }
    setPwdModalVisible(false);
    try {
      const params = {
        network: walletInfo?.network_mode,
        userid: userInfo?.generated_Id,
        wallet_id: updateWalletDetails?.wallet_id,
        password: password,
      };
      const response: any = await walletVerifyPwd(params).unwrap();
      setPassword('');
      if (response?.success) {
        if (exportText === 'recoveryPhrase') {
          navigation.navigate('EXPORT_SECRET_PHARSE', {
            walletInfo: response?.walletinfo,
          });
        } else {
          navigation.navigate('EXPORT_PRIVATEKEY', {
            walletInfo: response?.walletinfo,
          });
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

  const onConfirmDelete = async () => {
    let params: any = {
      network: walletInfo?.network_mode,
      userid: userInfo?.generated_Id,
      wallet_id: updateWalletDetails?.wallet_id,
    };
    setIsDelete(false);
    if (walletModes === '1') {
      if (password === '') {
        setPasswordError(true);
        setPasswordErrorTxt('Password is Missing');
        return;
      }
      setPwdModalVisible(false);
      setDeletePressed(false);
      params = {
        ...params,
        password: password,
      };
    }

    try {
      const response: any = await walletDelete(params).unwrap();
      setPassword('');
      if (response?.success) {
        dispatch(authAction.setWalletInfo(response?.message?.walletinfo));
        await setStorage(
          localStorageKey.walletInfo,
          JSON.stringify(response?.message?.walletinfo),
        );
        navigation.goBack();
      } else {
        if (response?.redirect === 'nowallet') {
          dispatch(authAction.setHomeNewWallet(true));
          navigation.goBack();
          navigation.navigate('WALLET_STACK', {
            screen: 'NEW_WALLET',
            params: {
              screen: 'SELECT_NETWORK',
              params: {},
            },
          });
        } else {
          showToast({
            type: 'error',
            text1: response?.message,
          });
        }
      }
    } catch (err: any) {
      showToast({
        type: 'error',
        text1: getErrorMessage(err),
      });
    }
  };

  const onDeleteWallet = () => {
    if (walletModes === '1') {
      setDeletePressed(true);
      setPwdModalVisible(true);
    } else {
      setIsDelete(true);
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
        <DashBoardHeaderComponent title={'Wallet Details'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={appStyles.scrollContainer}>
          <View
            style={[
              appStyles.boxShadow,
              styles.walletSubContainer,
              styles.walletView,
            ]}>
            <View style={styles.walletImage}>
              <Image
                style={styles.itemLogo}
                source={{
                  uri: networkIcon !== '' ? networkIcon : null,
                }}
              />
            </View>

            <View style={styles.walletAddressView}>
              <Text style={styles.walletAddressTxt}>Wallet Address</Text>
              <View style={styles.walletCopyView}>
                <Text style={styles.walletCopyTxt}>
                  {updateWalletDetails?.wallet_address ??
                    updateWalletDetails?.address}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    showToast({
                      type: 'success',
                      text1: 'Address Copied Successfully',
                    });
                    Clipboard.setString(
                      updateWalletDetails?.wallet_address ??
                        updateWalletDetails?.address,
                    );
                  }}>
                  <Ionicons name={'copy-outline'} size={16} color={'#333333'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <TouchableOpacity
              style={styles.walletTouch}
              onPress={() => {
                setNameModalVisible(true);
              }}>
              <Text style={styles.walletTitleTxt}>Wallet Name</Text>
              <Text style={styles.redirectTxt}>
                {updateWalletDetails?.wallet_name}
              </Text>
              <Ionicons
                name={'chevron-forward'}
                size={22}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          {(walletDetails?.wallet_type === '1' ||
            walletDetails?.wallet_type === '2') && (
            <>
              <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
                <TouchableOpacity
                  style={styles.walletTouch}
                  onPress={() => {
                    setPwdModalVisible(true);
                    setExportText('recoveryPhrase');
                  }}>
                  <Text style={styles.walletTitleTxt}>
                    Export Secret Recovery Phrase
                  </Text>
                  <Ionicons
                    name={'chevron-forward'}
                    size={22}
                    color={'#333333'}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <View style={styles.borderView} />
                <TouchableOpacity
                  style={styles.walletTouch}
                  onPress={() => {
                    setPwdModalVisible(true);
                    setExportText('privateKey');
                  }}>
                  <Text style={styles.walletTitleTxt}>Export Private Key</Text>
                  <Ionicons
                    name={'chevron-forward'}
                    size={22}
                    color={'#333333'}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
              <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
                <TouchableOpacity
                  style={styles.walletTouch}
                  onPress={() => {
                    navigation.navigate('MODIFY_PASSWORD', {
                      walletDetails: updateWalletDetails,
                    });
                  }}>
                  <Text style={styles.walletTitleTxt}>Modify Password</Text>
                  <Ionicons
                    name={'chevron-forward'}
                    size={22}
                    color={'#333333'}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <View style={styles.borderView} />
                <TouchableOpacity
                  style={styles.walletTouch}
                  onPress={() => {
                    navigation.navigate('RESET_PASSWORD', {
                      walletDetails: updateWalletDetails,
                    });
                  }}>
                  <Text style={styles.walletTitleTxt}>Reset Password</Text>
                  <Ionicons
                    name={'chevron-forward'}
                    size={22}
                    color={'#333333'}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}

          <TouchableOpacity
            style={styles.startedTouch}
            onPress={() => {
              onDeleteWallet();
            }}>
            <Text style={styles.startedBtnTxt}>Delete Wallet</Text>
          </TouchableOpacity>
        </ScrollView>

        <ModalComponent
          visibility={nameModalVisible}
          onDismiss={onDismiss}
          onConfirm={onConfirmNameChange}
          titleTxt={'Edit Wallet Name'}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              value={walletName}
              onChangeText={text => {
                setWalletname(text);
              }}
              returnKeyType={'done'}
            />
          </View>
        </ModalComponent>
        <ModalComponent
          visibility={pwdModalVisible}
          onDismiss={onDismiss}
          onConfirm={() => {
            if (deletePressed) {
              onConfirmDelete();
            } else {
              onConfirmExportKeys();
            }
          }}
          titleTxt={'Verify Password'}>
          <>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                value={password}
                placeholder="Wallet Password"
                placeholderTextColor="#9C9DA0"
                secureTextEntry={showPassword}
                onChangeText={text => {
                  setPassword(text);
                  setPasswordError(false);
                  setPasswordErrorTxt('');
                }}
                returnKeyType={'done'}
              />
              <TouchableOpacity onPress={() => togglePassword(p => !p)}>
                <Feather
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={16}
                  color={
                    passwordErrorTxt && passwordError ? '#F04438' : '#9C9DA0'
                  }
                />
              </TouchableOpacity>
            </View>
            {passwordErrorTxt && passwordError && (
              <Text style={styles.errorTxt}>{passwordErrorTxt}</Text>
            )}
          </>
        </ModalComponent>
        <ModalComponent
          visibility={isDelete}
          onDismiss={onDismiss}
          onConfirm={() => {
            onConfirmDelete();
          }}
          titleTxt={''}>
          <>
            <Text style={styles.deleteTxt}>
              Do You Want to Delete the Wallet?
            </Text>
          </>
        </ModalComponent>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  walletSubContainer: {
    backgroundColor: colors.white,
    borderRadius: 6,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 15,
  },
  walletTitleTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    textAlignVertical: 'center',
    marginLeft: 12,
    flex: 1,
  },
  walletTouch: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
  },
  icon: {
    marginRight: 15,
    alignSelf: 'center',
  },
  redirectTxt: {
    fontSize: 12,
    fontWeight: 400,
    color: '#7C8FAC',
    alignItems: 'center',
    marginRight: 5,
    textAlign: 'center',
  },
  itemLogo: {
    width: 30,
    height: 30,
  },
  walletView: {
    flexDirection: 'row',
    padding: 10,
  },
  walletImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletAddressView: {
    justifyContent: 'center',
    marginLeft: 5,
  },
  walletAddressTxt: {
    fontSize: 10,
    fontWeight: 400,
    color: '#7C8FAC',
  },
  walletCopyView: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width / 1.5,
  },
  walletCopyTxt: {
    fontSize: 12,
    fontWeight: 400,
    color: '#333333',
    marginRight: 5,
    marginTop: 2,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8, // Adjust the value to change the roundness
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.gray1,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    color: colors.black,
  },
  errorTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#F04438',
    marginLeft: 15,
    marginTop: 2,
    marginBottom: 2,
  },
  deleteTxt: {
    fontSize: 16,
    fontWeight: 400,
    color: '#333333',
    textAlign: 'center',
    marginTop: 15,
  },
  startedTouch: {
    marginTop: 50,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: '#F44336',
    borderRadius: 10,
  },
  startedBtnTxt: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 15,
  },
});

export default WalletDetailsComponent;
