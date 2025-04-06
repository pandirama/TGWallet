/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../utils/appStyles';
import Search from '../../../assets/search.svg';
import {colors} from '../../../utils/colors';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import {useFocusEffect} from '@react-navigation/native';
import {
  useGetNetworksQuery,
  useHDWalletCreateMutation,
} from '../../../api/auth/authAPI';
import useCommon from '../../../hooks/useCommon';
import {getErrorMessage, localStorageKey, setStorage} from '../../../utils/common';
import {useAppDispatch} from '../../../store';
import {authAction} from '../../../reducer/auth/authSlice';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

type Props = NativeStackScreenProps<any, 'HD_WALLET'>;

const HDWalletComponent = ({navigation}: Props) => {
  const {showToast, toggleBackdrop} = useCommon();
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [networks, setNetworks] = useState<any>([]);
  const [isChecked, setIsChecked] = useState<string[]>([]);

  const {isFetching, refetch} = useGetNetworksQuery();

  const [HDWalletCreate, {isLoading}] = useHDWalletCreateMutation();

  const {userInfo = {}, isHomeNewWallet} = useSelector(({authReducer}: any) => authReducer);

  useEffect(() => {
    toggleBackdrop(isFetching || isLoading);
  }, [isFetching || isLoading]);

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

  const onCheckChange = (ID: any) => {
    const checkedIds: any[] = [...isChecked];
    const index = checkedIds.findIndex((feat: any) => feat === ID);
    if (index > -1) {
      checkedIds?.splice(index, 1);
    } else {
      checkedIds.push(ID);
    }
    setIsChecked(checkedIds);
  };

  const renderItem = ({item}: any) => {
    const labelIndex = isChecked?.findIndex((feat: any) => feat === item.ID);
    return (
      <TouchableOpacity
        style={styles.walletTouch}
        onPress={() => {
          dispatch(authAction.setWalletType('SingleNetwork'));
        }}>
        <Image
          style={styles.itemLogo}
          source={{
            uri: item?.Wallet_icon,
          }}
        />

        <Text style={styles.walletTitleTxt}>{item?.Wallet_network}</Text>
        <BouncyCheckbox
          isChecked={labelIndex > -1}
          disableText
          size={20}
          fillColor="#0054A6"
          unFillColor="#FFFFFF"
          innerIconStyle={{borderWidth: 1}}
          onPress={() => {
            onCheckChange(item?.ID);
          }}
          style={styles.icon}
        />
      </TouchableOpacity>
    );
  };

  const onSubmit = async () => {
    try {
      const payload = {
        userid: userInfo?.generated_Id,
        network: isChecked,
      };
      const response: any = await HDWalletCreate(payload).unwrap();

      if (response?.success) {
        dispatch(authAction.setWalletInfo(response?.walletinfo));
        await setStorage(
          localStorageKey.walletInfo,
          JSON.stringify(response?.walletinfo),
        );
        if (isHomeNewWallet) {
          dispatch(authAction.setHomeNewWallet(false));
          navigation.navigate('DASH_BOARD', {
            screen: 'Asset',
          });
          navigation.replace('DASH_BOARD');
        } else {
          dispatch(authAction.setAuthenticated(true));
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
        <Text style={styles.networkTxt}>Single Network</Text>
        <View
          style={[
            appStyles.boxShadow,
            styles.walletSubContainer,
            styles.walletSubContainer1,
          ]}>
          <FlatList
            data={networks}
            renderItem={renderItem}
            ItemSeparatorComponent={() => {
              return <View style={styles.borderView} />;
            }}
            removeClippedSubviews={false}
            keyExtractor={(item, index) => 'key' + index}
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
        <TouchableOpacity style={styles.startedTouch} onPress={onSubmit}>
          <LinearGradient
            colors={['#6B121C', '#ED1C24']}
            style={styles.startedBtn}>
            <Text style={styles.startedBtnTxt}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
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
  startedTouch: {
    width: '100%',
    marginBottom: 30,
  },
  startedBtn: {
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '88%',
  },
  startedBtnTxt: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 15,
  },
});

export default HDWalletComponent;
