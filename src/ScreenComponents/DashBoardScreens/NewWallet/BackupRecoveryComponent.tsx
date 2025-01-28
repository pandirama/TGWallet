/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
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
import {useGenerateMnemonicMutation} from '../../../api/auth/authAPI';
import useCommon from '../../../hooks/useCommon';
import {getErrorMessage} from '../../../utils/common';
import Recover from '../../../assets/recover_Pharse.svg';
import {useSelector} from 'react-redux';
import {Ionicons} from '../../../utils/IconUtils';

type Props = NativeStackScreenProps<any, 'BACKUP_RECOVERY'>;

const windowHeight = Dimensions.get('window').height;

const BackupRecoveryComponent = ({navigation, route}: Props) => {
  const {walletInfo} = route?.params ?? {};

  const {showToast, toggleBackdrop} = useCommon();

  const {userInfo = {}} = useSelector(({authReducer}: any) => authReducer);

  const [accept1, toggleAccept1] = useState(false);
  const [accept2, toggleAccept2] = useState(false);
  const [accept3, toggleAccept3] = useState(false);

  const [generateMnemonic, {isLoading}] = useGenerateMnemonicMutation();

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  const getMnemonic = async () => {
    try {
      const payload = {
        network: walletInfo?.network,
        wallet_id: walletInfo?.wallet_id,
        userid: userInfo?.generated_Id,
      };

      const response: any = await generateMnemonic(payload).unwrap();
      if (response?.success) {
        navigation.navigate('COMPLETED_BACKUP', {
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
        <DashBoardHeaderComponent title={'Backup Secret Recovery Phrase'} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={appStyles.scrollContainer}>
          <View style={styles.container}>
            <Recover width={'100%'} />
            <Text style={styles.recoverTitleTxt}>Backup Recovery Phrase</Text>
            <Text style={styles.recoversubTitleTxt}>
              Recovery Phrase is the credientials to recover the wallet, and it
              is only saved in your device. Please make sure to make a backup so
              that you can recover it in the future
            </Text>
            <View style={styles.importantView}>
              <Text style={styles.impTitleTxt}>Important</Text>
              <Text style={styles.impSubTitleTxt}>
                Anyone who has the mnemonic can take control of your wallets.
              </Text>
            </View>
            <Text style={styles.suggestTitleTxt}>Suggested Backup Method</Text>
            <Text style={styles.suggestTxt}>
              {'\u25CF'}
              {'   '} Using pen and paper, write Recovery Phrase correctly in
              order
            </Text>
            <Text style={styles.suggestTxt}>
              {'\u25CF'}
              {'   '} Keep Recovery Phrase in a safe place
            </Text>
            <Text style={styles.suggestTxt}>
              {'\u25CF'}
              {'   '} Do not save or send Recovery Phrase on the internet
            </Text>
            <View style={styles.readAgreeView}>
              <TouchableOpacity
                onPress={() => toggleAccept1(a => !a)}
                style={styles.checkIcon}>
                <Ionicons
                  name={accept1 ? 'checkbox-outline' : 'square-outline'}
                  size={18}
                  color={accept1 ? '##0054A6' : '#E0E0E0'}
                />
              </TouchableOpacity>
              <Text style={styles.readAgreeTxt}>
                If I lost my secrest recovery phrase, my assets will be gone.
              </Text>
            </View>
            <View style={styles.readAgreeView}>
              <TouchableOpacity
                onPress={() => toggleAccept2(a => !a)}
                style={styles.checkIcon}>
                <Ionicons
                  name={accept2 ? 'checkbox-outline' : 'square-outline'}
                  size={18}
                  color={accept2 ? '##0054A6' : '#E0E0E0'}
                />
              </TouchableOpacity>
              <Text style={styles.readAgreeTxt}>
                If I share my secret recovery Phrase, my assets will be stolen.
              </Text>
            </View>
            <View style={styles.readAgreeView}>
              <TouchableOpacity
                onPress={() => toggleAccept3(a => !a)}
                style={styles.checkIcon}>
                <Ionicons
                  name={accept3 ? 'checkbox-outline' : 'square-outline'}
                  size={18}
                  color={accept3 ? '##0054A6' : '#E0E0E0'}
                />
              </TouchableOpacity>
              <Text style={styles.readAgreeTxt}>
                It is my responsibility to keep my secret recovery phrase safe.
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.startedTouch,
              !(accept1 && accept2 && accept3) && styles.touchOpacity,
            ]}
            disabled={!(accept1 && accept2 && accept3)}
            onPress={getMnemonic}>
            <LinearGradient
              colors={['#6B121C', '#ED1C24']}
              style={styles.startedBtn}>
              <Text style={styles.startedBtnTxt}>Generate Mnemonic</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={[appStyles.boxShadow, styles.advancedTouch]}>
            <Text style={styles.advancedTxt}>Advanced Settings</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  bottomView: {
    marginTop: windowHeight / 5,
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
    marginLeft: 25,
    marginBottom: 5,
  },
  subTitleTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#7C8FAC',
    marginLeft: 25,
    marginBottom: 25,
  },
  inputTitleTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    marginBottom: 1,
    marginTop: 20,
    marginLeft: 5,
  },
  inputView: {
    marginLeft: 20,
    marginRight: 20,
  },
  startedTouch: {
    width: '100%',
    marginTop: 30,
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
    marginTop: 15,
    marginRight: 20,
  },
  recoverTitleTxt: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 600,
    marginTop: 20,
    marginRight: 20,
  },
  recoversubTitleTxt: {
    color: '#7C8FAC',
    fontSize: 12,
    fontWeight: 400,
    marginTop: 3,
    marginBottom: 3,
    marginRight: 20,
  },
  importantView: {
    backgroundColor: '#FDEDED',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    marginTop: 20,
  },
  impTitleTxt: {
    color: '#D32F2F',
    fontSize: 14,
    fontWeight: 600,
    marginLeft: 5,
    marginRight: 20,
  },
  impSubTitleTxt: {
    color: '#D32F2F',
    fontSize: 12,
    fontWeight: 400,
    marginLeft: 5,
    marginTop: 3,
    marginRight: 20,
  },
  suggestTitleTxt: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 600,
    marginTop: 15,
    marginBottom: 3,
    marginRight: 20,
  },
  suggestTxt: {
    color: '#7C8FAC',
    fontSize: 12,
    fontWeight: 400,
    marginTop: 3,
    marginRight: 20,
  },
  readAgreeTxt: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 400,
    marginLeft: 10,
  },
  agreeTxt: {
    color: '#ED1C24',
    fontSize: 14,
    fontWeight: 400,
  },
  touchOpacity: {
    opacity: 0.5,
  },
  advancedTouch: {
    backgroundColor: colors.white,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 8,
    marginTop: 15,
  },
  advancedTxt: {
    color: '#333333',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 15,
  },
  checkIcon: {
    marginTop: 4,
  },
});

export default BackupRecoveryComponent;
