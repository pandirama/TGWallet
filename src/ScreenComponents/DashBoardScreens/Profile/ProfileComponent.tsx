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
import {colors} from '../../../utils/colors';
import WalletNew from '../../../assets/wallet_new.svg';
import InviteFriends from '../../../assets/profile/invite_friends.svg';
import Transaction from '../../../assets/profile/transaction.svg';
import WalletGuide from '../../../assets/profile/wallet_guide.svg';
import {Fontisto, Ionicons, SimpleLineIcons} from '../../../utils/IconUtils';

type Props = NativeStackScreenProps<any, 'PROFILE'>;

const ProfileComponent = ({navigation}: Props) => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.white}
        animated
      />
      <SafeAreaView style={appStyles.container}>
        <View style={styles.headerView}>
          <Text style={styles.headerTxt}>Profile</Text>
          <Ionicons
            name={'sunny-outline'}
            size={25}
            color={'#333333'}
            style={styles.icon}
          />
          <Fontisto
            name={'bell'}
            size={24}
            color={'#333333'}
            style={styles.icon}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={appStyles.scrollContainer}>
          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <TouchableOpacity
              style={[
                styles.walletTouch,
                styles.walletColor,
                styles.walletPaddingTop,
              ]}>
              <WalletNew width={22} height={21} style={styles.walletIcon} />
              <Text style={styles.walletTitleTxt}>Asset Overview</Text>
              <Ionicons
                name={'chevron-forward'}
                size={25}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
            <View style={styles.borderView} />
            <TouchableOpacity style={styles.walletTouch}>
              <WalletNew width={22} height={21} style={styles.walletIcon} />
              <Text style={styles.walletTitleTxt}>Manage Wallets</Text>
              <Ionicons
                name={'chevron-forward'}
                size={25}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
            <View style={styles.borderView} />
            <TouchableOpacity
              style={[
                styles.walletTouch,
                styles.walletColor,
                styles.walletPaddgionBottom,
              ]}>
              <Transaction width={22} height={21} style={styles.walletIcon} />
              <Text style={styles.walletTitleTxt}>Transaction Records</Text>
              <Ionicons
                name={'chevron-forward'}
                size={25}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <TouchableOpacity
              style={[
                styles.walletTouch,
                styles.walletColor,
                styles.walletPaddingTop,
              ]}>
              <WalletNew width={22} height={21} style={styles.walletIcon} />
              <Text style={styles.walletTitleTxt}>Experience</Text>
              <Ionicons
                name={'chevron-forward'}
                size={25}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
            <View style={styles.borderView} />
            <TouchableOpacity
              style={styles.walletTouch}
              onPress={() => navigation.navigate('ADDRESS_BOOK')}>
              <SimpleLineIcons
                name={'notebook'}
                size={24}
                color={'#333333'}
                style={styles.leftIcon}
              />
              <Text style={styles.walletTitleTxt}>Address Book</Text>
              <Ionicons
                name={'chevron-forward'}
                size={25}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <TouchableOpacity
              style={styles.walletTouch}
              onPress={() => navigation.navigate('INVITE_FRIENDS')}>
              <InviteFriends width={24} height={25} style={styles.walletIcon} />
              <Text style={styles.walletTitleTxt}>Invite Friends</Text>
              <Ionicons
                name={'chevron-forward'}
                size={25}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
            <View style={styles.borderView} />
            <TouchableOpacity style={styles.walletTouch}>
              <WalletGuide width={24} height={25} style={styles.walletIcon} />
              <Text style={styles.walletTitleTxt}>Wallet Guides</Text>
              <Ionicons
                name={'chevron-forward'}
                size={25}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
            <View style={styles.borderView} />
            <TouchableOpacity
              style={styles.walletTouch}
              onPress={() => navigation.navigate('ABOUT_US')}>
              <Ionicons
                name={'information-circle-outline'}
                size={25}
                color={'#333333'}
                style={styles.leftIcon}
              />
              <Text style={styles.walletTitleTxt}>About Us</Text>
              <Ionicons
                name={'chevron-forward'}
                size={25}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
            <View style={styles.borderView} />
            <TouchableOpacity
              style={styles.walletTouch}
              onPress={() => navigation.navigate('SETTINGS')}>
              <Ionicons
                name={'settings-outline'}
                size={25}
                color={'#333333'}
                style={styles.leftIcon}
              />
              <Text style={styles.walletTitleTxt}>Settings</Text>
              <Ionicons
                name={'chevron-forward'}
                size={25}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: colors.white,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTxt: {
    fontSize: 18,
    fontWeight: 600,
    color: '#333333',
    flex: 1,
    textAlign: 'center',
    marginLeft: 70,
  },
  walletSubContainer: {
    backgroundColor: colors.white,
    borderRadius: 5,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 15,
  },
  walletIcon: {
    marginLeft: 15,
  },
  walletTitleTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    textAlignVertical: 'center',
    marginLeft: 8,
    flex: 1,
  },
  walletTouch: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
  },
  walletColor: {
    backgroundColor: '#F5B8BC',
  },
  walletPaddingTop: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  walletPaddgionBottom: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
  },
  icon: {
    marginRight: 15,
    alignSelf: 'center',
  },
  leftIcon: {
    marginLeft: 10,
    alignSelf: 'center',
  },
});

export default ProfileComponent;
