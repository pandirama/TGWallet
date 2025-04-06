/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import Modal from 'react-native-modal';
import Clipboard from '@react-native-clipboard/clipboard';
import {Feather, Ionicons} from '../utils/IconUtils';
import appStyles from '../utils/appStyles';
import {useAppDispatch} from '../store';
import {authAction} from '../reducer/auth/authSlice';
import {useWalletListMutation} from '../api/walletAPI';
import useCommon from '../hooks/useCommon';
import {colors} from '../utils/colors';
import {getErrorMessage, localStorageKey, setStorage} from '../utils/common';

const WalletComponent = ({
  navigation,
  setShowWallets,
  networkMode = '',
  selectedNetworkMode,
  networks,
}: any) => {
  const {showToast} = useCommon();
  const dispatch = useAppDispatch();

  const [wallets, setWallets] = useState<any>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<any>(null);

  const [addWalletVisible, setAddWalletVisible] = useState(false);

  const {userInfo = {}} = useSelector(({authReducer}: any) => authReducer);

  const [walletCreate, {isLoading}] = useWalletListMutation();

  useEffect(() => {
    setSelectedNetwork(selectedNetworkMode);
  }, []);

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
        setWallets([]);
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
      getWallets(networkMode);
      return () => {};
    }, []),
  );

  const renderWalletItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={[appStyles.boxShadow, styles.walletContainer]}
        onPress={async () => {
          const wallet = {
            ...item,
            address: item?.wallet_address,
            userid: userInfo?.generated_Id,
            network_mode: selectedNetwork?.ID,
            Wallet_icon: selectedNetwork?.Wallet_icon,
          };
          dispatch(authAction.setWalletInfo(wallet));
          await setStorage(localStorageKey.walletInfo, JSON.stringify(wallet));
          setShowWallets(false);
        }}>
        <View style={styles.walletListLabelTopView}>
          <Text style={styles.walletListNameTxt}>{item?.wallet_name}</Text>
          <View style={styles.walletListLabelView}>
            <Text style={styles.walletListLabelTxt}>{item?.wallet_label}</Text>
          </View>
        </View>
        {item?.wallet_address && (
          <TouchableOpacity
            style={styles.addressView}
            onPress={() => {
              showToast({
                type: 'success',
                text1: 'Address Copied Successfully',
              });
              Clipboard.setString(item?.wallet_address);
            }}>
            <Text style={styles.walletAddressTxt}>{item?.wallet_address}</Text>
            <Ionicons name={'copy-outline'} size={16} color={'#7C8FAC'} />
          </TouchableOpacity>
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
    <View>
      <View style={styles.walletListView}>
        <View style={styles.leftList}>
          <FlatList
            data={networks}
            renderItem={renderNetworkItem}
            removeClippedSubviews={false}
            keyExtractor={(item, index) => 'key' + index}
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
              removeClippedSubviews={false}
              keyExtractor={(item, index) => 'key' + index}
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
                setShowWallets(false);
                dispatch(authAction.setHomeNewWallet(true));
                navigation.navigate('WALLET_STACK', {
                  screen: 'NEW_WALLET',
                  params: {
                    screen: 'NEW_WALLET_PASSWORD',
                    params: {walletNetwork: selectedNetwork},
                  },
                });
              }}>
              <Text style={styles.actionsheetTxt}>Create Wallet</Text>
            </TouchableOpacity>
            <View style={styles.actionSheetBorder} />
            <TouchableOpacity
              style={styles.actionSheetTouch}
              onPress={() => {
                setAddWalletVisible(false);
                setShowWallets(false);
                dispatch(authAction.setHomeNewWallet(true));
                navigation.navigate('WALLET_STACK', {
                  screen: 'IMPORT_WALLET',
                  params: {
                    screen: 'IMPORT_TYPE',
                    params: {walletNetwork: selectedNetwork},
                  },
                });
              }}>
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
    </View>
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
    zIndex: 1,
  },
  headerLeftIconTopView: {
    flex: 1,
    flexDirection: 'row',
    zIndex: 1,
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
  walletListLabelTopView: {
    flexDirection: 'row',
    flex: 1,
  },
  walletListLabelView: {
    marginLeft: 12,
    borderWidth: 1,
    borderRadius: 5,
    flex: 0.3,
    alignItems: 'center',
    borderColor: colors.gray_bg,
    justifyContent: 'center',
    paddingTop: 2,
    paddingBottom: 2,
  },
  walletListLabelTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    textAlign: 'center',
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

export default WalletComponent;
