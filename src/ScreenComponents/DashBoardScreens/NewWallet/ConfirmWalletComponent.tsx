/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Dimensions,
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
import ApproveWallet from '../../../assets/approve_wallet.svg';
import Instruction1 from '../../../assets/instruction1.svg';
import Instruction2 from '../../../assets/instruction2.svg';
import Instruction3 from '../../../assets/instruction3.svg';
import Instruction4 from '../../../assets/instruction4.svg';
import {getErrorMessage} from '../../../utils/common';

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
    console.log('walletInfo', walletInfo);
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
            <ApproveWallet />
          </View>
          <Text style={styles.titleTxt}>
            Learn the Content and Keep the Safety in your Mind
          </Text>
          <View style={styles.instructionView}>
            <Instruction1 />
            <Text style={styles.instructionTxt}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspen
            </Text>
          </View>
          <View style={styles.instructionView}>
            <Instruction2 />
            <Text style={styles.instructionTxt}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspen
            </Text>
          </View>
          <View style={styles.instructionView}>
            <Instruction3 />
            <Text style={styles.instructionTxt}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspen
            </Text>
          </View>
          <View style={styles.instructionView}>
            <Instruction4 />
            <Text style={styles.instructionTxt}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspen
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
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  titleTxt: {
    color: '#333333',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 600,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  instructionTxt: {
    color: '#333333',
    fontSize: 14,
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
    fontSize: 16,
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
