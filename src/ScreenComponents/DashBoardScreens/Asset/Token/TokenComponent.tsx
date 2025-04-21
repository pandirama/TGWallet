/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../../utils/appStyles';
import {colors} from '../../../../utils/colors';
import DashBoardHeaderComponent from '../../../../components/DashBoardHeaderComponent';
import {Feather, Ionicons} from '../../../../utils/IconUtils';
import {useSelector} from 'react-redux';
import useCommon from '../../../../hooks/useCommon';
import {useTokenInfoMutation} from '../../../../api/walletAPI';
import {useFocusEffect} from '@react-navigation/native';
import {getErrorMessage} from '../../../../utils/common';
import Send from '../../../../assets/send.svg';
import Transaction from '../../../../assets/profile/transaction.svg';

type Props = NativeStackScreenProps<any, 'TOKEN'>;

const assets = [
  {
    id: 0,
    assetName: 'All',
  },
  {
    id: 1,
    assetName: 'In',
  },
  {
    id: 2,
    assetName: 'Out',
  },
];

const TokenComponent = ({navigation, route}: Props) => {
  const {token} = route?.params ?? {};
  const {showToast, toggleBackdrop} = useCommon();
  const {walletInfo = {}, userInfo = {}} = useSelector(
    ({authReducer}: any) => authReducer,
  );

  const [selectedAsset, setSelectedAsset] = useState('All');
  const [all, setAll] = useState([]);
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);

  const [tokenInfo, {isLoading}] = useTokenInfoMutation();

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  const getWalletInfos = async () => {
    try {
      const params = {
        wallet_id: walletInfo?.wallet_id,
        userid: userInfo?.generated_Id,
        token_address: token?.tokenAddress,
      };
      const response: any = await tokenInfo(params).unwrap();
      if (response?.success) {
        setAll(response?.tokeninfo?.transactions?.all);
        setIncoming(response?.tokeninfo?.transactions?.incoming);
        setOutgoing(response?.tokeninfo?.transactions?.outgoing);
      } else {
        setAll([]);
        setIncoming([]);
        setOutgoing([]);
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

  useFocusEffect(
    useCallback(() => {
      getWalletInfos();
      return () => {};
    }, []),
  );

  const renderItem = ({item}: any) => {
    const findAsset = selectedAsset === item?.assetName;
    return (
      <View>
        <TouchableOpacity
          style={styles.assetItemTouch}
          onPress={() => {
            setSelectedAsset(item?.assetName);
          }}>
          <Text
            style={
              findAsset ? styles.selectedAssetItemTxt : styles.assetItemTxt
            }>
            {item?.assetName}
          </Text>
        </TouchableOpacity>
        {findAsset && <View style={styles.verticalView} />}
      </View>
    );
  };

  const renderAssets = ({item}: any) => {
    return (
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: colors.white,
            padding: 15,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.itemTitleTxt}>From : </Text>
            <Text style={styles.itemSubTxt}>{item?.from}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.itemTitleTxt}>To : </Text>
            <Text style={styles.itemSubTxt}>{item?.to}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.itemTitleTxt}>Time : </Text>
            <Text style={styles.itemSubTxt}>{item?.time}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.itemTitleTxt}>Value : </Text>
            <Text style={styles.itemSubTxt}>{item?.value}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const getData = () => {
    if (selectedAsset === 'All') {
      return all;
    } else if (selectedAsset === 'In') {
      return incoming;
    } else if (selectedAsset === 'Out') {
      return outgoing;
    }
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <DashBoardHeaderComponent title={token?.tokenName} />
          <View style={styles.walletContainer}>
            <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
              <View style={{flexDirection: 'row', paddingBottom: 20}}>
                <Image
                  style={styles.itemLogo}
                  source={{
                    uri: token?.tokenImage,
                  }}
                />
                <View style={{marginLeft: 20}}>
                  <Text style={styles.balanceTxt}>Balance</Text>
                  <Text style={styles.balanceValTxt}>{token?.balance}</Text>
                  <Text style={styles.balanceUSDTxt}>
                    {`$${token?.balanceInUSD}`}
                  </Text>
                </View>
              </View>

              <View style={styles.borderView} />
              <View style={styles.walletTouch}>
                <Text style={styles.walletTitleTxt}>Price</Text>
                <Text style={[styles.walletTitleTxt, {textAlign: 'right'}]}>
                  {`$${token?.tokenPrice}`}
                </Text>
                <Ionicons
                  name={'chevron-forward'}
                  size={25}
                  color={colors.black}
                  style={styles.icon}
                />
              </View>
            </View>
          </View>
          <View style={[appStyles.boxShadow, styles.headerSubContainer]}>
            <TouchableOpacity
              style={styles.menuItemTouch}
              onPress={() => {
                navigation.navigate('SEND');
              }}>
              <Send width={28} height={28} />
              <Text style={styles.menuItemTxt}>Send</Text>
            </TouchableOpacity>
            <View style={styles.horizontalBorder} />
            <TouchableOpacity
              style={styles.menuItemTouch}
              onPress={() => {
                navigation.navigate('RECEIVE');
              }}>
              <Ionicons
                name={'arrow-down-outline'}
                size={26}
                color={'#333333'}
              />
              <Text style={styles.menuItemTxt}>Receive</Text>
            </TouchableOpacity>
            <View style={styles.horizontalBorder} />
            <View style={styles.horizontalBorder} />
            <TouchableOpacity style={styles.menuItemTouch}>
              <Transaction width={28} height={28} />
              <Text style={styles.menuItemTxt}>Swap</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.listHeaderView}>
            <View style={styles.listView}>
              <FlatList
                data={assets}
                renderItem={renderItem}
                removeClippedSubviews={false}
                keyExtractor={(item, index) => 'key' + index}
                horizontal={true}
              />
            </View>

            <TouchableOpacity style={styles.addIcon}>
              <Feather name={'filter'} size={20} color={'#333333'} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={getData()}
            renderItem={renderAssets}
            removeClippedSubviews={false}
            keyExtractor={(item, index) => 'key' + index}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => {
              return <View style={styles.borderView} />;
            }}
          />
          {/* {selectedAsset === 'DEFI' && <DEFIComponent />} */}
          {/* {selectedAsset === 'Assets' && (
            <DEFIComponent tokenAssets={tokenAssets} navigation={navigation} />
          )}
          {selectedAsset === 'NFT' && (
            <NFTComponent navigation={navigation} tokenNFTs={tokenNFTs} />
          )} */}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  walletContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  walletSubContainer: {
    backgroundColor: colors.white,
    paddingLeft: 15,
    borderRadius: 8,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  walletSubContainer1: {
    margin: 20,
    marginBottom: 5,
    flex: 1,
  },
  walletTitleTxt: {
    fontSize: 14,
    fontWeight: 600,
    color: '#333333',
    flex: 1,
    marginLeft: 8,
  },
  networkTxt: {
    fontSize: 15,
    fontWeight: 600,
    color: '#333333',
    textAlignVertical: 'center',
    marginLeft: 23,
    marginTop: 25,
  },
  icon: {
    marginRight: 15,
  },
  walletTouch: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
    marginRight: 15,
    paddingLeft: 0,
  },
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
    marginRight: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgColor,
    borderRadius: 25, // Adjust the value to change the roundness
    paddingHorizontal: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray1,
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    color: colors.black,
  },
  nftNameTxt: {
    fontSize: 12,
    fontWeight: 500,
    color: '#333333',
  },
  nftValueTxt: {
    fontSize: 10,
    fontWeight: 400,
    color: '#7C8FAC',
  },
  nftNameView: {
    flex: 1,
    marginLeft: 10,
  },
  listHeaderView: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  listView: {
    width: '88%',
  },
  addIcon: {
    marginBottom: 15,
    padding: 10,
  },
  assetItemTouch: {
    padding: 10,
  },
  selectedAssetItemTxt: {
    fontSize: 14,
    fontWeight: 600,
    color: '#333333',
  },
  assetItemTxt: {
    fontSize: 14,
    fontWeight: 600,
    color: '#7C8FAC',
  },
  itemTitleTxt: {
    fontSize: 16,
    flex: 0.15,
    fontWeight: 800,
    color: '#33333',
  },
  itemSubTxt: {
    fontSize: 14,
    fontWeight: 400,
    flex: 1,
    color: '#333333',
  },
  verticalView: {
    width: 25,
    height: 3,
    backgroundColor: '#333333',
    alignSelf: 'center',
    borderRadius: 5,
  },
  headerSubContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  menuItemTouch: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    textAlign: 'center',
  },
  horizontalBorder: {
    borderWidth: 0.5,
    width: 1,
    height: 25,
    borderColor: colors.gray1,
  },
  itemLogo: {
    width: 45,
    height: 45,
    alignSelf: 'center',
  },
  balanceTxt: {
    fontSize: 12,
    fontWeight: 400,
    color: '#7C8FAC',
    marginTop: 2,
  },
  balanceValTxt: {
    fontSize: 18,
    fontWeight: 600,
    color: '#333333',
    marginTop: 2,
  },
  balanceUSDTxt: {
    fontSize: 14,
    fontWeight: 600,
    color: '#7C8FAC',
    marginTop: 2,
  },
});

export default TokenComponent;
