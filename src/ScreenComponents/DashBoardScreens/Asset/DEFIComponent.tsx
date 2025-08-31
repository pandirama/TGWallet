/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../utils/colors';
import {moderateScale, scale} from 'react-native-size-matters';

const DEFIComponent = ({tokenAssets, navigation, showAmount}: any) => {
  const {t} = useTranslation();

  const getBalanceInUSD = (balanceInUSD: string) => {
    if (showAmount) {
      return balanceInUSD;
    } else {
      return String(balanceInUSD).length > 0
        ? '*'.repeat(String(balanceInUSD).length)
        : '****';
    }
  };
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.defiListTouch}
        onPress={() =>
          navigation.navigate('TOKEN', {
            token: item,
          })
        }>
        <View style={styles.defiListIconView}>
          {item?.tokenImage !== '' ? (
            <Image
              style={styles.itemLogo}
              source={{
                uri: item?.tokenImage !== '' ? item?.tokenImage : null,
              }}
            />
          ) : (
            <View
              style={{
                backgroundColor: colors.gray1,
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 100,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: moderateScale(16),
                  fontWeight: 600,
                  color: '#333333',
                }}>
                {item?.tokenName?.[0]}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.defiListHeaderTxtView}>
          <Text style={[styles.defiListnameTxt]}>{item?.tokenName}</Text>
          <View style={styles.defiListTxtView}>
            <Text
              style={[
                styles.defiListNameTxt,
                !showAmount && {fontFamily: 'Menlo'},
              ]}>
              {showAmount
                ? item?.balance
                : String(item?.balance).length > 0
                ? '*'.repeat(String(item?.balance).length)
                : '****'}
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text style={styles.defiListamountTxt}>{t('VALUE_USD')}:</Text>
              <Text
                style={[
                  styles.defiListamountTxt,
                  !showAmount && {fontFamily: 'Menlo'},
                ]}>
                {` $${getBalanceInUSD(item?.balanceInUSD)}`}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={tokenAssets}
      renderItem={renderItem}
      removeClippedSubviews={false}
      keyExtractor={(item, index) => 'key' + index}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => {
        return <View style={styles.borderView} />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  defiListTouch: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 10,
  },
  defiListIconView: {
    backgroundColor: '#F5FAFF',
    padding: 5,
    borderRadius: 100,
  },
  defiListHeaderTxtView: {
    marginLeft: 5,
    flexDirection: 'row',
    flex: 1,
  },
  defiListTxtView: {
    padding: 2,
    marginRight: 15,
  },
  defiListnameTxt: {
    fontSize: moderateScale(14),
    fontWeight: 600,
    color: '#333333',
    alignSelf: 'center',
    flex: 1,
  },
  defiListNameTxt: {
    fontSize: moderateScale(14),
    fontWeight: 600,
    color: '#333333',
    textAlign: 'right',
  },
  defiListamountTxt: {
    fontSize: moderateScale(14),
    fontWeight: 400,
    color: '#7C8FAC',
    textAlign: 'right',
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
    marginRight: 15,
    paddingLeft: 0,
    width: '100%',
  },
  spendView: {
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 8,
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    marginLeft: 8,
  },
  spendColour: {
    backgroundColor: '#D4FCEC',
    borderColor: '#167E8D',
  },
  minusColor: {
    backgroundColor: '#FDEDED',
    borderColor: '#D32F2F',
  },
  itemLogo: {
    width: scale(30),
    height: scale(30),
  },
});

export default DEFIComponent;
