/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import DashBoardHeaderComponent from '../../../../components/DashBoardHeaderComponent';
import useCommon from '../../../../hooks/useCommon';
import appStyles from '../../../../utils/appStyles';
import {colors} from '../../../../utils/colors';
import {getErrorMessage} from '../../../../utils/common';
import {Feather} from '../../../../utils/IconUtils';
import {
  useWalletResetPwdMutation,
} from '../../../../api/walletAPI';

type Props = NativeStackScreenProps<any, 'RESET_PASSWORD'>;

const ResetPasswordComponent = ({route, navigation}: Props) => {
  const {walletDetails} = route?.params ?? {};

  const {showToast, toggleBackdrop} = useCommon();

  const [showOldPassword, toggleOldPassword] = useState(true);
  const [showPassword, togglePassword] = useState(true);
  const [showConfirmPassword, toggleConfirmPassword] = useState(true);

  const [memorizeWords, setMemorizeWords] = useState('');
  //OldPassword
  const [passPharse, setPassPharse] = useState('');
  //New Password
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorTxt, setPasswordErrorTxt] = useState('');
  //Confirm Password
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const wordFieldRef = useRef<TextInput>(null);
  const passPharseFieldRef = useRef<TextInput>(null);
  const passwordFieldRef = useRef<TextInput>(null);

  const [walletResetPwd, {isLoading}] = useWalletResetPwdMutation();

  const {userInfo = {}, walletInfo = {}} = useSelector(
    ({authReducer}: any) => authReducer,
  );

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  const onConfirm = async () => {
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
        network: walletInfo?.network_mode,
        userid: userInfo?.generated_Id,
        wallet_id: walletDetails?.wallet_id,
        secret_pharse: memorizeWords,
        pass_phrase: passPharse,
        new_pass: password,
        confirm_pass: confirmPassword,
      };
      const response: any = await walletResetPwd(payload).unwrap();
      if (response?.success) {
        showToast({
          type: 'success',
          text1: response?.message,
        });
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
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
        <DashBoardHeaderComponent title={'Reset Password'} />
        <View style={styles.topView}>
          <View style={styles.searchWordsContainer}>
            <TextInput
              style={styles.wordInput}
              placeholder="Memorizing words, separated by space"
              placeholderTextColor="#9C9DA0"
              value={memorizeWords}
              multiline={true}
              onChangeText={text => {
                setMemorizeWords(text);
              }}
              returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
              onSubmitEditing={() => wordFieldRef.current?.focus()}
            />
            <TouchableOpacity style={styles.pasteTouch}>
              <Text style={styles.pasteTxt}>Paste</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.inputTitleTxt}>Passphrase</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="Not required if left blank"
              placeholderTextColor="#9C9DA0"
              value={passPharse}
              onChangeText={text => {
                setPassPharse(text);
              }}
              ref={wordFieldRef}
              returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
              onSubmitEditing={() => passPharseFieldRef.current?.focus()}
            />
            <TouchableOpacity onPress={() => toggleOldPassword(p => !p)}>
              <Feather
                name={showOldPassword ? 'eye-off' : 'eye'}
                size={18}
                color={'#9C9DA0'}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.inputTitleTxt}>Set Password</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password is not less than 8 digits"
              placeholderTextColor="#9C9DA0"
              value={password}
              secureTextEntry={showPassword}
              onChangeText={text => {
                setPassword(text);
                setPasswordError(false);
                setPasswordErrorTxt('');
              }}
              ref={passPharseFieldRef}
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
          <Text style={styles.inputTitleTxt}>Repeat New password</Text>
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
              returnKeyType={'done'}
            />
            <TouchableOpacity onPress={() => toggleConfirmPassword(p => !p)}>
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
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity style={styles.startedTouch} onPress={onConfirm}>
            <LinearGradient
              colors={['#6B121C', '#ED1C24']}
              style={styles.startedBtn}>
              <Text style={styles.startedBtnTxt}>Add</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    marginBottom: 60,
  },
  searchWordsContainer: {
    backgroundColor: colors.white,
    borderRadius: 8, // Adjust the value to change the roundness
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.gray1,
    height: 130,
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
  pasteTouch: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  pasteTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#0054A6',
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    color: colors.black,
  },
  wordInput: {
    flex: 1,
    paddingVertical: 13,
    color: colors.black,
    textAlignVertical: 'top',
    height: 100,
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

export default ResetPasswordComponent;
