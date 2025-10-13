/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../utils/colors';
import { moderateScale } from 'react-native-size-matters';


const MyTradesComponent = ({}: any) => {
  const {t} = useTranslation();
  const titles = [t('ALL_TAB'), t('BUY_TAB'), t('SELL_TAB')];
  const [activeTab, setActiveTab] = useState(t('ALL_TAB'));

  return (
    <View>
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          marginTop: 5,
          marginRight: 10,
        }}>
        <Text style={styles.titleTxt}>{t('TRANSACTIONS')}</Text>
        <View style={styles.tabContainer}>
          {titles?.map((title: string) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setActiveTab(title)}
                style={[
                  styles.pillContainer,
                  activeTab === title && styles.activePill,
                ]}>
                <Text
                  style={[
                    styles.title,
                    activeTab === title && styles.activeTitle,
                  ]}>
                  {t(title.toUpperCase())}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listTouch: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingTop: 10,
    paddingBottom: 10,
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
    marginRight: 15,
    paddingLeft: 0,
    width: '100%',
  },
  listItemTitleTxt: {
    fontSize: moderateScale(12),
    fontWeight: 400,
    color: '#7C8FAC',
    flex: 1,
    textAlign: 'left',
  },
  listItemTxt: {
    fontSize: moderateScale(12),
    fontWeight: 400,
    color: '#7C8FAC',
    flex: 1,
    textAlign: 'left',
  },
  titleTxt: {
    fontSize: moderateScale(12),
    fontWeight: 500,
    color: '#333333',
    marginTop: 10,
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    paddingVertical: 1,
    backgroundColor: '#EFF2F5',
    borderRadius: 42,
    flex: 1,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.29)',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  pillContainer: {
    alignItems: 'center',
    borderRadius: 42,
    paddingVertical: 6,
    paddingHorizontal: 8,
    flex: 1,
  },
  title: {
    fontSize: moderateScale(13),
    fontWeight: 500,
    color: '#7C8FAC',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  activeTitle: {
    color: '#333333',
  },
  activePill: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

export default MyTradesComponent;
