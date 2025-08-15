/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../utils/appStyles';
import {colors} from '../../../utils/colors';
import {useFocusEffect} from '@react-navigation/native';
import useCommon from '../../../hooks/useCommon';
import {getErrorMessage} from '../../../utils/common';
import {Ionicons} from '../../../utils/IconUtils';
import TradingComponent from './TradingComponent';
import CheckComponent from './CheckComponent';
import DescriptionComponent from './DescriptionComponent';
import {
  useCheckInfoMutation,
  useDescriptionInfoMutation,
  useTradingInfoMutation,
} from '../../../api/marketAPI';
import { moderateScale } from 'react-native-size-matters';

type Props = NativeStackScreenProps<any, 'MARKET_DETAILS'>;

const markets = [
  {
    id: 0,
    marketName: 'Trading',
  },
  {
    id: 1,
    marketName: 'Check',
  },
  {
    id: 2,
    marketName: 'Description',
  },
];

const MarketDetailsComponent = ({navigation, route}: Props) => {
  const {marketDetails} = route?.params ?? {};

  const {showToast, toggleBackdrop} = useCommon();

  const [selectedMarket, setSelectedMarket] = useState('Trading');
  const [marketInfos, setMarketInfos] = useState<any>(null);
  const [checkInfos, setCheckInfos] = useState<any>(null);
  const [descInfos, setDescInfos] = useState<any>(null);

  const [tradingInfo, {isLoading}] = useTradingInfoMutation();
  const [checkInfo, {isLoading: isCheckLoading}] = useCheckInfoMutation();
  const [descriptionInfo, {isLoading: isDescLoading}] =
    useDescriptionInfoMutation();

  useEffect(() => {
    toggleBackdrop(isLoading || isCheckLoading || isDescLoading);
  }, [isLoading || isCheckLoading || isDescLoading]);

  const getMarketDetails = async () => {
    try {
      const params = {
        chainid: marketDetails?.blockchain_id,
        basetoken: marketDetails?.tokenaddress,
        symbol: marketDetails?.tokensymbol,
        id: marketDetails?.token_id,
        lang: 'en',
        pair: marketDetails?.pair,
        period: '5m',
        transaction_action: '0',
        poolaction: '0',
      };
      const response: any = await tradingInfo(params).unwrap();
      if (response?.success) {
        setMarketInfos(response?.data);
      }
    } catch (err: any) {
      showToast({
        type: 'error',
        text1: getErrorMessage(err),
      });
    }
  };

  const getCheckDetails = async () => {
    try {
      const params = {
        chain_id: marketDetails?.blockchain_id,
        address: marketDetails?.tokenaddress,
        id: marketDetails?.token_id,
      };
      const response: any = await checkInfo(params).unwrap();
      setCheckInfos(response);
    } catch (err: any) {
      showToast({
        type: 'error',
        text1: getErrorMessage(err),
      });
    }
  };

  const getDescriptionDetails = async () => {
    try {
      const params = {
        id: marketDetails?.token_id,
        lang: 'en',
        basetoken: marketDetails?.tokenaddress,
        chainid: marketDetails?.blockchain_id,
        symbol: marketDetails?.tokensymbol,
      };
      const response: any = await descriptionInfo(params).unwrap();
      if (response?.success) {
        setDescInfos(response?.data);
      }
    } catch (err: any) {
      showToast({
        type: 'error',
        text1: getErrorMessage(err),
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      getMarketDetails();
      getCheckDetails();
      getDescriptionDetails();
      return () => {};
    }, []),
  );

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
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.background}
        animated
      />
      <SafeAreaView style={appStyles.container} edges={['right', 'left', 'top']}>
        <View style={styles.backContainer}>
          <TouchableOpacity
            style={styles.backTouch}
            onPress={() => navigation.goBack()}>
            <Ionicons name={'chevron-back'} size={22} color={colors.black} />
          </TouchableOpacity>
          <View style={styles.defiListIconView}>
            <Image
              style={styles.itemLogo}
              source={{
                uri:
                  marketDetails?.tokenImage !== ''
                    ? marketDetails?.tokenImage
                    : null,
              }}
            />
            <Image
              style={styles.itemDisplayLogo}
              source={{
                uri:
                  marketDetails?.displaynetwork !== ''
                    ? marketDetails?.displaynetwork
                    : null,
              }}
            />
          </View>
          <Text style={styles.titleTxt}>{marketDetails?.tokenname}</Text>
        </View>
        <View style={styles.listHeaderView}>
          <FlatList
            data={markets}
            renderItem={renderItem}
            removeClippedSubviews={false}
            keyExtractor={(item, index) => 'key' + index}
            horizontal={true}
            style={{borderBottomWidth: 1, borderBottomColor: colors.gray1}}
          />
        </View>
        {selectedMarket === 'Trading' && (
          <TradingComponent
            marketInfos={marketInfos}
            marketDetails={marketDetails}
          />
        )}
        {selectedMarket === 'Check' && (
          <CheckComponent checkInfos={checkInfos} />
        )}
        {selectedMarket === 'Description' && (
          <DescriptionComponent descInfos={descInfos} />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  tabsView: {
    marginTop: 20,
    flexDirection: 'row',
  },
  headerView: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 0.25,
  },
  headerLeftIconTopView: {
    flex: 1,
    flexDirection: 'row',
  },
  headerLeftIconView: {
    borderRadius: 17,
    backgroundColor: '#EFF2F5',
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    marginLeft: 10,
  },
  brandIcon: {
    marginLeft: 5,
    marginRight: 5,
  },
  arrowIcon: {
    marginRight: 5,
  },
  walletIcon: {
    marginRight: 10,
  },
  walletItemLogo: {
    width: 28,
    height: 28,
    borderRadius: 100,
  },
  headerRightIconView: {
    justifyContent: 'center',
    marginRight: 10,
  },
  listHeaderView: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    backgroundColor: colors.white,
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
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
    marginRight: 15,
    paddingLeft: 0,
    width: '100%',
  },
  defiListTouch: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 5,
  },
  defiListIconView: {
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
    alignSelf: 'center',
  },
  defiListChangeTxtView: {
    padding: 2,
    marginRight: 15,
    alignSelf: 'center',
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  defiListChangeGreen: {
    backgroundColor: '#D4FCEC',
    borderWidth: 1,
    borderColor: '#167E8D',
  },
  defiListChangeRed: {
    backgroundColor: '#FDEDED',
    borderWidth: 1,
    borderColor: '#D32F2F',
  },
  defiListnameTxt: {
    fontSize: moderateScale(14),
    fontWeight: 600,
    color: '#333333',
  },
  defiListVolumeTxt: {
    fontSize: moderateScale(12),
    fontWeight: 400,
    color: '#7C8FAC',
  },
  defiListNameTxt: {
    fontSize: moderateScale(14),
    fontWeight: 600,
    textAlign: 'right',
  },
  defiListNameGreenTxt: {
    color: '#167E8D',
  },
  defiListNameRedTxt: {
    color: '#D32F2F',
  },
  defiListamountTxt: {
    fontSize: moderateScale(14),
    fontWeight: 400,
    color: '#7C8FAC',
    textAlign: 'right',
  },
  itemLogo: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  itemDisplayLogo: {
    width: 15,
    height: 15,
    borderRadius: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#9C9DA0',
  },
  backContainer: {
    height: 50,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  backTouch: {
    padding: 10,
    paddingLeft: 16,
  },
  titleTxt: {
    fontSize: moderateScale(14),
    color: '#333333',
    fontWeight: 600,
    flex: 1,
    marginLeft: 5,
  },
});

export default MarketDetailsComponent;
