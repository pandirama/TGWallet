/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../utils/appStyles';
import WalletNew from '../../../assets/wallet_new.svg';
import Search from '../../../assets/search.svg';
import {colors} from '../../../utils/colors';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import {ActionSheetRef} from 'react-native-actions-sheet';
import ActionsSheets from '../../../components/ActionsSheets';
import {useFocusEffect} from '@react-navigation/native';
import {useGetNetworksQuery} from '../../../api/auth/authAPI';
import useCommon from '../../../hooks/useCommon';
import {getErrorMessage} from '../../../utils/common';
import {Ionicons} from '../../../utils/IconUtils';

type Props = NativeStackScreenProps<any, 'SELECT_NETWORK'>;

const SelectNetworkComponent = ({navigation}: Props) => {
  const {showToast, toggleBackdrop} = useCommon();
  const [searchTerm, setSearchTerm] = useState('');
  const [networks, setNetworks] = useState<any>([]);
  const addActionSheetRef = useRef<ActionSheetRef>(null);

  const {isFetching, refetch} = useGetNetworksQuery();

  useEffect(() => {
    toggleBackdrop(isFetching);
  }, [isFetching]);

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

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.walletTouch}
        onPress={() =>
          navigation.navigate('NEW_WALLET', {
            walletNetwork: item,
          })
        }>
        <Image
          style={styles.itemLogo}
          source={{
            uri: item?.Wallet_icon,
          }}
        />

        <Text style={styles.walletTitleTxt}>{item?.Wallet_network}</Text>
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
        <DashBoardHeaderComponent title={'Select Network'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={appStyles.scrollContainer}>
          <View style={styles.walletContainer}>
            <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
              <TouchableOpacity
                style={styles.walletTouch}
                onPress={() => addActionSheetRef?.current?.show()}>
                <WalletNew width={22} height={21} />
                <Text style={styles.walletTitleTxt}>HD Wallet</Text>
                <Ionicons
                  name={'chevron-forward'}
                  size={22}
                  color={colors.black}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <View style={styles.borderView} />
              <TouchableOpacity
                style={styles.walletTouch}
                onPress={() => addActionSheetRef?.current?.show()}>
                <WalletNew width={22} height={21} />
                <Text style={styles.walletTitleTxt}>MultiSig Wallet</Text>
                <Ionicons
                  name={'chevron-forward'}
                  size={22}
                  color={colors.black}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <View style={styles.borderView} />
              <TouchableOpacity
                style={styles.walletTouch}
                onPress={() => addActionSheetRef?.current?.show()}>
                <WalletNew width={22} height={21} />
                <Text style={styles.walletTitleTxt}>Hardware</Text>
                <Ionicons
                  name={'chevron-forward'}
                  size={22}
                  color={colors.black}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.networkTxt}>Single Network</Text>
          <View
            style={[
              appStyles.boxShadow,
              styles.walletSubContainer,
              styles.walletSubContainer1,
            ]}>
            <FlatList
              nestedScrollEnabled
              data={networks}
              renderItem={renderItem}
              ItemSeparatorComponent={() => {
                return <View style={styles.borderView} />;
              }}
              keyExtractor={(item: any) => item?._id}
              ListHeaderComponent={
                <View style={styles.searchView}>
                  <View style={styles.searchContainer}>
                    <Search width={25} height={25} />
                    <TextInput
                      style={styles.input}
                      placeholder="Search"
                      placeholderTextColor="#A9A9A9"
                      value={searchTerm}
                      onChangeText={text => setSearchTerm(text)}
                    />
                  </View>
                </View>
              }
            />
          </View>
        </ScrollView>

        <ActionsSheets
          actionSheetRef={addActionSheetRef}
          titleTxt={'Add Wallet'}>
          <View style={styles.deleteDialogContentAction}>
            <View style={[appStyles.boxShadow, styles.actionsheetView]}>
              <TouchableOpacity
                style={styles.actionSheetTouch}
                onPress={() => {
                  addActionSheetRef?.current?.hide();
                  navigation.navigate('SINGLE_NETWORK');
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
              onPress={() => addActionSheetRef?.current?.hide()}>
              <Text style={styles.cancelTxt}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ActionsSheets>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  walletContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  walletSubContainer: {
    backgroundColor: colors.white,
    paddingLeft: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  walletSubContainer1: {
    margin: 20,
  },
  walletTitleTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    flex: 1,
    textAlignVertical: 'center',
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
  networkTitleTxt: {
    fontSize: 12,
    fontWeight: 400,
    color: '#333333',
    flex: 1,
    textAlignVertical: 'center',
    marginLeft: 8,
  },
  icon: {
    marginRight: 15,
    alignSelf: 'center',
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
  addWalletTxt: {
    textAlign: 'center',
    fontSize: 18,
  },
  deleteDialogContentAction: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  actionsheetView: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 10,
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
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: 40,
  },
  itemLogo: {
    width: 30,
    height: 30,
  },
});

export default SelectNetworkComponent;
