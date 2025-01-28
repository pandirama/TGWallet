import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
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
import Website from '../../../../assets/profile/website.svg';
import Twitter from '../../../../assets/profile/twitter.svg';
import Telegram from '../../../../assets/profile/telegram.svg';
import Discord from '../../../../assets/profile/discord.svg';
import GitHub from '../../../../assets/profile/git_hub.svg';
import Email from '../../../../assets/profile/email.svg';
import FeedBack from '../../../../assets/profile/feed_back.svg';
import {AntDesign, Ionicons} from '../../../../utils/IconUtils';

type Props = NativeStackScreenProps<any, 'ABOUT_US'>;

const AboutUsComponent = ({navigation}: Props) => {
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
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerLeftIcon}>
            <Ionicons name={'chevron-back'} size={25} color={'#333333'} />
          </TouchableOpacity>

          <Text style={styles.headerTxt}>About Us</Text>
        </View>
        <View>
          <AppLogo style={styles.logoIcon} />
          <Text style={styles.logoTxt}>TGwallet</Text>
          <Text style={styles.versionTxt}>v1.2.3</Text>
        </View>

        <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
          <TouchableOpacity style={styles.walletTouch}>
            <Text style={styles.walletTitleTxt}>Terms of Service</Text>
            <Ionicons
              name={'chevron-forward'}
              size={25}
              color={'#333333'}
              style={styles.icon}
            />
          </TouchableOpacity>
          <View style={styles.borderView} />
          <TouchableOpacity style={styles.walletTouch}>
            <Text style={styles.walletTitleTxt}>Privacy Policy</Text>
            <Ionicons
              name={'chevron-forward'}
              size={25}
              color={'#333333'}
              style={styles.icon}
            />
          </TouchableOpacity>
          <View style={styles.borderView} />
          <TouchableOpacity style={styles.walletTouch}>
            <Text style={styles.walletTitleTxt}>Rate Us</Text>
            <AntDesign
              name={'star'}
              size={25}
              color={'#FFB300'}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.channelsTxt}>Official Channels</Text>
        <View style={[appStyles.boxShadow, styles.channelContainer]}>
          <View style={styles.channelView}>
            <TouchableOpacity style={styles.channelTouch}>
              <Website />
              <Text style={styles.channelTxt}>Website</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.channelTouch}>
              <Twitter />
              <Text style={styles.channelTxt}>Twitter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.channelTouch}>
              <Telegram />
              <Text style={styles.channelTxt}>Telegram</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.channelTouch}>
              <Discord />
              <Text style={styles.channelTxt}>Discord</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.channelView}>
            <TouchableOpacity style={styles.channelTouch}>
              <AppLogo width={40} height={40} />
              <Text style={styles.channelTxt}>Forum</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.channelTouch}>
              <GitHub />
              <Text style={styles.channelTxt}>Github</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.channelTouch}>
              <Email />
              <Text style={styles.channelTxt}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.channelTouch}>
              <FeedBack />
              <Text style={styles.channelTxt}>Feedback</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    marginRight: 45,
  },
  headerLeftIcon: {
    marginLeft: 10,
    alignSelf: 'center',
    padding: 5,
  },
  walletSubContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: 30,
    marginRight: 16,
    marginLeft: 16,
  },
  logoTxt: {
    fontSize: 20,
    fontWeight: 600,
    color: '#333333',
    textAlign: 'center',
    marginTop: 5,
  },
  versionTxt: {
    fontSize: 12,
    fontWeight: 400,
    color: '#7C8FAC',
    textAlign: 'center',
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
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
  },
  icon: {
    marginRight: 15,
    alignSelf: 'center',
  },
  logoIcon: {
    alignSelf: 'center',
    marginTop: 40,
  },
  channelContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginLeft: 16,
    marginRight: 16,
  },
  channelsTxt: {
    fontSize: 14,
    fontWeight: 600,
    color: '#333333',
    marginTop: 25,
    marginBottom: 10,
    marginLeft: 20,
  },
  channelView: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
  },
  channelTouch: {
    flex: 1,
    alignItems: 'center',
  },
  channelTxt: {
    fontSize: 11,
    fontWeight: 500,
    color: '#333333',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default AboutUsComponent;
