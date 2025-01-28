/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
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
  useWalletNameChangeMutation,
  useWalletVerifyPwdMutation,
} from '../../../../api/walletAPI';
import useCommon from '../../../../hooks/useCommon';
import {useSelector} from 'react-redux';
import {getErrorMessage} from '../../../../utils/common';

type Props = NativeStackScreenProps<any, 'WALLET_DETAILS'>;

const WalletDetailsComponent = ({navigation, route}: Props) => {
  const {walletDetails, networkIcon} = route?.params ?? {};

  const {showToast, toggleBackdrop} = useCommon();

  const [showPassword, togglePassword] = useState(true);
  const [updateWalletDetails, setUpdateWalletDetails] = useState(walletDetails);
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [walletName, setWalletname] = useState(walletDetails?.wallet_name);

  const [pwdModalVisible, setPwdModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorTxt, setPasswordErrorTxt] = useState('');

  const {userInfo = {}, walletInfo = {}} = useSelector(
    ({authReducer}: any) => authReducer,
  );

  const [walletNameChange, {isLoading}] = useWalletNameChangeMutation();
  const [walletVerifyPwd, {isLoading: verifyLoading}] =
    useWalletVerifyPwdMutation();

  useEffect(() => {
    toggleBackdrop(isLoading || verifyLoading);
  }, [isLoading || verifyLoading]);

  useFocusEffect(
    useCallback(() => {
      // getWallets();
      return () => {};
    }, []),
  );

  const onDismiss = () => {
    setNameModalVisible(false);
    setPwdModalVisible(false);
    setPasswordError(false);
    setPassword('');
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
        console.log('response', response);
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
        navigation.navigate('EXPORT_PRIVATEKEY');
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
                  uri: networkIcon,
                }}
              />
            </View>

            <View style={styles.walletAddressView}>
              <Text style={styles.walletAddressTxt}>Wallet Address</Text>
              <View style={styles.walletCopyView}>
                <Text style={styles.walletCopyTxt}>
                  {updateWalletDetails?.wallet_address}
                </Text>
                <Ionicons name={'copy-outline'} size={16} color={'#333333'} />
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
          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <TouchableOpacity
              style={styles.walletTouch}
              onPress={() => {
                setPwdModalVisible(true);
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
            <TouchableOpacity style={styles.walletTouch}>
              <Text style={styles.walletTitleTxt}>Add Wallet</Text>
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
          <TouchableOpacity style={styles.startedTouch}>
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
          onConfirm={onConfirmExportKeys}
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
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  walletSubContainer: {
    backgroundColor: colors.white,
    borderRadius: 5,
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
