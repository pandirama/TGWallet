import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {Ionicons} from '../utils/IconUtils';
import {colors} from '../utils/colors';
import WalletComponent from './WalletComponent';

const WalletListComponent = ({
  navigation,
  setShowWallets,
  showWallets,
  networkMode = '',
  networks,
}: any) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  useEffect(() => {
    if (showWallets) {
      actionSheetRef?.current?.show();
    } else {
      actionSheetRef?.current?.hide();
    }
  }, [showWallets]);

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
          <TouchableOpacity
            onPress={() => {
              actionSheetRef?.current?.hide();
              setShowWallets(false);
            }}>
            <Ionicons name={'search'} size={20} color={'#333333'} />
          </TouchableOpacity>
          <Text style={styles.actionTitleTxt}>Wallet List</Text>
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
      <WalletComponent
        navigation={navigation}
        showWallets={showWallets}
        setShowWallets={setShowWallets}
        networkMode={networkMode}
        networks={networks}
      />
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

export default WalletListComponent;
