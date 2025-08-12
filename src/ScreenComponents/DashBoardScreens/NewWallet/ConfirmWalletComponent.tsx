/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../utils/appStyles';
import {colors} from '../../../utils/colors';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import LinearGradient from 'react-native-linear-gradient';
import {useWalletApproveMutation} from '../../../api/auth/authAPI';
import useCommon from '../../../hooks/useCommon';
import {useSelector} from 'react-redux';
import Instruction1 from '../../../assets/instruction1.svg';
import Instruction2 from '../../../assets/instruction2.svg';
import Instruction3 from '../../../assets/instruction3.svg';
import Instruction4 from '../../../assets/instruction4.svg';
import {getErrorMessage} from '../../../utils/common';
import {moderateScale, scale} from 'react-native-size-matters';

type Props = NativeStackScreenProps<any, 'CONFIRM_WALLET'>;

const ConfirmWalletComponent = ({route, navigation}: Props) => {
  const {walletInfo} = route?.params ?? {};

  const {showToast, toggleBackdrop} = useCommon();

  const [walletApprove, {isLoading}] = useWalletApproveMutation();

  const {userInfo = {}} = useSelector(({authReducer}: any) => authReducer);

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  const approveWallet = async () => {
    try {
      const payload = {
        network: walletInfo?.network,
        wallet_id: walletInfo?.wallet_id,
        userid: userInfo?.generated_Id,
      };

      const response: any = await walletApprove(payload).unwrap();
      if (response?.success) {
        navigation.navigate('BACKUP_RECOVERY', {
          walletInfo,
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
        <DashBoardHeaderComponent title={'Create Wallet'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Image source={require('../../../assets/tg_approve_wallet.png')} />
          </View>
          <Text style={styles.titleTxt}>
            Read the following carefully and remember these important safety
            tips.
          </Text>
          <View style={styles.instructionView}>
            <Instruction1 width={scale(40)} height={scale(40)} />
            <Text style={styles.instructionTxt}>
              Your assets are secured by Private Keys and the Recovery Phrase.
              If exposed, others may gain control of your assets! Never share
              your Private Keys or Recovery Phrase with anyone, not even with
              us!
            </Text>
          </View>
          <View style={styles.instructionView}>
            <Instruction2 width={scale(40)} height={scale(40)} />
            <Text style={styles.instructionTxt}>
              Carefully write down your Recovery Phrase and keep it stored
              safely offline. Never send or save it through any online platform!
            </Text>
          </View>
          <View style={styles.instructionView}>
            <Instruction3 width={scale(40)} height={scale(40)} />
            <Text style={styles.instructionTxt}>
              The Wallet Password is used solely to encrypt and decrypt the
              Private Key and Recovery Phrase. It is stored only on your mobile
              device. If forgotten, it cannot be recovered!
            </Text>
          </View>
          <View style={styles.instructionView}>
            <Instruction4 width={scale(40)} height={scale(40)} />
            <Text style={styles.instructionTxt}>
              Avoid taking screenshots of your Private Keys or Recovery Phrase,
              as they may be intercepted by malicious software!
            </Text>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.startedTouch} onPress={approveWallet}>
          <LinearGradient
            colors={['#6B121C', '#ED1C24']}
            style={styles.startedBtn}>
            <Text style={styles.startedBtnTxt}>Understood</Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  instructionView: {
    flexDirection: 'row',
    marginLeft: 16,
    marginRight: 16,
    paddingTop: 15,
    paddingBottom: 5,
    alignItems: 'center',
  },
  titleTxt: {
    color: '#333333',
    fontSize: moderateScale(16),
    fontWeight: 600,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  instructionTxt: {
    color: '#333333',
    fontSize: moderateScale(14),
    fontWeight: 400,
    flex: 1,
    marginLeft: 10,
  },
  startedTouch: {
    width: '100%',
    marginBottom: 30,
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
  touchOpacity: {
    opacity: 0.5,
  },
});

export default ConfirmWalletComponent;
