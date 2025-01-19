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
import Market from '../../../../assets/market_setting.svg';
import {Switch} from 'react-native-paper';
import {Ionicons} from '../../../../utils/IconUtils';

type Props = NativeStackScreenProps<any, 'MARKET_SETTINGS'>;

const MarketSettingsComponent = ({navigation}: Props) => {
  const [isNostOn, setIsNostOn] = useState(false);
  const [isGreenMarketOn, setIsGreenMarketOn] = useState(false);
  const [isRedMarketOn, setIsRedMarketOn] = useState(false);

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

          <Text style={styles.headerTxt}>Market Settings</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollHeaderView}>
          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <TouchableOpacity
              style={styles.walletTouch}
              onPress={() => {
                setIsRedMarketOn(false);
                setIsGreenMarketOn(true);
              }}>
              <Text style={styles.titleTxt}>Green Up, Red Down</Text>
              <View style={styles.subTitleFlex}>
                <Market style={styles.marketIcon} />
              </View>
              {isGreenMarketOn && (
                <Ionicons
                  name={'checkmark'}
                  size={20}
                  color={'#0054A6'}
                  style={styles.icon}
                />
              )}
            </TouchableOpacity>
            <View style={styles.borderView} />
            <TouchableOpacity
              style={styles.walletTouch}
              onPress={() => {
                setIsRedMarketOn(true);
                setIsGreenMarketOn(false);
              }}>
              <Text style={styles.titleTxt}>Red Up, Green Down</Text>
              <View style={styles.subTitleFlex}>
                <Market style={styles.marketIcon} />
              </View>
              {isRedMarketOn && (
                <Ionicons
                  name={'checkmark'}
                  size={20}
                  color={'#0054A6'}
                  style={styles.icon}
                />
              )}
            </TouchableOpacity>
          </View>

          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <View style={styles.walletTouch}>
              <Text style={[styles.titleTxt, styles.subTitleFlex]}>
                Price & Change on Asset Page
              </Text>
              <Switch
                color="#00C9A7"
                value={isNostOn}
                onValueChange={val => setIsNostOn(val)}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default MarketSettingsComponent;

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
  },
  subTitleFlex: {
    flex: 1,
  },
  marketIcon: {
    marginLeft: 10,
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
  },
  icon: {
    marginRight: 15,
    alignSelf: 'center',
  },
});
