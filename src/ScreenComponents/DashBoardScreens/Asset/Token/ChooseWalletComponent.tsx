/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {Ionicons} from '../../../../utils/IconUtils';
import {colors} from '../../../../utils/colors';
import useCommon from '../../../../hooks/useCommon';
import Clipboard from '@react-native-clipboard/clipboard';
import appStyles from '../../../../utils/appStyles';
import { moderateScale } from 'react-native-size-matters';

const ChooseWalletComponent = ({
  setShowWallets,
  showWallets,
  chooseWallets,
}: any) => {
  const {showToast} = useCommon();
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const [selectedWalletType, setSelectedWalletType] = useState<any>('recent');

  useEffect(() => {
    if (showWallets) {
      actionSheetRef?.current?.show();
    } else {
      actionSheetRef?.current?.hide();
    }
  }, [showWallets]);

  const onChooseWallet = (type: string) => {
    setSelectedWalletType(type);
  };

  const renderAssets = ({item}: any) => {
    if (selectedWalletType === 'recent') {
      // const address = item?.type === 'in' ? item?.from : item?.to;
      // return (
      //   <View
      //     style={{
      //       backgroundColor: colors.white,
      //       paddingLeft: 15,
      //       paddingRight: 15,
      //       paddingTop: 20,
      //       paddingBottom: 20,
      //       flexDirection: 'row',
      //       alignItems: 'center',
      //     }}>
      //     <View
      //       style={{
      //         backgroundColor: item?.type === 'in' ? 'green' : 'red',
      //         padding: 5,
      //         borderRadius: 100,
      //       }}>
      //       <Feather
      //         name={item?.type === 'in' ? 'arrow-down-left' : 'arrow-up-right'}
      //         size={20}
      //         color={'#FFFFFF'}
      //       />
      //     </View>

      //     <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
      //       <View style={{flexDirection: 'row', alignItems: 'center'}}>
      //         <Text style={styles.itemTitleTxt} numberOfLines={1}>
      //           {address}
      //         </Text>
      //         <TouchableOpacity
      //           onPress={() => {
      //             showToast({
      //               type: 'success',
      //               text1: 'Address Copied Successfully',
      //             });
      //             Clipboard.setString(address);
      //           }}>
      //           <Ionicons name={'copy-outline'} size={16} color={'#7C8FAC'} />
      //         </TouchableOpacity>
      //       </View>
      //       <Text style={styles.itemSubTxt}>{item?.time}</Text>
      //     </View>
      //     <Text style={styles.itemSubValueTxt}>{item?.value}</Text>
      //   </View>
      // );
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
    } else if (selectedWalletType === 'wallet') {
      return (
        <TouchableOpacity
          style={[
            appStyles.boxShadow,
            {
              backgroundColor: colors.white,
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 10,
              paddingRight: 10,
              marginLeft: 10,
              marginRight: 10,
              flexDirection: 'row',
              borderRadius: 8,
              alignItems: 'center',
            },
          ]}>
          <Image
            style={styles.walletItemLogo}
            source={{
              uri: item?.Wallet_icon,
            }}
          />
          <View style={{marginLeft: 10}}>
            <Text style={styles.walletNameTxt}>{item?.wallet_name}</Text>
            <View style={styles.walletCopyView}>
              <Text style={styles.walletCopyTxt}>{item?.wallet_address}</Text>
              <TouchableOpacity
                onPress={() => {
                  showToast({
                    type: 'success',
                    text1: 'Address Copied Successfully',
                  });
                  Clipboard.setString(item?.wallet_address);
                }}>
                <Ionicons name={'copy-outline'} size={16} color={'#333333'} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
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
    if (selectedWalletType === 'recent') {
      return chooseWallets?.recents;
    } else if (selectedWalletType === 'wallet') {
      return chooseWallets?.wallets;
    } else if (selectedWalletType === 'address') {
      return chooseWallets?.addressbook;
    }
    return [];
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      containerStyle={styles.actionContainer}
      closeOnPressBack={false}
      closeOnTouchBackdrop={false}
      onClose={() => {
        actionSheetRef?.current?.hide();
        setShowWallets(false);
      }}>
      <View style={styles.actionViewContainer}>
        <View style={styles.actionTitleView}>
          <Text style={styles.actionTitleTxt}>Choose a Wallet</Text>
          <TouchableOpacity
            onPress={() => {
              actionSheetRef?.current?.hide();
              setShowWallets(false);
            }}>
            <Ionicons name={'close'} size={20} color={'#333333'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.borderView} />
      <View style={styles.walletListView}>
        <TouchableOpacity
          style={[
            styles.touch,
            selectedWalletType === 'recent' && styles.selectedTouch,
          ]}
          onPress={() => {
            onChooseWallet('recent');
          }}>
          <Text
            style={[
              styles.walletBalanceTxt,
              selectedWalletType === 'recent' && styles.selectWalletBalanceTxt,
            ]}>
            Recent Transfer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.touch,
            selectedWalletType === 'wallet' && styles.selectedTouch,
          ]}
          onPress={() => {
            onChooseWallet('wallet');
          }}>
          <Text
            style={[
              styles.walletBalanceTxt,
              selectedWalletType === 'wallet' && styles.selectWalletBalanceTxt,
            ]}>
            Wallet List
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.touch,
            selectedWalletType === 'address' && styles.selectedTouch,
          ]}
          onPress={() => {
            onChooseWallet('address');
          }}>
          <Text
            style={[
              styles.walletBalanceTxt,
              selectedWalletType === 'address' && styles.selectWalletBalanceTxt,
            ]}>
            Address Book
          </Text>
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
      {/* {selectedWalletType === 'wallet' && (
        <WalletComponent
          navigation={navigation}
          showWallets={showWallets}
          setShowWallets={setShowWallets}
          networkMode={networkMode}
          selectedNetworkMode={selectedNetworkMode}
          networks={networks}
        />
      )}
      {selectedWalletType === 'address' && (
        <WalletComponent
          navigation={navigation}
          setShowWallets={setShowWallets}
          networkMode={networkMode}
          selectedNetworkMode={selectedNetworkMode}
          networks={networks}
        />
      )} */}
    </ActionSheet>
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
    fontSize: moderateScale(18),
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
    fontSize: moderateScale(14),
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
    fontSize: moderateScale(14),
    fontWeight: 400,
    color: '#333333',
    textAlign: 'center',
  },
  menuAmountTxt: {
    fontSize: moderateScale(28),
    fontWeight: 700,
    color: '#FFFFFF',
    marginRight: 5,
    marginLeft: 5,
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
    backgroundColor: '#FFF',
  },
  actionContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#EFF2F5',
    height: '90%',
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
    fontSize: moderateScale(14),
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
    fontSize: moderateScale(14),
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
    fontSize: moderateScale(14),
    fontWeight: 400,
    color: '#333333',
    textAlign: 'center',
  },
  addressView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletAddressTxt: {
    fontSize: moderateScale(10),
    fontWeight: 400,
    color: '#7C8FAC',
    textAlignVertical: 'center',
    marginLeft: 12,
    marginTop: 3,
    marginRight: 5,
  },
  walletBalanceTxt: {
    fontSize: moderateScale(14),
    fontWeight: 500,
    color: '#7C8FAC',
    textAlign: 'center',
  },
  selectWalletBalanceTxt: {
    color: '#333333',
  },
  touch: {
    flex: 1,
    borderRadius: 42,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTouch: {
    backgroundColor: '#FFF',
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
    marginTop: 20,
    backgroundColor: '#EFF2F5',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
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
    fontSize: moderateScale(14),
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
    fontSize: moderateScale(14),
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
    fontSize: moderateScale(16),
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
    fontSize: moderateScale(14),
    color: '#333333',
    flex: 1,
    textAlign: 'center',
    fontWeight: 700,
  },
  closeTouch: {
    padding: 5,
  },
  itemTitleTxt: {
    fontSize: moderateScale(16),
    flex: 0.15,
    fontWeight: 800,
    color: '#33333',
  },
  itemSubTxt: {
    fontSize: moderateScale(14),
    fontWeight: 400,
    flex: 1,
    color: '#333333',
  },
  walletItemLogo: {
    width: 32,
    height: 32,
    borderRadius: 100,
  },
  walletCopyView: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width / 1.4,
    marginTop: 5,
  },
  walletCopyTxt: {
    fontSize: moderateScale(12),
    fontWeight: 400,
    color: '#333333',
    marginRight: 5,
    marginTop: 2,
  },
  walletNameTxt: {
    fontSize: moderateScale(14),
    fontWeight: 400,
    color: '#333333',
  },
});

export default ChooseWalletComponent;
