import React, {useState} from 'react';
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
import PlainTxtEye from '../../../../assets/plain_txt_eye.svg';
import CustomTabs, {RecoveryTabs} from '../../../../components/CustomTabs';
import DashBoardHeaderComponent from '../../../../components/DashBoardHeaderComponent';
import appStyles from '../../../../utils/appStyles';
import {colors} from '../../../../utils/colors';
import {Ionicons} from '../../../../utils/IconUtils';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';

type Props = NativeStackScreenProps<any, 'EXPORT_PRIVATEKEY'>;

const ExportPrivateKeyComponent = ({}: Props) => {
  const [activeTab, setActiveTab] = useState(RecoveryTabs.HandwrittenBackup);
  const [showKeyCode, setShowKeyCode] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const completedBackup = async () => {};

  const qRCodeView = () => {
    if (showQRCode) {
      return (
        <View style={styles.QRView}>
          <QRCode value={'https://www.google.co.in/'} size={170} />
        </View>
      );
    }
    return (
      <TouchableOpacity
        style={styles.plainView}
        onPress={() => {
          setShowQRCode(true);
        }}>
        <View style={[styles.QRView, styles.QROpacityView]}>
          <QRCode value={'https://www.google.co.in/'} size={170} />
        </View>

        <View style={[appStyles.boxShadow, styles.qrEyeView]}>
          <PlainTxtEye style={styles.plainEye} />
          <Text style={styles.tabTxt}>
            Please make sure there is no one or camera around
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const privateKeyView = () => {
    if (showKeyCode) {
      return (
        <View style={[appStyles.boxShadow, styles.keyView]}>
          <Text style={styles.keyTxt}>
            0xdijdadsjd9d0u09saudasydy7ayd78asy78tas68723989ydashdiuasy789y98
          </Text>
        </View>
      );
    }
    return (
      <TouchableOpacity
        style={styles.plainView}
        onPress={() => {
          setShowKeyCode(true);
        }}>
        <View style={[appStyles.boxShadow, styles.keyEyeView]}>
          <PlainTxtEye style={styles.plainEye} />
          <Text style={styles.tabTxt}>Tap to display private key</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const tabsView = () => {
    if (activeTab === RecoveryTabs.HandwrittenBackup) {
      return (
        <View style={styles.containerView}>
          <View style={styles.importantView}>
            <Ionicons
              name={'warning'}
              size={24}
              color={'#D32F2F'}
              style={styles.icon}
            />
            <Text style={styles.impTitleTxt}>
              The private key is not encrypted, please export it carefully and
              make a safe backup! When backing up the private key, please make
              sure that no one is around!
            </Text>
          </View>
          <Text style={styles.titleTxt}>
            Please write down the mnemonic in correct order on a piece of paper.
          </Text>
          {qRCodeView()}
          <View style={styles.privateKeyView}>
            <View style={styles.borderView} />
            <Text style={styles.privateKeyTitleTxt}>Private Key</Text>
            <View style={styles.borderView} />
          </View>
          {privateKeyView()}
        </View>
      );
    }
    return <></>;
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
        <DashBoardHeaderComponent title={'Backup Private Key'} />
        <View style={styles.tabsView}>
          <CustomTabs
            activeTab={activeTab}
            onSelectItem={(val: any) => setActiveTab(val)}
            titles={[
              RecoveryTabs.HandwrittenBackup,
              RecoveryTabs.KeypalCardBackup,
            ]}
          />
        </View>
        <ScrollView>
          <View style={styles.container}>{tabsView()}</View>
        </ScrollView>
        <TouchableOpacity style={styles.startedTouch} onPress={completedBackup}>
          <LinearGradient
            colors={['#6B121C', '#ED1C24']}
            style={styles.startedBtn}>
            <Text style={styles.startedBtnTxt}>Copy Private Key</Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  containerView: {
    marginLeft: 16,
    marginRight: 16,
    flex: 1,
  },
  tabsView: {
    marginLeft: 10,
    marginRight: 10,
  },
  titleTxt: {
    color: '#7C8FAC',
    fontSize: 12,
    fontWeight: 400,
    marginTop: 20,
  },
  tabTxt: {
    color: '#333333',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 400,
    paddingTop: 15,
    paddingBottom: 15,
  },
  startedTouch: {
    width: '50%',
    alignSelf: 'center',
    marginBottom: 40,
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
  plainEye: {
    alignSelf: 'center',
  },
  plainView: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrEyeView: {
    paddingTop: 10,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    position: 'absolute',
    opacity: 0.8,
  },
  QRView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 200,
    padding: 30,
    backgroundColor: colors.white,
    marginTop: 20,
    alignSelf: 'center',
  },
  QROpacityView: {
    opacity: 0.5,
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
    flex: 1,
    height: 0.2,
  },
  privateKeyView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  privateKeyTitleTxt: {
    color: '#7C8FAC',
    fontSize: 16,
    fontWeight: 400,
    marginLeft: 8,
    marginRight: 8,
  },
  keyView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    backgroundColor: colors.white,
    marginTop: 30,
    alignSelf: 'center',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },
  keyTxt: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 400,
  },
  keyEyeView: {
    paddingTop: 10,
    left: 0,
    right: 0,
    top: 5,
    backgroundColor: colors.white,
    position: 'absolute',
    opacity: 0.8,
  },
  importantView: {
    backgroundColor: '#FDEDED',
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  impTitleTxt: {
    color: '#D32F2F',
    fontSize: 12,
    fontWeight: 400,
    flex: 1,
    marginRight: 8,
    marginLeft: 8,
  },
  icon: {
    marginLeft: 8,
  },
});

export default ExportPrivateKeyComponent;
