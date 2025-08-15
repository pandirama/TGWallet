/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../../utils/appStyles';
import {colors} from '../../../../utils/colors';
import DashBoardHeaderComponent from '../../../../components/DashBoardHeaderComponent';
import WebView from 'react-native-webview';
import {Ionicons} from '../../../../utils/IconUtils';
import {useSelector} from 'react-redux';
import WalletListComponent from '../../../../components/WalletListComponent';
import { moderateScale } from 'react-native-size-matters';

type Props = NativeStackScreenProps<any, 'BUY'>;

const url = 'https://buy.transit.finance/ramp?locale=en&theme=light';

const BuyComponent = ({navigation, route}: Props) => {
  const {selectedNetworkMode, networks} = route?.params ?? {};

  const [showWallets, setShowWallets] = useState(false);
  const [walletIcon, setWalletIcon] = useState<any>(null);

  const {walletInfo = {}} = useSelector(({authReducer}: any) => authReducer);
  const {network_mode} = walletInfo ?? {};

  useEffect(() => {
    const networkIcon = networks?.filter((network: any) => {
      return network?.ID === network_mode;
    })?.[0]?.Wallet_icon;
    setWalletIcon(networkIcon);
  }, [walletInfo]);

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
        <DashBoardHeaderComponent
          title={'Buy'}
          rightIcon={
            <View style={styles.headerLeftIconTopView}>
              <TouchableOpacity
                style={styles.headerLeftIconView}
                onPress={() => {
                  setShowWallets(true);
                }}>
                <View style={styles.brandIcon}>
                  <Image
                    style={styles.walletItemLogo}
                    source={{
                      uri: walletIcon,
                    }}
                  />
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
          }
        />
        <WebView
          source={{uri: url}}
          originWhitelist={['*']}
          javaScriptEnabled={true}
          cacheEnabled={false}
          startInLoadingState={true}
        />
        <WalletListComponent
          navigation={navigation}
          showWallets={showWallets}
          setShowWallets={setShowWallets}
          networkMode={network_mode}
          selectedNetworkMode={selectedNetworkMode}
          networks={networks}
        />
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
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  walletSubContainer1: {
    margin: 20,
    marginBottom: 5,
    flex: 1,
  },
  walletTitleTxt: {
    fontSize: moderateScale(14),
    fontWeight: 600,
    color: '#333333',
    flex: 1,
    marginLeft: 8,
  },
  networkTxt: {
    fontSize: moderateScale(15),
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
    paddingBottom: 10,
    justifyContent: 'flex-end',
    marginRight: 20,
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
    backgroundColor: colors.white,
    borderRadius: 8, // Adjust the value to change the roundness
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.gray1,
    marginTop: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    color: colors.black,
  },
  nftNameTxt: {
    fontSize: moderateScale(12),
    fontWeight: 500,
    color: '#333333',
  },
  nftValueTxt: {
    fontSize: moderateScale(10),
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
    fontSize: moderateScale(14),
    fontWeight: 600,
    color: '#333333',
  },
  assetItemTxt: {
    fontSize: moderateScale(14),
    fontWeight: 600,
    color: '#7C8FAC',
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
    fontSize: moderateScale(14),
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
    fontSize: moderateScale(12),
    fontWeight: 400,
    color: '#7C8FAC',
    marginTop: 2,
  },
  balanceValTxt: {
    fontSize: moderateScale(18),
    fontWeight: 600,
    color: '#333333',
    marginTop: 2,
  },
  balanceUSDTxt: {
    fontSize: moderateScale(14),
    fontWeight: 600,
    color: '#7C8FAC',
    marginTop: 2,
  },
  inputTitleTxt: {
    fontSize: moderateScale(14),
    fontWeight: 400,
    color: '#333333',
    marginBottom: 1,
    marginTop: 20,
    marginLeft: 5,
    lineHeight: 20,
  },
  startedTouch: {
    width: '100%',
    marginTop: 8,
  },
  startedBtn: {
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '88%',
  },
  startedBtnTxt: {
    color: colors.white,
    fontSize: moderateScale(16),
    textAlign: 'center',
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 15,
  },
  bottomView: {
    marginBottom: 40,
  },
  walletCopyView: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width / 1.5,
  },
  walletCopyTxt: {
    fontSize: moderateScale(12),
    fontWeight: 400,
    color: '#333333',
    marginRight: 5,
    marginTop: 2,
  },
  headerLeftIconTopView: {
    flexDirection: 'row',
    marginRight: 10,
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
  walletItemLogo: {
    width: 28,
    height: 28,
    borderRadius: 100,
  },
});

export default BuyComponent;
