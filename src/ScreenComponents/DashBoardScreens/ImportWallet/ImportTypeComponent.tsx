import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../utils/appStyles';
import RecoveryPhrase from '../../../assets/recovery_phrase.svg';
import PrivateKey from '../../../assets/private_key.svg';
import WatchWallet from '../../../assets/watch_wallet.svg';
import {colors} from '../../../utils/colors';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import {Ionicons} from '../../../utils/IconUtils';
import {WalletTabs} from '../../../components/CustomTabs';
import { moderateScale, scale } from 'react-native-size-matters';

type Props = NativeStackScreenProps<any, 'IMPORT_TYPE'>;

const ImportTypeComponent = ({navigation, route}: Props) => {
  const {walletNetwork} = route?.params ?? {};

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.background}
        animated
      />
      <SafeAreaView style={appStyles.container}>
        <DashBoardHeaderComponent title={'Import Wallets'} />
        <ScrollView>
          <View style={styles.walletContainer}>
            <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
              <TouchableOpacity
                style={styles.walletTouch}
                onPress={() => {
                  navigation.navigate('IMPORT_WALLET', {
                    walletTabs: WalletTabs.RecoveryPhrase,
                    walletNetwork,
                  });
                }}>
                <RecoveryPhrase
                  width={scale(22)}
                  height={scale(22)}
                  style={styles.walletIcon}
                />
                <View style={styles.txtContainer}>
                  <Text style={styles.walletTitleTxt}>Recovery Phrase</Text>
                  <Text style={styles.walletSubTitleTxt}>
                    Restore wallet through Recovery Phrase
                  </Text>
                </View>
                <Ionicons
                  name={'chevron-forward'}
                  size={scale(15)}
                  color={colors.black}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <View style={styles.borderView} />
              <TouchableOpacity
                style={styles.walletTouch}
                onPress={() => {
                  navigation.navigate('IMPORT_WALLET', {
                    walletTabs: WalletTabs.PrivateKey,
                    walletNetwork,
                  });
                }}>
                <PrivateKey width={scale(22)} height={scale(22)} style={styles.walletIcon} />
                <View style={styles.txtContainer}>
                  <Text style={styles.walletTitleTxt}>Private Key</Text>
                  <Text style={styles.walletSubTitleTxt}>
                    Restore wallet through Private Key
                  </Text>
                </View>
                <Ionicons
                  name={'chevron-forward'}
                  size={scale(15)}
                  color={colors.black}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                appStyles.boxShadow,
                styles.walletSubContainer,
                styles.walletSubContainer1,
              ]}>
              <TouchableOpacity
                style={styles.walletTouch}
                onPress={() => {
                  navigation.navigate('WATCH_WALLET', {
                    walletNetwork,
                  });
                }}>
                <WatchWallet width={scale(22)} height={scale(22)} style={styles.walletIcon} />
                <View style={styles.txtContainer}>
                  <Text style={styles.walletTitleTxt}>Watch Wallet</Text>
                  <Text style={styles.walletSubTitleTxt}>
                    Import Address only, works with Cold Wallet
                  </Text>
                </View>
                <Ionicons
                  name={'chevron-forward'}
                  size={scale(15)}
                  color={colors.black}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  walletContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  walletSubContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: 10,
  },
  walletSubContainer1: {
    marginTop: 30,
  },
  txtContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1,
  },
  walletTitleTxt: {
    fontSize: moderateScale(14),
    fontWeight: 400,
    color: '#333333',
  },
  walletSubTitleTxt: {
    fontSize: moderateScale(12),
    fontWeight: 400,
    color: '#7C8FAC',
  },
  icon: {
    marginRight: 15,
    alignSelf: 'center',
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
  },
  walletTouch: {
    flexDirection: 'row',
    paddingTop: moderateScale(12),
    paddingBottom: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletIcon: {
    marginLeft: 15,
  },
});

export default ImportTypeComponent;
