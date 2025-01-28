/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ActivityIndicator,
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
import TokenBranded from '../../../assets/token_branded.svg';
import Buy from '../../../assets/buy.svg';
import Send from '../../../assets/send.svg';
import Eye from '../../../assets/eye.svg';
import Transaction from '../../../assets/profile/transaction.svg';
import DEFIComponent from './DEFIComponent';
import NFTComponent from './NFTComponent';
import {
  Feather,
  Foundation,
  Ionicons,
  MaterialIcons,
} from '../../../utils/IconUtils';
import {useSelector} from 'react-redux';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {useWalletListMutation} from '../../../api/walletAPI';
import useCommon from '../../../hooks/useCommon';
import {getErrorMessage} from '../../../utils/common';
import {useFocusEffect} from '@react-navigation/native';
import {useGetNetworksQuery} from '../../../api/auth/authAPI';
import Modal from 'react-native-modal';
// import useCommon from '../../../hooks/useCommon';

type Props = NativeStackScreenProps<any, 'ASSET'>;

const assets = [
  {
    id: 0,
    assetName: 'DEFI',
  },
  {
    id: 1,
    assetName: 'Assets',
  },
  {
    id: 2,
    assetName: 'NFT',
  },
];

const AssetComponent = ({navigation}: Props) => {
  const {showToast, toggleBackdrop} = useCommon();

  const actionSheetRef = useRef<ActionSheetRef>(null);

  const [selectedAsset, setSelectedAsset] = useState('DEFI');
  const [networks, setNetworks] = useState<any>([]);
  const [wallets, setWallets] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState<any>(null);

  const [addWalletVisible, setAddWalletVisible] = useState(false);

  const {userInfo = {}, walletInfo = {}} = useSelector(
    ({authReducer}: any) => authReducer,
  );
  const {wallet_name, wallet_balance} = walletInfo ?? {};

  const [walletCreate, {isLoading}] = useWalletListMutation();
  const {isFetching, refetch} = useGetNetworksQuery();

  useEffect(() => {
    toggleBackdrop(isFetching);
  }, [isFetching]);

  const getWallets = async (networkID: string) => {
    try {
      const params = {
        network: networkID,
        userid: userInfo?.generated_Id,
      };
      const response: any = await walletCreate(params).unwrap();
      if (response?.success) {
        setWallets(response?.wallets);
      } else {
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
          setSelectedNetwork(data?.networks[0]);
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

  const renderWalletItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={[appStyles.boxShadow, styles.walletContainer]}
        onPress={() => {
          actionSheetRef?.current?.hide();
          navigation.navigate('WALLET_DETAILS', {
            walletDetails: item,
            networkIcon: selectedNetwork?.Wallet_icon,
          });
        }}>
        <Text style={styles.walletListNameTxt}>{item?.wallet_name}</Text>
        {item?.wallet_address && (
          <View style={styles.addressView}>
            <Text style={styles.walletAddressTxt}>{item?.wallet_address}</Text>
            <Ionicons name={'copy-outline'} size={16} color={'#7C8FAC'} />
          </View>
        )}
        <Text style={styles.walletBalanceTxt}>{item?.wallet_balance}</Text>
      </TouchableOpacity>
    );
  };

  const renderNetworkItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.networkListTouch,
          selectedNetwork?.ID === item?.ID.toString() && {
            backgroundColor: colors.white,
          },
        ]}
        onPress={() => {
          setSelectedNetwork(item);
          getWallets(item?.ID);
        }}>
        <Image
          style={styles.itemLogo}
          source={{
            uri: item?.Wallet_icon,
          }}
        />
      </TouchableOpacity>
    );
  };

  const onDismiss = () => {
    setAddWalletVisible(false);
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.background}
        animated
      />
      <SafeAreaView style={appStyles.container}>
        <View style={styles.headerView}>
          <View style={styles.headerLeftIconTopView}>
            <TouchableOpacity
              style={styles.headerLeftIconView}
              onPress={() => {
                actionSheetRef?.current?.show();
                getWallets(selectedNetwork?.ID);
              }}>
              <View style={styles.brandIcon}>
                <TokenBranded width={28} height={28} />
              </View>
              <TouchableOpacity style={styles.arrowIcon}>
                <Ionicons
                  name={'caret-forward-sharp'}
                  size={18}
                  color={'#7E7F82'}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
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
          <TouchableOpacity style={styles.walletNameView}>
            <Text style={styles.walletNameTxt}>{wallet_name}</Text>
            <MaterialIcons
              name={'keyboard-arrow-right'}
              size={26}
              color={'#FFFFFF'}
            />
          </TouchableOpacity>

          <View style={styles.amountView}>
            <Foundation name={'dollar'} size={38} color={'#FFFFFF'} />
            <Text style={styles.menuAmountTxt}>{wallet_balance}</Text>
            <Eye width={30} height={30} />
          </View>

          <View style={[appStyles.boxShadow, styles.headerSubContainer]}>
            <TouchableOpacity style={styles.menuItemTouch}>
              <Send width={28} height={28} />
              <Text style={styles.menuItemTxt}>Send</Text>
            </TouchableOpacity>
            <View style={styles.horizontalBorder} />
            <TouchableOpacity style={styles.menuItemTouch}>
              <Ionicons
                name={'arrow-down-outline'}
                size={26}
                color={'#333333'}
              />
              <Text style={styles.menuItemTxt}>Receive</Text>
            </TouchableOpacity>
            <View style={styles.horizontalBorder} />
            <TouchableOpacity style={styles.menuItemTouch}>
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
        <View style={styles.listHeaderView}>
          <View style={styles.listView}>
            <FlatList
              data={assets}
              renderItem={renderItem}
              keyExtractor={(item: any) => item?.id}
              horizontal={true}
            />
          </View>

          <TouchableOpacity style={styles.addIcon}>
            <Feather name={'plus'} size={20} color={'#333333'} />
          </TouchableOpacity>
        </View>
        {selectedAsset === 'DEFI' && <DEFIComponent />}
        {selectedAsset === 'Assets' && <></>}
        {selectedAsset === 'NFT' && <NFTComponent navigation={navigation} />}
        <ActionSheet
          ref={actionSheetRef}
          containerStyle={styles.actionContainer}
          closeOnPressBack={false}
          closeOnTouchBackdrop={false}
          onClose={() => {
            actionSheetRef?.current?.hide();
          }}>
          <View style={styles.actionViewContainer}>
            <View style={styles.actionTitleView}>
              <TouchableOpacity
                onPress={() => {
                  actionSheetRef?.current?.hide();
                }}>
                <Ionicons name={'search'} size={20} color={'#333333'} />
              </TouchableOpacity>
              <Text style={styles.actionTitleTxt}>Wallet List</Text>
              <TouchableOpacity
                onPress={() => {
                  actionSheetRef?.current?.hide();
                }}>
                <Ionicons name={'close'} size={20} color={'#333333'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderView} />
          <View style={styles.walletListView}>
            <View style={styles.leftList}>
              <FlatList
                data={networks}
                renderItem={renderNetworkItem}
                keyExtractor={(item: any) => item?.id}
                style={styles.networkList}
                showsVerticalScrollIndicator={false}
              />
            </View>

            {isLoading ? (
              <View style={styles.loadingView}>
                <ActivityIndicator size="large" color={'#6B121C'} />
              </View>
            ) : (
              <View style={styles.walletListTitleView}>
                <View style={styles.walletTitView}>
                  <Text style={styles.selectedWalletTxt}>
                    {selectedNetwork?.Wallet_network}
                  </Text>
                  <TouchableOpacity
                    style={styles.addWalletIcon}
                    onPress={() => setAddWalletVisible(true)}>
                    <Feather name={'plus'} size={20} color={'#333333'} />
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={wallets}
                  renderItem={renderWalletItem}
                  keyExtractor={(item: any) => item?.id}
                  contentContainerStyle={styles.walletContentList}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            )}
          </View>
          <Modal
            isVisible={addWalletVisible}
            onBackdropPress={onDismiss}
            animationInTiming={500}
            animationOutTiming={700}
            useNativeDriver={true}>
            <View style={styles.container}>
              <View style={styles.actionTitleView}>
                <Text style={styles.titleTxt}>Add Wallet</Text>
                <TouchableOpacity onPress={onDismiss} style={styles.closeTouch}>
                  <Ionicons name={'close'} size={20} color={'#9C9DA0'} />
                </TouchableOpacity>
              </View>
              <View style={[appStyles.boxShadow, styles.actionsheetView]}>
                <TouchableOpacity
                  style={styles.actionSheetTouch}
                  onPress={() => {
                    setAddWalletVisible(false);
                    actionSheetRef?.current?.hide();
                    navigation.navigate('NEW_WALLET', {
                      screen: 'NEW_WALLET_PASSWORD',
                      params: {walletNetwork: selectedNetwork},
                    });
                  }}>
                  <Text style={styles.actionsheetTxt}>Create Wallet</Text>
                </TouchableOpacity>
                <View style={styles.actionSheetBorder} />
                <TouchableOpacity style={styles.actionSheetTouch}>
                  <Text style={styles.actionsheetTxt}>Import Wallet</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[appStyles.boxShadow, styles.cancelTouch]}
                onPress={() => setAddWalletVisible(false)}>
                <Text style={styles.cancelTxt}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </ActionSheet>
      </SafeAreaView>
    </>
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
    backgroundColor: colors.black,
    borderRadius: 10,
    margin: 20,
    paddingBottom: 15,
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
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
