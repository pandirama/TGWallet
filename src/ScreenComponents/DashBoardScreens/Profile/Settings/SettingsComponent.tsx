import React, {useRef, useState} from 'react';
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
import Market from '../../../../assets/market_setting.svg';
import {ActionSheetRef} from 'react-native-actions-sheet';
import ActionsSheets from '../../../../components/ActionsSheets';
import LinearGradient from 'react-native-linear-gradient';
import {Switch} from 'react-native-paper';
import { Ionicons } from '../../../../utils/IconUtils';

type Props = NativeStackScreenProps<any, 'SETTINGS_LIST'>;

const SettingsComponent = ({navigation}: Props) => {
  const [isDevelopModeOn, setIsDevelopModeOn] = useState(false);
  const [isNostOn, setIsNostOn] = useState(false);
  const [isTransactionsOn, setIsTransactionsOn] = useState(false);
  const [isPermitOn, setIsPermitOn] = useState(false);
  const cacheActionSheetRef = useRef<ActionSheetRef>(null);
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

          <Text style={styles.headerTxt}>Settings</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollHeaderView}>
          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <TouchableOpacity
              style={[styles.walletTouch]}
              onPress={() => navigation.navigate('NOTIFICATION')}>
              <Text style={styles.titleTxt}>Notifications</Text>
              <Text style={styles.redirectTxt}>Enabled</Text>
              <Ionicons
                name={'chevron-forward'}
                size={25}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <View style={styles.borderView} />
            <TouchableOpacity
              style={styles.walletTouch}
              onPress={() => navigation.navigate('LANGUAGE')}>
              <Text style={styles.titleTxt}>Language</Text>
              <Text style={styles.redirectTxt}>English</Text>
              <Ionicons
                name={'chevron-forward'}
                size={25}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
            <View style={styles.borderView} />
            <TouchableOpacity style={styles.walletTouch}>
              <Text style={styles.titleTxt}>Node Setting</Text>
              <Ionicons
                name={'chevron-forward'}
                size={25}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <View style={styles.borderView} />
            <TouchableOpacity
              style={styles.walletTouch}
              onPress={() => navigation.navigate('CURRENCY_UNIT')}>
              <Text style={styles.titleTxt}>Currency Unit</Text>
              <Text style={styles.redirectTxt}>USD</Text>
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
              onPress={() => navigation.navigate('MARKET_SETTINGS')}>
              <View style={styles.titleView}>
                <Text style={[styles.titleTxt, styles.subTitleFlex]}>
                  Market Settings
                </Text>
                <Text style={[styles.subTtitleTxt, styles.subTitleFlex]}>
                  Asset market data on homepage is not available
                </Text>
              </View>
              <Market />
              <Ionicons
                name={'chevron-forward'}
                size={25}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
            <View style={styles.borderView} />
            <TouchableOpacity
              style={[styles.walletTouch]}
              onPress={() => navigation.navigate('CHANGE_BASIS')}>
              <Text style={styles.titleTxt}>Change Basis</Text>
              <Text style={styles.redirectTxt}>UTC+5</Text>
              <Ionicons
                name={'chevron-forward'}
                size={25}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
            <View style={styles.borderView} />
            <TouchableOpacity
              style={[styles.walletTouch]}
              onPress={() => navigation.navigate('NUMBER_DISPLAY')}>
              <Text style={styles.titleTxt}>Number Display</Text>
              <Ionicons
                name={'chevron-forward'}
                size={25}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <View style={styles.borderView} />
            <View style={styles.walletTouch}>
              <Text style={styles.titleTxt}>Enable Nost</Text>
              <Switch
                color="#00C9A7"
                value={isNostOn}
                onValueChange={val => setIsNostOn(val)}
              />
            </View>
            <View style={styles.borderView} />
            <View style={styles.walletTouch}>
              <Text style={styles.titleTxt}>Show Transactions</Text>
              <Switch
                color="#00C9A7"
                value={isTransactionsOn}
                onValueChange={val => setIsTransactionsOn(val)}
              />
            </View>
          </View>

          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <View style={styles.borderView} />
            <TouchableOpacity
              style={[
                styles.walletTouch,
                styles.walletColor,
                styles.walletPaddingTop,
              ]}>
              <Text style={styles.titleTxt}>NetWork Statue</Text>
              <Ionicons
                name={'chevron-forward'}
                size={25}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
            <View style={styles.borderView} />
            <View style={styles.walletTouch}>
              <Text style={styles.titleTxt}>Disable Permit</Text>
              <Switch
                color="#00C9A7"
                value={isPermitOn}
                onValueChange={val => setIsPermitOn(val)}
              />
            </View>
            <View style={styles.borderView} />
            <View style={[styles.walletTouch]}>
              <Text style={styles.titleTxt}>Development Mode</Text>
              <Switch
                color="#00C9A7"
                value={isDevelopModeOn}
                onValueChange={val => setIsDevelopModeOn(val)}
              />
            </View>
            <View style={styles.borderView} />
            <TouchableOpacity
              style={[styles.walletTouch]}
              onPress={() => cacheActionSheetRef?.current?.show()}>
              <Text style={styles.titleTxt}>Clear Cache</Text>
              <Text style={styles.redirectTxt}>93.15MB</Text>
              <Ionicons
                name={'chevron-forward'}
                size={25}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ActionsSheets
          actionSheetRef={cacheActionSheetRef}
          titleTxt={'Clear Cache'}>
          <View style={styles.deleteDialogContentAction}>
            <Text style={styles.actionsheetTxt}>
              Are you sure you want to clear the 93.34MB cache?
            </Text>
            <TouchableOpacity
              style={styles.startedTouch}
              onPress={() => {
                cacheActionSheetRef?.current?.hide();
              }}>
              <LinearGradient
                colors={['#6B121C', '#ED1C24']}
                style={styles.startedBtn}>
                <Text style={styles.startedBtnTxt}>Confirm to Clear</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ActionsSheets>
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
  titleView: {
    flex: 1,
  },
  titleTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    textAlignVertical: 'center',
    marginLeft: 15,
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
  redirectTxt: {
    fontSize: 12,
    fontWeight: 400,
    color: '#7C8FAC',
    alignItems: 'center',
    marginRight: 5,
    textAlign: 'center',
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
  deleteDialogContentAction: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  actionsheetTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    marginBottom: 20,
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
});

export default SettingsComponent;
