/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import appStyles from '../../../../utils/appStyles';
import {colors} from '../../../../utils/colors';
import DashBoardHeaderComponent from '../../../../components/DashBoardHeaderComponent';
import {Feather, Ionicons, SimpleLineIcons} from '../../../../utils/IconUtils';
import {useAddressBookMutation} from '../../../../api/addressBookAPI';
import useCommon from '../../../../hooks/useCommon';
import {useFocusEffect} from '@react-navigation/native';
import {getErrorMessage} from '../../../../utils/common';
import {useSelector} from 'react-redux';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import Clipboard from '@react-native-clipboard/clipboard';

type Props = NativeStackScreenProps<any, 'ADDRESS_LIST'>;

const AddressBookComponent = ({navigation}: Props) => {
  const {showToast, toggleBackdrop} = useCommon();

  const actionSheetRef = useRef<ActionSheetRef>(null);

  const [networks, setNetworks] = useState<any>(null);
  const [wallets, setWallets] = useState<any>(null);
  const [selectedWallet, setSelectedWallet] = useState<any>('All Network');

  const [addressBook, {isLoading}] = useAddressBookMutation();

  const {userInfo = {}} = useSelector(({authReducer}: any) => authReducer);

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  const getAllAddressBook = async (networkID = '0') => {
    try {
      const params = {
        network: networkID,
        userid: userInfo?.generated_Id,
      };
      const response: any = await addressBook(params).unwrap();
      if (response?.success) {
        if (response?.walletbook?.wallet_info) {
          setWallets(response?.walletbook?.wallet_info);
        }
        if (response?.walletbook?.network_list && networkID === '0') {
          setNetworks(response?.walletbook?.network_list);
        }
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
      getAllAddressBook();
      return () => {};
    }, []),
  );

  const renderNetworkItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.walletTouch}
        onPress={() => {
          actionSheetRef?.current?.hide();
          // setSelectedNetwork(item?.ID);
          getAllAddressBook(item?.ID);
          setSelectedWallet(item?.Wallet_network);
        }}>
        <Image
          style={styles.itemLogo}
          source={{
            uri: item?.Wallet_icon,
          }}
        />
        <Text style={styles.walletTitleTxt}>{item?.Wallet_network}</Text>
      </TouchableOpacity>
    );
  };

  const renderWalletItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={[appStyles.boxShadow, styles.walletContainer]}
        onPress={() => {
          navigation.navigate('ADDRESS_INFO', {
            walletInfo: item,
            networks: networks?.filter((network: any) => {
              return network?.ID === item?.network_mode;
            })[0],
            allNetworks: networks,
          });
        }}>
        <View style={styles.walletView}>
          <Text style={styles.walletListNameTxt}>{item?.wallet_name}</Text>
          {item?.wallet_address && (
            <TouchableOpacity
              style={styles.walletAddressView}
              onPress={() => {
                showToast({
                  type: 'success',
                  text1: 'Address Copied Successfully',
                });
                Clipboard.setString(item?.wallet_address);
              }}>
              <Text style={styles.walletAddressTxt}>
                {item?.wallet_address}
              </Text>
              <Ionicons name={'copy-outline'} size={16} color={'#7C8FAC'} />
            </TouchableOpacity>
          )}
        </View>

        <Ionicons
          name={'chevron-forward'}
          size={22}
          color={colors.black}
          style={styles.icon}
        />
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
      <SafeAreaView style={appStyles.container}>
        <DashBoardHeaderComponent
          title={'Address Book'}
          rightIcon={
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ADD_ADDRESS', {
                  networks,
                });
              }}>
              <Feather
                name={'plus'}
                size={25}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
          }
        />
        <View style={styles.netwokView}>
          <TouchableOpacity
            style={styles.allNetworkTxt}
            onPress={() => actionSheetRef?.current?.show()}>
            <Text style={styles.modeTxt}>{selectedWallet}</Text>
            <Ionicons name={'chevron-down'} size={20} color={'#333333'} />
          </TouchableOpacity>
        </View>

        {wallets?.length === 0 ? (
          <View style={styles.addressView}>
            <SimpleLineIcons name={'notebook'} size={50} color={'#7C8FAC'} />

            <Text style={styles.informationTxt}>
              You haven’t added address information yet
            </Text>
            <TouchableOpacity
              style={[appStyles.boxShadow, styles.advancedTouch]}
              onPress={() => {
                navigation.navigate('ADD_ADDRESS', {
                  networks,
                });
              }}>
              <Text style={styles.advancedTxt}>Add Address</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={wallets}
            renderItem={renderWalletItem}
            removeClippedSubviews={false}
            keyExtractor={(item, index) => 'key' + index}
            contentContainerStyle={styles.walletContentList}
            showsVerticalScrollIndicator={false}
          />
        )}

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
              <Text style={styles.actionTitleTxt}>Choose a network</Text>
              <TouchableOpacity
                onPress={() => {
                  actionSheetRef?.current?.hide();
                }}>
                <Ionicons name={'close'} size={20} color={'#333333'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderView} />
          <FlatList
            data={networks}
            renderItem={renderNetworkItem}
            removeClippedSubviews={false}
            keyExtractor={(item, index) => 'key' + index}
            showsVerticalScrollIndicator={false}
          />
        </ActionSheet>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  netwokView: {
    marginLeft: 15,
  },
  allNetworkTxt: {
    flexDirection: 'row',
  },
  modeTxt: {
    color: '#7C8FAC',
    fontSize: 14,
    fontWeight: 600,
  },
  informationTxt: {
    color: '#7C8FAC',
    fontSize: 14,
    fontWeight: 400,
    marginTop: 15,
  },
  icon: {
    marginRight: 15,
    alignSelf: 'center',
  },
  addressView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  advancedTouch: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginTop: 15,
    width: '85%',
  },
  advancedTxt: {
    color: '#333333',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 15,
  },
  actionContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#EFF2F5',
    paddingBottom: 50,
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
  actionViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderView: {
    borderWidth: 1,
    borderColor: colors.gray1,
  },
  walletListView: {
    flexDirection: 'row',
    height: '100%',
  },
  walletContentList: {
    paddingBottom: 70,
  },
  itemLogo: {
    width: 30,
    height: 30,
  },
  walletTouch: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray1,
  },
  walletTitleTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    flex: 1,
    textAlignVertical: 'center',
    marginLeft: 8,
  },
  walletView: {
    flex: 1,
  },
  walletContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
  },
  walletAddressView: {
    flexDirection: 'row',
  },
  walletListNameTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    flex: 1,
    textAlignVertical: 'center',
    marginLeft: 12,
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
});

export default AddressBookComponent;
