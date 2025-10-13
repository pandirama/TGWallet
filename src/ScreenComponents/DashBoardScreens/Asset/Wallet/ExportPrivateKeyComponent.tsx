import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
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
import CustomTabs, {getRecoveryTabs} from '../../../../components/CustomTabs';
import DashBoardHeaderComponent from '../../../../components/DashBoardHeaderComponent';
import appStyles from '../../../../utils/appStyles';
import {colors} from '../../../../utils/colors';
import {Ionicons} from '../../../../utils/IconUtils';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import useCommon from '../../../../hooks/useCommon';
import Clipboard from '@react-native-clipboard/clipboard';
import {moderateScale} from 'react-native-size-matters';

type Props = NativeStackScreenProps<any, 'EXPORT_PRIVATEKEY'>;

const ExportPrivateKeyComponent = ({route}: Props) => {
  const {t} = useTranslation();
  const RecoveryTabs = getRecoveryTabs(t);
  const {walletInfo} = route?.params ?? {};
  const {showToast} = useCommon();

  const [activeTab, setActiveTab] = useState(RecoveryTabs.HandwrittenBackup);
  const [showKeyCode, setShowKeyCode] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const completedBackup = async () => {
    showToast({
      type: 'success',
      text1: t('COPY_PRIVATE_KEY'),
    });
    Clipboard.setString(walletInfo?.private_key);
  };

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
            {t('PLEASE_MAKE_SURE_NO_ONE_AROUND')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const privateKeyView = () => {
    if (showKeyCode) {
      return (
        <View style={[appStyles.boxShadow, styles.keyView]}>
          <Text style={styles.keyTxt}>{walletInfo?.private_key}</Text>
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
          <Text style={styles.tabTxt}>{t('TAP_TO_DISPLAY_PRIVATE_KEY')}</Text>
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
            <Text style={styles.impTitleTxt}>{t('PRIVATE_KEY_WARNING')}</Text>
          </View>
          <Text style={styles.titleTxt}>{t('PLEASE_WRITE_MNEMONIC')}</Text>
          {qRCodeView()}
          <View style={styles.privateKeyView}>
            <View style={styles.borderView} />
            <Text style={styles.privateKeyTitleTxt}>{t('PRIVATE_KEY')}</Text>
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
      <SafeAreaView
        style={appStyles.container}
        edges={['right', 'left', 'top']}>
        <DashBoardHeaderComponent title={t('EXPORT_PRIVATE_KEY_TITLE')} />
        <View style={styles.tabsView}>
          <CustomTabs
            activeTab={activeTab}
            onSelectItem={(val: any) => setActiveTab(val)}
            titles={[RecoveryTabs.HandwrittenBackup]}
          />
        </View>
        <ScrollView>
          <View style={styles.container}>{tabsView()}</View>
        </ScrollView>
        <TouchableOpacity style={styles.startedTouch} onPress={completedBackup}>
          <LinearGradient
            colors={['#6B121C', '#ED1C24']}
            style={styles.startedBtn}>
            <Text style={styles.startedBtnTxt}>{t('COPY_PRIVATE_KEY')}</Text>
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
    fontSize: moderateScale(12),
    fontWeight: 400,
    marginTop: 20,
  },
  tabTxt: {
    color: '#333333',
    fontSize: moderateScale(14),
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
    fontSize: moderateScale(16),
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
    fontSize: moderateScale(16),
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
    fontSize: moderateScale(14),
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
    fontSize: moderateScale(12),
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
