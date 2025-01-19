import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../../utils/appStyles';
import {colors} from '../../../../utils/colors';
import AppLogo from '../../../../assets/app_logo.svg';
import InviteFriends from '../../../../assets/invite_bg.svg';
import {Image} from 'react-native';
import { Ionicons } from '../../../../utils/IconUtils';

type Props = NativeStackScreenProps<any, 'INVITE_FRIENDS'>;

const {width, height} = Dimensions.get('window');

const InviteFriendsComponent = ({navigation}: Props) => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={'#6B121C'}
        animated
      />
      <SafeAreaView style={appStyles.container}>
        <InviteFriends width={width} height={height} style={styles.imageBg} />
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerLeftIcon}>
            <Ionicons name={'chevron-back'} size={25} color={colors.white} />
          </TouchableOpacity>

          <Text style={styles.headerTxt}>Invite Friend</Text>
        </View>
        <Text style={styles.titleTxt}>Invite your friend to use TGwallet</Text>
        <Text style={styles.subTitileTxt}>
          Make Blockchain Happen Everywhere
        </Text>
        <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
          <View style={styles.iconView}>
            <AppLogo width={40} height={40} />
            <Text style={styles.tgWalletTxt}>TGwallet</Text>
          </View>

          <TouchableOpacity>
            <Image source={require('../../../../assets/invite_qr.png')} />
            <Text style={styles.scanTxt}>Scan & Download</Text>
          </TouchableOpacity>
          <View style={styles.shareView}>
            <TouchableOpacity style={styles.shareTouch}>
              <Ionicons name={'copy-outline'} size={20} color={'#7C8FAC'} />
              <Text style={styles.shareTxt}>Copy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareTouch}>
              <Ionicons name={'share-outline'} size={20} color={'#7C8FAC'} />
              <Text style={styles.shareTxt}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  headerView: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTxt: {
    fontSize: 18,
    fontWeight: 600,
    color: colors.white,
    flex: 1,
    textAlign: 'center',
    marginRight: 45,
  },
  headerLeftIcon: {
    marginLeft: 10,
    alignSelf: 'center',
    padding: 5,
  },
  imageBg: {
    top: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  walletSubContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    marginTop: 60,
    marginRight: 25,
    marginLeft: 25,
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: 20,
    fontWeight: 400,
    color: colors.white,
    textAlign: 'center',
    marginTop: 10,
  },
  subTitileTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.white,
    textAlign: 'center',
    marginTop: 5,
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  tgWalletTxt: {
    fontSize: 12,
    fontWeight: 800,
    color: '#333333',
    textAlign: 'center',
    marginLeft: 5,
  },
  scanTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#7C8FAC',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  borderView: {
    borderWidth: 1,
    borderColor: colors.gray1,
  },
  shareView: {
    flexDirection: 'row',
    borderTopColor: colors.gray1,
    borderTopWidth: 1,
    width: '100%',
  },
  shareTouch: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  shareTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    marginLeft: 10,
  },
});

export default InviteFriendsComponent;
