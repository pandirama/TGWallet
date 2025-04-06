/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
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
import {Ionicons} from '../../../../utils/IconUtils';
import {useSelector} from 'react-redux';
import useCommon from '../../../../hooks/useCommon';
import {useReceiveWalletMutation} from '../../../../api/walletAPI';
import {useFocusEffect} from '@react-navigation/native';
import {getErrorMessage} from '../../../../utils/common';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';

type Props = NativeStackScreenProps<any, 'RECEIVE'>;

const ReceiveComponent = ({}: Props) => {
  const {showToast, toggleBackdrop} = useCommon();
  const {walletInfo = {}, userInfo = {}} = useSelector(
    ({authReducer}: any) => authReducer,
  );

  const [receiveWalletInfo, setReceiveWalletInfo] = useState<any>(null);

  const [receiveWallet, {isLoading}] = useReceiveWalletMutation();

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  const getWalletInfos = async () => {
    try {
      const params = {
        wallet_id: walletInfo?.wallet_id,
        userid: userInfo?.generated_Id,
      };
      const response: any = await receiveWallet(params).unwrap();
      if (response?.success) {
        setReceiveWalletInfo(response);
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
      getWalletInfos();
      return () => {};
    }, []),
  );

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
        <DashBoardHeaderComponent title={'Receive'} />
        <View style={{backgroundColor: '#FDEDED', borderRadius: 8, margin: 20}}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 400,
              color: '#D32F2F',
              paddingTop: 10,
              paddingBottom: 10,
              textAlign: 'center',
            }}>
            This address only supports BSC/NEP20 related assets
          </Text>
        </View>

        <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
          <QRCode value={receiveWalletInfo?.wallet_qrcode} size={170} />
          <Text
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: '#7C8FAC',
              marginTop: 25,
            }}>
            Receiving Address
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 400,
              color: '#333333',
              marginTop: 5,
              textAlign: 'center',
              marginBottom: 20,
              marginLeft: 10,
              marginRight: 10,
            }}>
            {receiveWalletInfo?.wallet_address}
          </Text>
          <View style={styles.shareView}>
            <TouchableOpacity
              style={styles.shareTouch}
              onPress={() => {
                showToast({
                  type: 'success',
                  text1: 'Address Copied Successfully',
                });
                Clipboard.setString(receiveWalletInfo?.wallet_address);
              }}>
              <Ionicons name={'copy-outline'} size={20} color={'#7C8FAC'} />
              <Text style={styles.shareTxt}>Copy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareTouch}>
              <Ionicons name={'share-outline'} size={20} color={'#7C8FAC'} />
              <Text style={styles.shareTxt}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    borderRadius: 20,
    marginTop: 20,
    marginRight: 25,
    marginLeft: 25,
    alignItems: 'center',
    paddingTop: 30,
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
  shareView: {
    flexDirection: 'row',
    borderTopColor: colors.gray1,
    borderTopWidth: 1,
    width: '100%',
  },
  shareTouch: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  shareTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    marginLeft: 10,
  },
});

export default ReceiveComponent;
