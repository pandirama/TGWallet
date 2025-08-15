/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../utils/colors';
import { moderateScale } from 'react-native-size-matters';

const titles = ['Top10', 'Top20', 'Top50', 'Top100'];

const HolderComponent = ({holders}: any) => {
  const {t} = useTranslation();
  const [activeTab, setActiveTab] = useState('Top10');
  const [itemsToShow, setItemsToShow] = useState(10);

  useEffect(() => {
    if (activeTab === 'Top10') {
      setItemsToShow(10);
    } else if (activeTab === 'Top20') {
      setItemsToShow(20);
    } else if (activeTab === 'Top50') {
      setItemsToShow(50);
    }
  }, [activeTab]);

  const renderItem = ({item}: any) => {
    const isPlus = item?.amount < 0;
    return (
      <View style={styles.listTouch}>
        <Text style={[styles.listItemTxt]} numberOfLines={1}>
          {item?.rank}
        </Text>
        <Text
          style={[
            styles.listItemTxt,
            isPlus ? {color: '#D32F2F'} : {color: '#167E8D'},
            {marginRight: 5},
          ]}
          numberOfLines={1}>
          {item?.ratio}
        </Text>
        <Text
          style={[styles.listItemTxt, {color: '#333333', marginRight: 5}]}
          numberOfLines={1}>
          {item?.amount}
        </Text>
        <Text
          style={[styles.listItemTxt, {color: '#333333', marginRight: 5}]}
          numberOfLines={1}>
          {item?.amount}
        </Text>
        <Text style={[styles.listItemTxt]} numberOfLines={1}>
          {item?.address}
        </Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={
          activeTab === 'Top100'
            ? holders?.holders
            : holders?.holders?.slice(0, itemsToShow)
        }
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
            <Text
              style={{
                fontSize: moderateScale(12),
                fontWeight: 500,
                color: '#333333',
                marginBottom: 8,
              }}>
              {t('HOLDER_TOTAL', {count: holders?.holder_count})}
            </Text>
            {holders?.top_summary?.map((summary: any, index: number) => {
              let color: string = '';
              if (index === 0) {
                color = '#F44336';
              } else if (index === 1) {
                color = '#FFB300';
              } else if (index === 2) {
                color = '#FFD700';
              } else if (index === 3) {
                color = '#1D9BF0';
              }
              return (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: color,
                          width: 8,
                          height: 8,
                          borderRadius: 100,
                          marginRight: 5,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: moderateScale(12),
                          fontWeight: 400,
                          color: '#7C8FAC',

                          textAlign: 'left',
                        }}>
                        {summary?.title}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontSize: moderateScale(12),
                        fontWeight: 400,
                        color: '#7C8FAC',
                        textAlign: 'left',
                        marginRight: 3,
                      }}>
                      {summary?.amount}
                    </Text>
                    <Text
                      style={{
                        fontSize: moderateScale(12),
                        fontWeight: 400,
                        color: '#7C8FAC',
                        flex: 1,
                        textAlign: 'left',
                      }}>
                      {summary?.symbol}
                    </Text>
                    <Text
                      style={{
                        fontSize: moderateScale(12),
                        fontWeight: 400,
                        color: '#7C8FAC',
                        flex: 1,
                        textAlign: 'left',
                      }}>
                      {summary?.percent}
                    </Text>
                  </View>
                </View>
              );
            })}
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                marginTop: 10,
                marginRight: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.gray1,
                paddingBottom: 10,
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
              }}>
              <Text style={[styles.listItemTitleTxt]}>{t('RANK')}</Text>
              <Text style={[styles.listItemTitleTxt]}>{t('RATIO')}</Text>
              <Text style={[styles.listItemTitleTxt]}>{t('POSITION_BNB')}</Text>
              <Text style={[styles.listItemTitleTxt]}>{t('CHG_24H')}</Text>
              <Text style={[styles.listItemTitleTxt]}>{t('ADDRESS')}</Text>
            </View>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleTxt: {
    fontSize: moderateScale(12),
    fontWeight: 500,
    color: '#333333',
    marginTop: 10,
    flex: 0.3,
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
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
    marginRight: 15,
    paddingLeft: 0,
    width: '100%',
  },
  listTouch: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default HolderComponent;
