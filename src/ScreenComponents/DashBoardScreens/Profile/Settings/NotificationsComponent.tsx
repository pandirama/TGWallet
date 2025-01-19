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
import appStyles from '../../../../utils/appStyles';
import {colors} from '../../../../utils/colors';
import {Switch} from 'react-native-paper';
import {Ionicons} from '../../../../utils/IconUtils';

type Props = NativeStackScreenProps<any, 'NOTIFICATION'>;

const NotificationsComponent = ({navigation}: Props) => {
  const [isAllowNotificationOn, setIsAllowNotificationOn] = useState(false);
  const [isTransferOn, setIsTransferOn] = useState(false);
  const [isWatchWalletOn, setIsWatchWalletsOn] = useState(false);
  const [isUpdatesOn, setIsUpdatesOn] = useState(false);
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

          <Text style={styles.headerTxt}>Notifications</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollHeaderView}>
          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <View style={styles.walletTouch}>
              <View style={styles.titleView}>
                <Text style={[styles.titleTxt, styles.subTitleFlex]}>
                  Allow Notifications
                </Text>
                <Text style={[styles.subTtitleTxt, styles.subTitleFlex]}>
                  Allow notifications to stay update with us.
                </Text>
              </View>
              <Switch
                color="#00C9A7"
                value={isAllowNotificationOn}
                onValueChange={val => setIsAllowNotificationOn(val)}
              />
            </View>
          </View>

          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <View style={styles.walletTouch}>
              <View style={styles.titleView}>
                <Text style={[styles.titleTxt, styles.subTitleFlex]}>
                  Transferring & Receiving
                </Text>
                <Text style={[styles.subTtitleTxt, styles.subTitleFlex]}>
                  Set your wallet data of interest to receive relevant
                  notifications once enabled.
                </Text>
              </View>
              <Switch
                color="#00C9A7"
                value={isTransferOn}
                onValueChange={val => setIsTransferOn(val)}
              />
            </View>
          </View>

          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <View style={styles.walletTouch}>
              <View style={styles.titleView}>
                <Text style={[styles.titleTxt, styles.subTitleFlex]}>
                  Watch Wallet (Read Only)
                </Text>
                <Text style={[styles.subTtitleTxt, styles.subTitleFlex]}>
                  Receive updates on the watch wallet.
                </Text>
              </View>
              <Switch
                color="#00C9A7"
                value={isWatchWalletOn}
                onValueChange={val => setIsWatchWalletsOn(val)}
              />
            </View>
          </View>

          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <View style={styles.walletTouch}>
              <View style={styles.titleView}>
                <Text style={[styles.titleTxt, styles.subTitleFlex]}>
                  Latest Updates
                </Text>
                <Text style={[styles.subTtitleTxt, styles.subTitleFlex]}>
                  Enable the latest updates to get first-hand information from
                  TG Wallet.
                </Text>
              </View>
              <Switch
                color="#00C9A7"
                value={isUpdatesOn}
                onValueChange={val => setIsUpdatesOn(val)}
              />
            </View>
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
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTxt: {
    fontSize: 18,
    fontWeight: 600,
    color: '#333333',
    textAlign: 'center',
    flex: 1,
    marginRight: 45,
  },
  headerLeftIcon: {
    marginLeft: 10,
    alignSelf: 'center',
    padding: 5,
  },
  scrollHeaderView: {
    paddingBottom: 50,
  },
  walletSubContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  walletTouch: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    textAlignVertical: 'center',
    marginLeft: 15,
    flex: 1,
  },
  titleView: {
    flex: 1,
  },
  subTtitleTxt: {
    fontSize: 12,
    fontWeight: 400,
    color: '#7C8FAC',
    textAlignVertical: 'center',
    marginLeft: 15,
    marginTop: 5,
    marginRight: 50,
    flex: 1,
  },
  subTitleFlex: {
    flex: 0,
  },
});

export default NotificationsComponent;
