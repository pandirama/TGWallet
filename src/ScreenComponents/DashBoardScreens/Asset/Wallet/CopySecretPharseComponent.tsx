import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PlainTxt from '../../../../assets/plain_txt.svg';
import PlainTxtEye from '../../../../assets/plain_txt_eye.svg';
import CustomTabs, {RecoveryTabs} from '../../../../components/CustomTabs';
import appStyles from '../../../../utils/appStyles';
import {Ionicons} from '../../../../utils/IconUtils';
import {colors} from '../../../../utils/colors';
import DashBoardHeaderComponent from '../../../../components/DashBoardHeaderComponent';
import Clipboard from '@react-native-clipboard/clipboard';
import useCommon from '../../../../hooks/useCommon';
import QRCode from 'react-native-qrcode-svg';

type Props = NativeStackScreenProps<any, 'COPY_SECRET_PHARSE'>;

const CopySecretPharseComponent = ({route}: Props) => {
  const {walletInfo} = route?.params ?? {};
  const {showToast} = useCommon();

  const secretPharse = JSON.parse(walletInfo?.secret_pharse);

  const [activeTab, setActiveTab] = useState(RecoveryTabs.HandwrittenBackup);
  const [showCode, setShowCode] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const getIndexTxt = (index: number) => {
    if (index > 8) {
      return `${index + 1}`;
    }
    return `0${index + 1}`;
  };

  const renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity style={[appStyles.boxShadow, styles.itemTouch]}>
        <Text style={styles.itemIndexTxt}>{getIndexTxt(index)}</Text>
        <Text style={styles.itemTxt}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const qRCodeView = () => {
    if (showQR) {
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
          setShowQR(true);
        }}>
        <View style={[styles.QRView, styles.QROpacityView]}>
          <QRCode value={'https://www.google.co.in/'} size={170} />
        </View>
        <View style={[appStyles.boxShadow, styles.qrEyeView]}>
          <PlainTxtEye style={styles.plainEye} />
          <Text style={styles.tabTxt}>Tap to display recovery phrase</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const plainTxtView = () => {
    if (showCode) {
      return (
        <FlatList
          data={secretPharse}
          renderItem={renderItem}
          numColumns={3}
          columnWrapperStyle={styles.flatListColumn}
          contentContainerStyle={styles.flatListCotent}
          removeClippedSubviews={false}
          keyExtractor={(item, index) => 'key' + index}
        />
      );
    }
    return (
      <TouchableOpacity
        style={styles.plainView}
        onPress={() => {
          setShowCode(true);
        }}>
        <PlainTxt style={styles.plain} />
        <View style={[appStyles.boxShadow, styles.plainEyeView]}>
          <PlainTxtEye style={styles.plainEye} />
          <Text style={styles.tabTxt}>Tap to display recovery phrase</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const tabsView = () => {
    if (activeTab === RecoveryTabs.HandwrittenBackup) {
      return (
        <View style={styles.containerView}>
          <Text style={styles.titleTxt}>
            Please write down the mnemonic in correct order on a piece of paper.
          </Text>
          <View style={styles.plainTxtView}>
            <TouchableOpacity
              onPress={() => {
                setShowQRCode(false);
                setShowCode(false);
              }}
              style={styles.plainTouch}>
              <Text style={styles.plainTxt}>Plain text (12 words)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setShowQRCode(true);
                setShowQR(false);
              }}
              style={styles.qrTouch}>
              <Ionicons
                name={'qr-code-outline'}
                size={16}
                color={'#7C8FAC'}
                style={styles.icon}
              />
              <Text style={styles.QRcodeTxt}>Show QR Code</Text>
            </TouchableOpacity>
          </View>
          {showQRCode ? qRCodeView() : plainTxtView()}
          <TouchableOpacity
            style={styles.copyView}
            onPress={() => {
              showToast({
                type: 'success',
                text1: 'Secret Phrase Copied Successfully',
              });
              Clipboard.setString(walletInfo?.secret_pharse);
            }}>
            <Ionicons name={'copy-outline'} size={12} color={'#7C8FAC'} />
            <Text style={styles.copyTxt}>Copy secret recovery phase</Text>
          </TouchableOpacity>
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
        <DashBoardHeaderComponent title={'Backup Secret Recovery Phrase'} />
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
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  containerView: {
    marginLeft: 16,
    marginRight: 16,
  },
  tabsView: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  titleTxt: {
    color: '#7C8FAC',
    fontSize: 12,
    fontWeight: 400,
  },
  plainTxtView: {
    flexDirection: 'row',
    marginTop: 15,
  },
  plainTxt: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 600,
    flex: 1,
  },
  icon: {
    marginRight: 5,
  },
  QRcodeTxt: {
    color: '##7C8FAC',
    fontSize: 12,
    fontWeight: 400,
  },
  tabTxt: {
    color: '#333333',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 400,
    paddingTop: 15,
    paddingBottom: 15,
  },
  copyTxt: {
    color: '#7C8FAC',
    fontSize: 14,
    fontWeight: 400,
    marginLeft: 5,
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
  plainEye: {
    alignSelf: 'center',
  },
  plain: {
    opacity: 0.7,
  },
  qrCode: {
    alignSelf: 'center',
  },
  plainView: {
    marginTop: 5,
  },
  plainEyeView: {
    paddingTop: 15,
    paddingBottom: 15,
    left: 50,
    right: 50,
    top: 20,
    backgroundColor: colors.white,
    position: 'absolute',
    opacity: 0.8,
  },
  qrEyeView: {
    paddingTop: 15,
    paddingBottom: 15,
    left: 50,
    right: 50,
    top: 50,
    backgroundColor: colors.white,
    position: 'absolute',
    opacity: 0.8,
  },
  copyView: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  importantView: {
    backgroundColor: '#FDEDED',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    marginTop: 20,
    borderRadius: 5,
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
    marginLeft: 10,
    marginTop: 3,
    marginRight: 20,
  },
  itemTouch: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: colors.white,
  },
  itemIndexTxt: {
    color: '#7C8FAC',
    fontSize: 12,
    fontWeight: 400,
    marginLeft: 5,
  },
  itemTxt: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 400,
    textAlign: 'center',
    flex: 1,
  },
  flatListCotent: {
    marginBottom: 15,
    marginTop: 10,
  },
  flatListColumn: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  qrTouch: {
    flexDirection: 'row',
  },
  plainTouch: {
    flex: 1,
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
});

export default CopySecretPharseComponent;
