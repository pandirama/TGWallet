/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Platform,
  ScrollView,
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
import LinearGradient from 'react-native-linear-gradient';
import {useWalletCreateMutation} from '../../../api/auth/authAPI';
import useCommon from '../../../hooks/useCommon';
import {getErrorMessage} from '../../../utils/common';
import {useSelector} from 'react-redux';
import {Feather, Ionicons} from '../../../utils/IconUtils';

type Props = NativeStackScreenProps<any, 'NEW_WALLET_PASSWORD'>;

const WalletPasswordComponent = ({route, navigation}: Props) => {
  const {walletNetwork} = route?.params ?? {};

  console.log('walletNetwork', route);

  const {showToast, toggleBackdrop} = useCommon();

  const [showPassword, togglePassword] = useState(true);
  const [showConfirmPassword, toggleConfirmPassword] = useState(true);
  const [accept, toggleAccept] = useState(false);

  const [walletName, setWalletName] = useState('');
  const [walletNameError, setWalletNameError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorTxt, setPasswordErrorTxt] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordHint, setPasswordHint] = useState('');

  const walletNameFieldRef = useRef<TextInput>(null);
  const passwordFieldRef = useRef<TextInput>(null);
  const confirmPasswordFieldRef = useRef<TextInput>(null);

  const [walletCreate, {isLoading}] = useWalletCreateMutation();

  const {userInfo = {}} = useSelector(({authReducer}: any) => authReducer);

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  const generateWallet = async () => {
    if (walletName === '') {
      setWalletNameError(true);
      return;
    }
    if (password === '') {
      setPasswordError(true);
      setPasswordErrorTxt('Password is Missing');
      return;
    } else if (password.length <= 7) {
      setPasswordError(true);
      setPasswordErrorTxt(' The password must contain more than 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError(true);
      setConfirmPasswordError(true);
      return;
    }

    try {
      const payload = {
        userid: userInfo?.generated_Id,
        wallet_name: walletName,
        network: walletNetwork?.ID,
        password: password,
        hint: passwordHint,
      };

      const response: any = await walletCreate(payload).unwrap();
      if (response?.success) {
        navigation.navigate('CONFIRM_WALLET', {
          walletInfo: response?.walletinfo,
        });
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
        <DashBoardHeaderComponent />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={appStyles.scrollContainer}>
          <View style={styles.topView}>
            <Text style={styles.titleTxt}>Create Wallet Password</Text>
            <Text style={styles.subTitleTxt}>
              This password will only be used to unlock TGWallet in this device,
              and the password will only be saved in this device
            </Text>

            <View>
              <Text style={styles.inputTitleTxt}>
                Wallet Name ({walletNetwork?.Wallet_network})
              </Text>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Max. 12 characters"
                  placeholderTextColor="#9C9DA0"
                  value={walletName}
                  onChangeText={text => {
                    setWalletName(text);
                    setWalletNameError(false);
                  }}
                  returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                  onSubmitEditing={() => walletNameFieldRef.current?.focus()}
                />
              </View>
              {walletNameError && (
                <Text style={styles.errorTxt}>The wallet name missing</Text>
              )}

              <Text style={styles.inputTitleTxt}>Set Password</Text>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Min. 8 characters"
                  placeholderTextColor="#9C9DA0"
                  value={password}
                  secureTextEntry={showPassword}
                  onChangeText={text => {
                    setPassword(text);
                    setPasswordError(false);
                    setPasswordErrorTxt('');
                  }}
                  ref={walletNameFieldRef}
                  returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                  onSubmitEditing={() => passwordFieldRef.current?.focus()}
                />
                <TouchableOpacity onPress={() => togglePassword(p => !p)}>
                  <Feather
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={18}
                    color={
                      passwordErrorTxt && passwordError ? '#F04438' : '#9C9DA0'
                    }
                  />
                </TouchableOpacity>
              </View>
              {passwordErrorTxt && passwordError && (
                <Text style={styles.errorTxt}>{passwordErrorTxt}</Text>
              )}

              <Text style={styles.inputTitleTxt}>Confirm Password</Text>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Repeat password"
                  placeholderTextColor="#9C9DA0"
                  value={confirmPassword}
                  secureTextEntry={showConfirmPassword}
                  onChangeText={text => {
                    setConfirmPassword(text);
                    setConfirmPasswordError(false);
                  }}
                  ref={passwordFieldRef}
                  returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                  onSubmitEditing={() =>
                    confirmPasswordFieldRef.current?.focus()
                  }
                />
                <TouchableOpacity
                  onPress={() => toggleConfirmPassword(p => !p)}>
                  <Feather
                    name={showConfirmPassword ? 'eye-off' : 'eye'}
                    size={18}
                    color={confirmPasswordError ? '#F04438' : '#9C9DA0'}
                  />
                </TouchableOpacity>
              </View>
              {confirmPasswordError && (
                <Text style={styles.errorTxt}>The password is not match</Text>
              )}

              <Text style={styles.inputTitleTxt}>Password hint (Optional)</Text>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter reminder of the password"
                  placeholderTextColor="#9C9DA0"
                  value={passwordHint}
                  onChangeText={text => {
                    setPasswordHint(text);
                  }}
                  ref={confirmPasswordFieldRef}
                  returnKeyType={'done'}
                />
              </View>
            </View>
          </View>
          <View style={styles.bottomView}>
            <View style={styles.readAgreeView}>
              <TouchableOpacity onPress={() => toggleAccept(a => !a)}>
                <Ionicons
                  name={accept ? 'checkbox-outline' : 'square-outline'}
                  size={18}
                  color={accept ? '##0054A6' : '#E0E0E0'}
                />
              </TouchableOpacity>
              <Text style={styles.readAgreeTxt}>I have read and agree </Text>
              <Text style={styles.agreeTxt}>User Agreement</Text>
            </View>
            <TouchableOpacity
              style={[styles.startedTouch, !accept && styles.touchOpacity]}
              disabled={!accept}
              onPress={generateWallet}>
              <LinearGradient
                colors={['#6B121C', '#ED1C24']}
                style={styles.startedBtn}>
                <Text style={styles.startedBtnTxt}>Confirm</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  topView: {
    marginLeft: 16,
    marginRight: 16,
    flex: 1,
  },
  bottomView: {
    marginTop: 60,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8, // Adjust the value to change the roundness
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.gray1,
  },
  errorTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#F04438',
    marginLeft: 5,
    marginTop: 2,
    marginBottom: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    color: colors.black,
  },
  titleTxt: {
    fontSize: 20,
    fontWeight: 600,
    color: '#333333',
    marginBottom: 5,
  },
  subTitleTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#7C8FAC',
    marginBottom: 25,
  },
  inputTitleTxt: {
    fontSize: 14,
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
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 15,
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
    color: '#ED1C24',
    fontSize: 14,
    fontWeight: 400,
  },
  touchOpacity: {
    opacity: 0.5,
  },
});

export default WalletPasswordComponent;
