/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../utils/colors';
import useCommon from '../../../hooks/useCommon';
import {useTransactionInfoMutation} from '../../../api/marketAPI';
import {getErrorMessage} from '../../../utils/common';
import {moderateScale} from 'react-native-size-matters';
import {useTranslation} from 'react-i18next';

const TransactionsComponent = ({marketDetails, transactions}: any) => {
  const {t} = useTranslation();
  const {showToast, toggleBackdrop} = useCommon();

  const titles = [t('ALL_TAB'), t('BUY_TAB'), t('SELL_TAB')];

  const [activeTab, setActiveTab] = useState(t('ALL_TAB'));
  const [txnsInfos, setTxnsInfos] = useState<any>(null);

  const [transactionInfo, {isLoading}] = useTransactionInfoMutation();

  const getTransactionDetails = async (action: string) => {
    try {
      const params = {
        action: action,
        basetoken: marketDetails?.tokenaddress,
        chainid: marketDetails?.blockchain_id,
        symbol: marketDetails?.tokensymbol,
      };
      const response: any = await transactionInfo(params).unwrap();
      if (response?.success) {
        setTxnsInfos(response?.transactions);
      }
    } catch (err: any) {
      showToast({
        type: 'error',
        text1: getErrorMessage(err),
      });
    }
  };

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (activeTab === t('ALL_TAB')) {
      getTransactionDetails('0');
    } else if (activeTab === t('BUY_TAB')) {
      getTransactionDetails('1');
    } else if (activeTab === t('SELL_TAB')) {
      getTransactionDetails('2');
    }
  }, [activeTab]);

  const renderItem = ({item}: any) => {
    const isPlus = item?.amount < 0;
    return (
      <View style={styles.listTouch}>
        <Text style={[styles.listItemTxt]} numberOfLines={1}>
          {item?.time}
        </Text>
        <Text
          style={[
            styles.listItemTxt,
            isPlus ? {color: '#D32F2F'} : {color: '#167E8D'},
            {marginRight: 5},
          ]}
          numberOfLines={1}>
          {item?.price}
        </Text>
        <Text
          style={[styles.listItemTxt, {color: '#333333', marginRight: 5}]}
          numberOfLines={1}>
          {item?.amount}
        </Text>
        <Text
          style={[styles.listItemTxt, {color: '#333333', marginRight: 5}]}
          numberOfLines={1}>
          {item?.value}
        </Text>
        <Text style={[styles.listItemTxt]} numberOfLines={1}>
          {item?.wallet}
        </Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={txnsInfos}
        renderItem={renderItem}
        removeClippedSubviews={false}
        scrollEnabled={false}
        keyExtractor={(item, index) => 'key' + index}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return <View style={styles.borderView} />;
        }}
        ListHeaderComponent={
          <View>
            <Text style={styles.titleTxt}>{t('TRADING_DATA')}</Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View
                style={{
                  backgroundColor: '#EFF2F5',
                  flex: 1,
                  marginRight: 5,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderRadius: 5,
                  paddingLeft: 10,
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontWeight: 500,
                    color: '#7C8FAC',
                  }}>
                  {t('VOL_24H')}
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontWeight: 500,
                    color: '#333333',
                  }}>
                  {transactions?.summary?.volume_24h}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#EFF2F5',
                  flex: 1,
                  marginRight: 5,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderRadius: 5,
                  paddingLeft: 10,
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontWeight: 500,
                    color: '#7C8FAC',
                  }}>
                  {t('TXN_ADDRESSES_24H')}
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontWeight: 500,
                    color: '#333333',
                  }}>
                  {transactions?.summary?.addresscount}
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#EFF2F5',
                marginRight: 5,
                paddingTop: 10,
                paddingBottom: 10,
                borderRadius: 5,
                paddingLeft: 10,
                marginTop: 15,
              }}>
              <Text
                style={{
                  fontSize: moderateScale(12),
                  fontWeight: 500,
                  color: '#7C8FAC',
                }}>
                {t('TXNS_24H')}
              </Text>
              <Text
                style={{
                  fontSize: moderateScale(12),
                  fontWeight: 500,
                  color: '#333333',
                }}>
                {transactions?.summary?.totaltrade}
              </Text>
              <View style={{flexDirection: 'row', marginTop: 8}}>
                <View
                  style={{
                    backgroundColor: '#167E8D',
                    height: 10,
                    flex: 1,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                  }}
                />
                <View
                  style={{
                    backgroundColor: '#F44336',
                    height: 10,
                    flex: 1,
                    marginRight: 10,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                  }}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontWeight: 500,
                    color: '#167E8D',
                    flex: 1,
                  }}>
                  {`${t('BUY_TAB')}: ${transactions?.summary?.buytotal ?? ''}`}
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontWeight: 500,
                    color: '#D32F2F',
                    flex: 1,
                    textAlign: 'right',
                    marginRight: 10,
                  }}>
                  {`${t('SELL_TAB')}: ${transactions?.summary?.selltotal ?? ''}`}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                marginTop: 10,
                marginRight: 10,
              }}>
              <Text style={styles.titleTxt}>{t('TRADING_DATA')}</Text>
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
                        {title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: '#E0E0E0',
                paddingBottom: 10,
                paddingTop: 5,
              }}>
              <Text style={[styles.listItemTitleTxt]}>{t('TIME')}</Text>
              <Text style={[styles.listItemTitleTxt]}>{t('PRICE_ETH')}</Text>
              <Text style={[styles.listItemTitleTxt]}>{t('AMOUNT_BNB')}</Text>
              <Text style={[styles.listItemTitleTxt]}>{t('VALUE_USD')}</Text>
              <Text style={[styles.listItemTitleTxt]}>{t('ADDRESS')}</Text>
            </View>
          </View>
        }
      />
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

export default TransactionsComponent;
