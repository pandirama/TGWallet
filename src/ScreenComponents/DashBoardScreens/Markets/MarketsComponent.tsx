/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
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
import {MarketTabs} from '../../../components/CustomTabs';
import {Ionicons} from '../../../utils/IconUtils';
import {useSelector} from 'react-redux';
import {useGetNetworksQuery} from '../../../api/auth/authAPI';
import {useFocusEffect} from '@react-navigation/native';
import useCommon from '../../../hooks/useCommon';
import {getErrorMessage} from '../../../utils/common';
import {useMarketListMutation} from '../../../api/marketAPI';
import WalletListComponent from '../../../components/WalletListComponent';
import {moderateScale} from 'react-native-size-matters';

type Props = NativeStackScreenProps<any, 'MARKETS'>;

const MarketsComponent = ({navigation}: Props) => {
  const {t} = useTranslation();
  const {showToast, toggleBackdrop} = useCommon();

  const [walletIcon, setWalletIcon] = useState<any>(null);
  const [marketLists, setMarketLists] = useState<any>([]);
  const [networks, setNetworks] = useState<any>([]);
  const [mode, setMode] = useState<string>('Hot');
  const [subMode, setSubMode] = useState<string>('');
  const [showWallets, setShowWallets] = useState(false);

  const {userInfo = {}, walletInfo = {}} = useSelector(
    ({authReducer}: any) => authReducer,
  );
  const {Wallet_icon, network_mode} = walletInfo ?? {};

  const {isFetching, refetch} = useGetNetworksQuery();

  const [marketList, {isLoading}] = useMarketListMutation();

  useEffect(() => {
    toggleBackdrop(isFetching || isLoading);
  }, [isFetching || isLoading]);

  useEffect(() => {
    setWalletIcon(Wallet_icon);
  }, [walletInfo]);

  const getMarketLists = async (modeItem?: any, subModeItem?: any) => {
    try {
      const params = {
        userid: userInfo?.generated_Id,
        mode: modeItem ?? mode,
        submode: subModeItem ?? subMode,
      };
      const response: any = await marketList(params).unwrap();
      if (response?.success) {
        setMarketLists(response);
        if (response?.sub_tabs?.length > 0) {
          setSubMode(response?.selected_sub_tab);
        } else {
          setSubMode('');
        }
      } else {
        setMarketLists([]);
        showToast({
          type: 'error',
          text1: response?.message,
        });
      }
    } catch (err: any) {
      showToast({
        type: 'error',
        text1: getErrorMessage(err),
      });
    }
  };

  useEffect(() => {
    getMarketLists(mode, subMode);
  }, [mode, subMode]);

  useFocusEffect(
    useCallback(() => {
      refetch().then(response => {
        const {isSuccess, isError, data, error} = response;
        if (isSuccess) {
          setNetworks(data?.networks);
        } else if (isError) {
          showToast({
            type: 'error',
            text1: getErrorMessage(error),
          });
        }
      });
      return () => {};
    }, []),
  );

  const tabsView = () => {
    return (
      <>
        <View style={styles.listHeaderView}>
          <FlatList
            data={marketLists?.tabs}
            renderItem={({item}) => renderItem(item, 'mode')}
            removeClippedSubviews={false}
            keyExtractor={(item, index) => 'key' + index}
            horizontal={true}
            style={{borderBottomWidth: 1, borderBottomColor: colors.gray1}}
          />
        </View>
        {marketLists?.sub_tabs?.length > 0 && (
          <View style={styles.listHeaderView}>
            <FlatList
              data={marketLists?.sub_tabs}
              renderItem={({item}) => renderItem(item, 'submode')}
              removeClippedSubviews={false}
              keyExtractor={(item, index) => 'key' + index}
              horizontal={true}
              style={{borderBottomWidth: 1, borderBottomColor: colors.gray1}}
            />
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0',
            paddingBottom: 10,
            paddingTop: 5,
            paddingLeft: 20,
            backgroundColor: colors.white,
          }}>
          <Text style={[styles.listItemTitleTxt]}>{t('NAME')}</Text>
          <View style={{flex: 1}} />
          <View style={{flex: 1}} />
          <Text style={[styles.listItemTitleTxt]}>{t('LAST_PRICE')}</Text>
          <Text style={[styles.listItemTitleTxt]}>{t('CHANGE_PERCENT')}</Text>
        </View>
        <FlatList
          data={marketLists?.market_datas}
          renderItem={renderMarketItem}
          removeClippedSubviews={false}
          keyExtractor={(item, index) => 'key' + index}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return <View style={styles.borderView} />;
          }}
        />
      </>
    );
  };

  const renderItem = (item: any, method: string) => {
    let findAsset =
      mode?.toLowerCase().replaceAll(' ', '') ===
      item?.toLowerCase().replaceAll(' ', '');
    if (method === 'submode') {
      findAsset =
        subMode?.toLowerCase().replaceAll(' ', '') ===
        item?.toLowerCase().replaceAll(' ', '');
    }
    return (
      <View>
        <TouchableOpacity
          style={styles.assetItemTouch}
          onPress={() => {
            if (method === 'submode') {
              setSubMode(item);
            } else {
              setSubMode('');
              setMode(item);
            }
          }}>
          <Text
            style={
              findAsset ? styles.selectedAssetItemTxt : styles.assetItemTxt
            }>
            {item}
          </Text>
        </TouchableOpacity>
        {findAsset && <View style={styles.verticalView} />}
      </View>
    );
  };

  const renderMarketItem = ({item}: any) => {
    const isPlus = item?.change < 0;
    return (
      <TouchableOpacity
        style={styles.defiListTouch}
        onPress={() => {
          navigation.navigate('MARKET_DETAILS', {
            marketDetails: item,
          });
        }}>
        <View style={styles.defiListIconView}>
          <Image
            style={styles.itemLogo}
            source={{
              uri: item?.tokenImage !== '' ? item?.tokenImage : null,
            }}
          />
          <Image
            style={styles.itemDisplayLogo}
            source={{
              uri: item?.displaynetwork !== '' ? item?.displaynetwork : null,
            }}
          />
        </View>
        <View style={styles.defiListHeaderTxtView}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={[styles.defiListnameTxt]}>{item?.tokenname}</Text>
            <Text style={[styles.defiListVolumeTxt]}>{item?.volume}</Text>
          </View>

          <View style={styles.defiListTxtView}>
            <Text style={styles.defiListNameTxt}>{item?.price}</Text>
          </View>
          <View
            style={[
              styles.defiListChangeTxtView,
              isPlus ? styles.defiListChangeRed : styles.defiListChangeGreen,
            ]}>
            <Text
              style={[
                styles.defiListNameTxt,
                isPlus
                  ? styles.defiListNameRedTxt
                  : styles.defiListNameGreenTxt,
              ]}>
              {item?.change}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
      <SafeAreaView
        style={appStyles.container}
        edges={['right', 'left', 'top']}>
        <View style={styles.tabsView}>
          <View style={styles.headerView}>
            <TouchableOpacity
              style={styles.headerLeftIconTopView}
              onPress={() => {
                setShowWallets(true);
              }}>
              <View style={styles.headerLeftIconView}>
                <View style={styles.brandIcon}>
                  <Image
                    style={styles.walletItemLogo}
                    source={{
                      uri: walletIcon,
                    }}
                  />
                </View>
                <View style={styles.arrowIcon}>
                  <Ionicons
                    name={'caret-forward-sharp'}
                    size={18}
                    color={'#7E7F82'}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{justifyContent: 'center', flex: 1}}>
            <Text style={styles.title}>{MarketTabs.Market}</Text>
          </View>
          <View style={styles.headerRightIconView}>
            <TouchableOpacity style={styles.walletIcon} />
          </View>
        </View>
        {tabsView()}
        <WalletListComponent
          navigation={navigation}
          showWallets={showWallets}
          setShowWallets={setShowWallets}
          networkMode={network_mode}
          networks={networks}
        />
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
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
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
    color: '#7C8FAC',
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
    padding: 10,
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
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  itemDisplayLogo: {
    width: 15,
    height: 15,
    borderRadius: 100,
    position: 'absolute',
    bottom: 13,
    right: 7,
    backgroundColor: '#9C9DA0',
  },
  listItemTitleTxt: {
    fontSize: moderateScale(12),
    fontWeight: 400,
    color: '#7C8FAC',
    flex: 1,
    textAlign: 'left',
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: 700,
    color: '#333333',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});

export default MarketsComponent;
