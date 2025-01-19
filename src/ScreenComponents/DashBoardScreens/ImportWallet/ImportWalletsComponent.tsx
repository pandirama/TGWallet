import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../utils/appStyles';
import Scan from '../../../assets/scan.svg';
import {colors} from '../../../utils/colors';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import CustomTabs, {WalletTabs} from '../../../components/CustomTabs';
import LinearGradient from 'react-native-linear-gradient';
import { Ionicons } from '../../../utils/IconUtils';

type Props = NativeStackScreenProps<any, 'IMPORT_WALLET'>;

const ImportWalletsComponent = ({}: Props) => {
  const [activeTab, setActiveTab] = useState(WalletTabs.RecoveryPhrase);
  const [walletName, setWalletName] = useState('');
  const [recoveryPhrase, setRecoveryPhrase] = useState('');
  const [accept, toggleAccept] = useState(false);

  const recoveryPhraseTab = activeTab === WalletTabs.RecoveryPhrase;

  const placeHolderTxt = recoveryPhraseTab
    ? 'Please enter the Recovery Phrase in order and separate them with spaces'
    : 'Please enter private key or scan its QR code';
  const titleTxt = recoveryPhraseTab
    ? 'Please use cold wallet in disconnected environment. The cold wallet must be used in conjunction with watch wallet. You can create you new wallet offline here, please back it up well.'
    : 'Please use cold wallet in disconnected environment. The cold wallet must be used in conjunction with watch wallet. You can create you new wallet offline here, please back it up well.';

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
              <Text style={styles.pasteTxt}>KeyPal Card</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.pasteTxt}>Paste</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.inputTitleTxt}>Wallet Name</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="BTC-2"
            placeholderTextColor="#9C9DA0"
            value={walletName}
            onChangeText={text => setWalletName(text)}
          />
        </View>
        {recoveryPhraseTab && (
          <TouchableOpacity style={[styles.pasteCard, styles.advanceCard]}>
            <Text style={styles.modeTxt}>Advanced Mode</Text>
            <Ionicons name={'chevron-down'} size={18} color={'#333333'} />
          </TouchableOpacity>
        )}
      </View>
    );
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
        <DashBoardHeaderComponent
          title={'Import Wallets'}
          rightIcon={<Scan width={24} height={24} style={styles.scanIcon} />}
        />
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
                size={18}
                color={'#0054A6'}
              />
            </TouchableOpacity>
            <Text style={styles.readAgreeTxt}>I have read and agree </Text>
            <Text style={styles.agreeTxt}>Terms of Service</Text>
          </View>
          <TouchableOpacity
            style={[styles.startedTouch, !accept && styles.touchOpacity]}
            disabled={!accept}>
            <LinearGradient
              colors={['#6B121C', '#ED1C24']}
              style={styles.startedBtn}>
              <Text style={styles.startedBtnTxt}>Confirm</Text>
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
    fontSize: 12,
    fontWeight: 400,
    color: '#333333',
    marginTop: 10,
    marginLeft: 5,
  },
  inputTitleTxt: {
    fontSize: 14,
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
    height: 130,
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    color: colors.black,
  },
  multiLineInput: {
    height: 90,
    marginBottom: 10,
    color: colors.black,
    textAlignVertical: 'top',
  },
  pasteCard: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  advanceCard: {
    marginRight: 5,
  },
  pasteTxt: {
    color: '#0054A6',
    fontSize: 12,
    fontWeight: 400,
    marginRight: 10,
  },
  modeTxt: {
    color: '#7C8FAC',
    fontSize: 12,
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
  },
  readAgreeTxt: {
    color: '#7C8FAC',
    fontSize: 14,
    fontWeight: 400,
    marginLeft: 3,
  },
  agreeTxt: {
    color: '#0054A6',
    fontSize: 14,
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
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 15,
  },
  bottomView: {
    marginBottom: 40,
  },
});

export default ImportWalletsComponent;
