/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Dimensions,
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
import Scan from '../../../assets/scan.svg';
import AddWallet from '../../../assets/add_wallet.svg';
import Buy from '../../../assets/buy.svg';
import Send from '../../../assets/send.svg';
import Eye from '../../../assets/eye.svg';
import Transaction from '../../../assets/profile/transaction.svg';
import DEFIComponent from './DEFIComponent';
import NFTComponent from './NFTComponent';
import {Feather, Ionicons, MaterialIcons} from '../../../utils/IconUtils';
import {useSelector} from 'react-redux';
import WalletListComponent from '../../../components/WalletListComponent';
import {useWalletInfosMutation} from '../../../api/walletAPI';
import useCommon from '../../../hooks/useCommon';
import {useFocusEffect} from '@react-navigation/native';
import {getErrorMessage} from '../../../utils/common';
import {useGetNetworksQuery} from '../../../api/auth/authAPI';
import {authAction} from '../../../reducer/auth/authSlice';
import {useAppDispatch} from '../../../store';

type Props = NativeStackScreenProps<any, 'ASSET'>;

const assets = [
  {
    id: 0,
    assetName: 'Assets',
  },
  {
    id: 1,
    assetName: 'NFT',
  },
];

const AssetComponent = ({navigation}: Props) => {
  const {showToast, toggleBackdrop} = useCommon();
  const dispatch = useAppDispatch();

  const [selectedAsset, setSelectedAsset] = useState('Assets');
  const [tokenAssets, setTokenAssets] = useState([]);
  const [tokenNFTs, setTokenNFTs] = useState([]);
  const [showWallets, setShowWallets] = useState(false);
  const [networks, setNetworks] = useState<any>([]);
  const [walletIcon, setWalletIcon] = useState<any>(null);

  const {
    walletInfo = {},
    userInfo = {},
    selectedNetwork,
  } = useSelector(({authReducer}: any) => authReducer);
  const {wallet_name, wallet_balance, network_mode} = walletInfo ?? {};

  const {isFetching, refetch} = useGetNetworksQuery();

  const [walletInfos, {isLoading}] = useWalletInfosMutation();

  useEffect(() => {
    toggleBackdrop(isLoading || isFetching);
  }, [isLoading || isFetching]);

  useEffect(() => {
    setWalletIcon(walletInfo?.Wallet_icon);
  }, [walletInfo]);

  const getWalletInfos = async () => {
    try {
      const params = {
        wallet_id: walletInfo?.wallet_id,
        userid: userInfo?.generated_Id,
      };
      const response: any = await walletInfos(params).unwrap();
      if (response?.success) {
        setTokenAssets(response?.message?.tokenBalances);
        setTokenNFTs(response?.message?.nfts);
      } else {
        setTokenAssets([]);
        setTokenNFTs([]);
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
      refetch().then(response => {
        const {isSuccess, isError, data, error} = response;
        if (isSuccess) {
          setNetworks(data?.networks);
          const networkData = data?.networks?.filter((network: any) => {
            return network?.ID === walletInfo?.network_mode;
          })?.[0];
          dispatch(authAction.setSelectedNetwork(networkData));
          const networkIcon = networkData?.Wallet_icon;
          setWalletIcon(networkIcon);
        } else if (isError) {
          showToast({
            type: 'error',
            text1: getErrorMessage(error),
          });
        }
      });
      getWalletInfos();
      return () => {};
    }, [showWallets, walletInfo]),
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

  return (
    <SafeAreaView style={appStyles.container} edges={['right', 'left', 'top']}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.background}
        animated
      />
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
        <View style={styles.headerRightIconView}>
          <TouchableOpacity style={styles.walletIcon}>
            <AddWallet width={28} height={28} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Scan width={28} height={28} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[appStyles.boxShadow, styles.headerContainer]}>
        <Image
          source={require('../../../assets/Wallet_BG.png')}
          style={{
            width: Dimensions.get('window').width / 1.1,
            height: 182,
            borderRadius: 10,
          }}
        />
        <View style={styles.walletView}>
          <TouchableOpacity
            style={styles.walletNameView}
            onPress={() => {
              navigation.navigate('WALLET_STACK', {
                screen: 'WALLET_DETAILS',
                params: {
                  walletDetails: walletInfo,
                  networkIcon: walletInfo?.Wallet_icon,
                },
              });
            }}>
            <Text style={styles.walletNameTxt}>{wallet_name}</Text>
            <MaterialIcons
              name={'keyboard-arrow-right'}
              size={26}
              color={'#FFFFFF'}
            />
          </TouchableOpacity>

          <View style={styles.amountView}>
            <Text style={styles.menuAmountTxt}>{wallet_balance}</Text>
            <Eye width={30} height={30} />
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
            <TouchableOpacity
              style={styles.menuItemTouch}
              onPress={() => {
                navigation.navigate('BUY', {
                  navigation: navigation,
                  showWallets: showWallets,
                  setShowWallets: setShowWallets,
                  networkMode: network_mode,
                  selectedNetworkMode: selectedNetwork,
                  networks: networks,
                });
              }}>
              <Buy width={28} height={28} />
              <Text style={styles.menuItemTxt}>Buy</Text>
            </TouchableOpacity>
            <View style={styles.horizontalBorder} />
            <TouchableOpacity style={styles.menuItemTouch}>
              <Transaction width={28} height={28} />
              <Text style={styles.menuItemTxt}>Swap</Text>
            </TouchableOpacity>
          </View>
        </View>
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
          <Feather name={'plus'} size={20} color={'#333333'} />
        </TouchableOpacity>
      </View>
      {selectedAsset === 'Assets' && (
        <DEFIComponent tokenAssets={tokenAssets} navigation={navigation} />
      )}
      {selectedAsset === 'NFT' && (
        <NFTComponent navigation={navigation} tokenNFTs={tokenNFTs} />
      )}
      <WalletListComponent
        navigation={navigation}
        showWallets={showWallets}
        setShowWallets={setShowWallets}
        networkMode={network_mode}
        selectedNetworkMode={selectedNetwork}
        networks={networks}
      />
    </SafeAreaView>
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
  walletView: {
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
  },
  headerTxt: {
    fontSize: 18,
    fontWeight: 600,
    color: '#333333',
    textAlign: 'center',
    flex: 1,
  },
  headerLeftIcon: {
    marginLeft: 10,
    alignSelf: 'center',
    padding: 5,
  },
  headerRightTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    textAlign: 'center',
    marginRight: 20,
  },
  headerContainer: {
    borderRadius: 10,
    margin: 20,
  },
  headerSubContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  headerRightIconView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
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
  horizontalBorder: {
    borderWidth: 0.5,
    width: 1,
    height: 25,
    borderColor: colors.gray1,
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
  menuAmountTxt: {
    fontSize: 28,
    fontWeight: 700,
    color: '#FFFFFF',
    marginRight: 5,
    marginLeft: 5,
  },
  walletNameTxt: {
    fontSize: 20,
    fontWeight: 400,
    color: '#FFFFFF',
  },
  walletNameView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  amountView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
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
    marginLeft: 10,
  },
  listView: {
    width: '88%',
  },
  addIcon: {
    marginBottom: 15,
    padding: 10,
  },
  actionViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#EFF2F5',
    height: '80%',
  },
  actionTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 10,
  },
  actionTitleTxt: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
    fontWeight: 600,
  },
  walletContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  walletListNameTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    flex: 1,
    textAlignVertical: 'center',
    marginLeft: 12,
  },
  addressView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletAddressTxt: {
    fontSize: 10,
    fontWeight: 400,
    color: '#7C8FAC',
    textAlignVertical: 'center',
    marginLeft: 12,
    marginTop: 3,
    marginRight: 5,
  },
  walletBalanceTxt: {
    fontSize: 12,
    fontWeight: 400,
    color: '#333333',
    flex: 1,
    textAlignVertical: 'center',
    alignSelf: 'flex-end',
    marginRight: 12,
  },
  borderView: {
    borderWidth: 1,
    borderColor: colors.gray1,
  },
  itemLogo: {
    width: 30,
    height: 30,
  },
  walletItemLogo: {
    width: 28,
    height: 28,
    borderRadius: 100,
  },
  walletListView: {
    flexDirection: 'row',
    height: '100%',
  },
  walletContentList: {
    paddingBottom: 70,
  },
  networkList: {
    backgroundColor: '#EFF2F5',
  },
  networkListTouch: {
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  loadingView: {
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftList: {
    width: 60,
  },
  walletListTitleView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  walletTitView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
  },
  selectedWalletTxt: {
    width: '85%',
    marginLeft: 12,
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
  },
  addWalletIcon: {
    padding: 5,
  },
  actionsheetView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: 23,
    marginLeft: 12,
    marginRight: 12,
  },
  actionsheetTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    textAlign: 'center',
  },
  actionSheetTouch: {
    paddingBottom: 15,
    paddingTop: 15,
  },
  actionSheetBorder: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
  },
  cancelTxt: {
    fontSize: 16,
    fontWeight: 600,
    color: '#333333',
    textAlign: 'center',
    paddingBottom: 15,
    paddingTop: 15,
  },
  cancelTouch: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: 40,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 12,
  },
  container: {
    backgroundColor: '#EFF2F5',
    borderRadius: 12,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  titleTxt: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
    textAlign: 'center',
    fontWeight: 700,
  },
  closeTouch: {
    padding: 5,
  },
});

export default AssetComponent;
