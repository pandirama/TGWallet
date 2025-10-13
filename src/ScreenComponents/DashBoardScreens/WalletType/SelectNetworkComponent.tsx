/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback, useEffect, useState} from 'react';
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
import {useFocusEffect} from '@react-navigation/native';
import {useGetNetworksQuery} from '../../../api/auth/authAPI';
import useCommon from '../../../hooks/useCommon';
import {getErrorMessage} from '../../../utils/common';
import {Ionicons} from '../../../utils/IconUtils';
import {useAppDispatch} from '../../../store';
import {authAction} from '../../../reducer/auth/authSlice';
import FuzzySearch from 'fuzzy-search';
import { moderateScale, scale } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<any, 'SELECT_NETWORK'>;

const SelectNetworkComponent = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  const {fromImport} = route?.params ?? {};
  const {showToast, toggleBackdrop} = useCommon();
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [networks, setNetworks] = useState<any>([]);

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
        onPress={() => {
          dispatch(authAction.setWalletType('SingleNetwork'));
          if (fromImport) {
            navigation.navigate('IMPORT_WALLET', {
              screen: 'IMPORT_TYPE',
              params: {walletNetwork: item},
            });
          } else {
            navigation.navigate('NEW_WALLET', {
              screen: 'NEW_WALLET_PASSWORD',
              params: {walletNetwork: item},
            });
          }
        }}>
        <Image
          style={styles.itemLogo}
          source={{
            uri: item?.Wallet_icon,
          }}
        />

        <Text style={styles.walletTitleTxt}>{item?.Wallet_network}</Text>
        <Ionicons
          name={'chevron-forward'}
          size={scale(15)}
          color={colors.black}
          style={styles.icon}
        />
      </TouchableOpacity>
    );
  };

  const fuzzySearch = (query: string, list: any) => {
    const searcher = new FuzzySearch(list, ['Wallet_network']);
    return searcher.search(query);
  };

  const networkLists = fuzzySearch(searchTerm, networks);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.background}
        animated
      />
      <SafeAreaView style={appStyles.container} edges={['right', 'left', 'top']}>
        <DashBoardHeaderComponent title={t('SELECT_NETWORK')} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={appStyles.scrollContainer}>
          <View style={styles.walletContainer}>
            <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
              <TouchableOpacity
                style={styles.walletTouch}
                onPress={() => {
                  dispatch(authAction.setWalletType('HDWallet'));
                  if (fromImport) {
                    navigation.navigate('IMPORT_WALLET', {
                      screen: 'IMPORT_TYPE',
                      params: {
                        walletNetwork: {
                          ID: 0,
                          Wallet_network: 'HD',
                        },
                      },
                    });
                  } else {
                    navigation.navigate('NEW_WALLET', {
                      screen: 'NEW_WALLET_PASSWORD',
                      params: {
                        walletNetwork: {
                          ID: 0,
                          Wallet_network: 'HD',
                        },
                      },
                    });
                  }
                }}>
                <WalletNew width={scale(21)} height={scale(20)} />
                <Text style={styles.walletTitleTxt}>{t('HD_WALLET')}</Text>
                <Ionicons
                  name={'chevron-forward'}
                  size={scale(15)}
                  color={colors.black}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.networkTxt}>{t('SINGLE_NETWORK')}</Text>
          <View
            style={[
              appStyles.boxShadow,
              styles.walletSubContainer,
              styles.walletSubContainer1,
            ]}>
            <FlatList
              nestedScrollEnabled
              data={networkLists}
              renderItem={renderItem}
              ItemSeparatorComponent={() => {
                return <View style={styles.borderView} />;
              }}
              removeClippedSubviews={false}
              keyExtractor={(item, index) => 'key' + index}
              ListHeaderComponent={
                <View style={styles.searchView}>
                  <View style={styles.searchContainer}>
                    <Search width={scale(20)} height={scale(20)} />
                    <TextInput
                      style={styles.input}
                      placeholder={t('SEARCH')}
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
    fontSize: moderateScale(14),
    fontWeight: 400,
    color: '#333333',
    flex: 1,
    textAlignVertical: 'center',
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
  networkTitleTxt: {
    fontSize: moderateScale(12),
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
    paddingHorizontal: moderateScale(10),
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray1,
  },
  input: {
    flex: 1,
    paddingVertical: moderateScale(10),
    color: colors.black,
    fontSize: moderateScale(14),
  },
  addWalletTxt: {
    textAlign: 'center',
    fontSize: moderateScale(18),
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
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: 40,
  },
  itemLogo: {
    width: scale(25),
    height: scale(25),
  },
});

export default SelectNetworkComponent;
