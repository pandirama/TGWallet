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
import appStyles from '../../../utils/appStyles';
import {colors} from '../../../utils/colors';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import LinearGradient from 'react-native-linear-gradient';
import PlainTxt from '../../../assets/plain_txt.svg';
import QRCode from '../../../assets/QR_code.svg';
import PlainTxtEye from '../../../assets/plain_txt_eye.svg';
import CustomTabs, {RecoveryTabs} from '../../../components/CustomTabs';
import {Ionicons} from '../../../utils/IconUtils';

type Props = NativeStackScreenProps<any, 'COMPLETED_BACKUP'>;

const CompletedBackupComponent = ({route, navigation}: Props) => {
  const {walletInfo} = route?.params ?? {};

  const [activeTab, setActiveTab] = useState(RecoveryTabs.HandwrittenBackup);
  const [showCode, setShowCode] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const completedBackup = async () => {
    navigation.navigate('CHECK_CODE', {
      walletInfo: walletInfo,
    });
  };

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
      return <QRCode style={styles.qrCode} />;
    }
    return (
      <TouchableOpacity
        style={styles.plainView}
        onPress={() => {
          setShowQR(true);
        }}>
        <QRCode style={[styles.qrCode, styles.plain]} />
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
          data={walletInfo?.secret_phase}
          renderItem={renderItem}
          numColumns={3}
          columnWrapperStyle={styles.flatListColumn}
          contentContainerStyle={styles.flatListCotent}
          keyExtractor={(item: any) => item?._id}
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
          <View style={styles.copyView}>
            <Ionicons name={'copy-outline'} size={12} color={'#7C8FAC'} />
            <Text style={styles.copyTxt}>Copy secret recovery phase</Text>
          </View>
          <View style={styles.importantView}>
            <Text style={styles.impTitleTxt}>Remember:</Text>
            <Text style={styles.impSubTitleTxt}>
              {'\u25CF'} Don’t disclose recovery phase to anyone
            </Text>
            <Text style={styles.impSubTitleTxt}>
              {'\u25CF'} Once the recovery phase is lost, asset cannot be
              recovery
            </Text>
            <Text style={styles.impSubTitleTxt}>
              {'\u25CF'} Don’t disclose recovery phase to anyone
            </Text>
            <Text style={styles.impSubTitleTxt}>
              {'\u25CF'} Once the secret recovery phase is lost, asset cannot be
              recovery
            </Text>
          </View>
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
        <TouchableOpacity style={styles.startedTouch} onPress={completedBackup}>
          <LinearGradient
            colors={['#6B121C', '#ED1C24']}
            style={styles.startedBtn}>
            <Text style={styles.startedBtnTxt}>
              Completed Backup & Verify It
            </Text>
          </LinearGradient>
        </TouchableOpacity>
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
    marginTop: 10,
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
});

export default CompletedBackupComponent;
