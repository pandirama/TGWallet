/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../utils/colors';
import {Ionicons} from '../../../utils/IconUtils';
import TransactionsComponent from './TransactionsComponent';
import MyTradesComponent from './MyTradesComponent';
import PoolsComponent from './PoolsComponent';
import HolderComponent from './HolderComponent';
import WebView from 'react-native-webview';
import Clipboard from '@react-native-clipboard/clipboard';
import { moderateScale } from 'react-native-size-matters';

const marketItems = [
  {
    id: 0,
    marketName: 'Txns',
  },
  {
    id: 1,
    marketName: 'My Trades',
  },
  {
    id: 2,
    marketName: 'Pools',
  },
  {
    id: 3,
    marketName: 'Holder',
  },
];

const TradingComponent = ({marketInfos, marketDetails}: any) => {
  const { t } = useTranslation();
  const [selectedMarket, setSelectedMarket] = useState('Txns');

  const renderItem = ({item}: any) => {
    const findAsset = selectedMarket === item?.marketName;
    return (
      <View>
        <TouchableOpacity
          style={styles.assetItemTouch}
          onPress={() => {
            setSelectedMarket(item?.marketName);
          }}>
          <Text
            style={
              findAsset ? styles.selectedAssetItemTxt : styles.assetItemTxt
            }>
            {item?.marketName}
          </Text>
        </TouchableOpacity>
        {findAsset && <View style={styles.verticalView} />}
      </View>
    );
  };

  return (
    <View style={{padding: 15, backgroundColor: colors.white, flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.amountTxt}>
            {marketInfos?.generalinfo?.price}
          </Text>
          <TouchableOpacity
            style={styles.addressView}
            onPress={() => {
              Clipboard.setString(marketInfos?.generalinfo?.contract_address);
            }}>
            <Text style={styles.addressTxt} numberOfLines={1}>
              {marketInfos?.generalinfo?.contract_address}
            </Text>
            <Ionicons name={'copy-outline'} size={14} color={'#7C8FAC'} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <View style={{flex: 1, marginRight: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.rowTitleTxt}>{t('LIQUIDITY')}</Text>
              <Text style={styles.rowValueTxt}>
                {marketInfos?.generalinfo?.liquidity}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.rowTitleTxt}>{t('VOL_24H')}</Text>
              <Text style={styles.rowValueTxt}>
                {marketInfos?.generalinfo?.['24h_volume']}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.rowTitleTxt}>{t('TXNS_24H')}</Text>
              <Text style={styles.rowValueTxt}>
                {marketInfos?.generalinfo?.['24h_trade']}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: 1,
              height: 40,
              backgroundColor: '#E0E0E0',
              alignSelf: 'center',
            }}
          />
          <View style={{flex: 1, marginLeft: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.rowTitleTxt}>{t('MKT_CAP')}</Text>
              <Text style={styles.rowValueTxt}>
                {marketInfos?.generalinfo?.['24h_traders']}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.rowTitleTxt}>{t('TOTAL_SUPPLY')}</Text>
              <Text style={styles.rowValueTxt}>
                {marketInfos?.generalinfo?.price}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.rowTitleTxt}>{t('HOLDERS')}</Text>
              <Text style={styles.rowValueTxt}>
                {marketInfos?.generalinfo?.holders}
              </Text>
            </View>
          </View>
        </View>
        <View style={{height: 200, marginTop: 10}}>
          <WebView
            source={{uri: marketInfos?.chartdata?.url}}
            originWhitelist={['*']}
            javaScriptEnabled={true}
            cacheEnabled={false}
            startInLoadingState={true}
          />
        </View>

        <View style={styles.listHeaderView}>
          <FlatList
            data={marketItems}
            renderItem={renderItem}
            removeClippedSubviews={false}
            scrollEnabled={false}
            keyExtractor={(item, index) => 'key' + index}
            horizontal={true}
            style={{borderBottomWidth: 1, borderBottomColor: colors.gray1}}
          />
        </View>
        {selectedMarket === 'Txns' && (
          <TransactionsComponent
            transactions={marketInfos?.transactions}
            marketDetails={marketDetails}
          />
        )}
        {selectedMarket === 'My Trades' && <MyTradesComponent />}
        {selectedMarket === 'Pools' && (
          <PoolsComponent pools={marketInfos?.pools} />
        )}
        {selectedMarket === 'Holder' && (
          <HolderComponent holders={marketInfos?.holders} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  amountTxt: {
    fontSize: moderateScale(20),
    fontWeight: 600,
    color: '#167E8D',
    flex: 1,
  },
  addressView: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#EFF2F5',
    borderRadius: 40,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 20,
  },
  addressTxt: {
    fontSize: moderateScale(12),
    fontWeight: 400,
    color: '#9C9DA0',
  },
  rowTitleTxt: {
    fontSize: moderateScale(12),
    fontWeight: 400,
    color: '#7C8FAC',
    flex: 1,
  },
  rowValueTxt: {
    fontSize: moderateScale(12),
    fontWeight: 400,
    color: '#333333',
    flex: 1,
    textAlign: 'right',
  },
  assetItemTouch: {
    padding: 10,
  },
  selectedAssetItemTxt: {
    fontSize: moderateScale(14),
    fontWeight: 600,
    color: '#333333',
  },
  assetItemTxt: {
    fontSize: moderateScale(14),
    fontWeight: 600,
    color: '#333333',
    opacity: 0.3,
  },
  verticalView: {
    width: 25,
    height: 3,
    backgroundColor: '#333333',
    alignSelf: 'center',
    borderRadius: 5,
  },
  listHeaderView: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TradingComponent;
