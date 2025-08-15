import { moderateScale } from 'react-native-size-matters';
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Image,
  ScrollView,
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
import useCommon from '../../../../hooks/useCommon';
import Clipboard from '@react-native-clipboard/clipboard';
import {useAddressBookInfoMutation} from '../../../../api/addressBookAPI';
import {getErrorMessage} from '../../../../utils/common';
import {useFocusEffect} from '@react-navigation/native';

type Props = NativeStackScreenProps<any, 'ADDRESS_INFO'>;

const AddressBookInfoComponent = ({navigation, route}: Props) => {
  const {walletInfo, networks, allNetworks} = route?.params ?? {};

  const {showToast, toggleBackdrop} = useCommon();

  const [singleWalletInfo, setSingleWalletInfo] = useState<any>(null);

  const [addressBookInfo, {isLoading}] = useAddressBookInfoMutation();

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  const getAddressBookInfo = async () => {
    try {
      const params = {
        contact_id: walletInfo?.Id,
      };
      const response: any = await addressBookInfo(params).unwrap();
      if (response?.success) {
        setSingleWalletInfo(response?.addressinfo);
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
      getAddressBookInfo();
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
      <SafeAreaView style={appStyles.container} edges={['right', 'left', 'top']}>
        <DashBoardHeaderComponent
          title={'Address Information'}
          rightIcon={
            <TouchableOpacity
              style={styles.editTouch}
              onPress={() => {
                navigation.navigate('EDIT_ADDRESS', {
                  networks,
                  walletInfo: singleWalletInfo,
                  allNetworks,
                });
              }}>
              <Text style={styles.editTxt}>Edit</Text>
            </TouchableOpacity>
          }
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            appStyles.scrollContainer,
            styles.scrollView,
          ]}>
          <View style={styles.topView}>
            <Text style={styles.inputTitleTxt}>Wallet Name</Text>
            <View style={styles.searchContainer}>
              {networks?.Wallet_icon && (
                <Image
                  style={styles.walletLogo}
                  source={{
                    uri: networks?.Wallet_icon,
                  }}
                />
              )}

              <Text style={styles.inputTxt}>{networks?.Wallet_network}</Text>
            </View>

            <Text style={styles.inputTitleTxt}>Wallet Address</Text>
            <View style={styles.searchContainer}>
              <Text style={styles.inputTxt}>
                {singleWalletInfo?.wallet_address}
              </Text>
              <TouchableOpacity
                style={styles.forwardBtn}
                onPress={() => {
                  showToast({
                    type: 'success',
                    text1: 'Address Copied Successfully',
                  });
                  Clipboard.setString(singleWalletInfo?.wallet_address);
                }}>
                <Ionicons name={'copy-outline'} size={16} color={'#7C8FAC'} />
              </TouchableOpacity>
            </View>
            <Text style={styles.inputTitleTxt}>Set Name</Text>
            <View style={styles.searchContainer}>
              <Text style={styles.inputTxt}>
                {singleWalletInfo?.wallet_name}
              </Text>
            </View>

            <Text style={styles.inputTitleTxt}>Note</Text>
            <View style={styles.searchContainer}>
              <Text style={styles.inputTxt}>
                {singleWalletInfo?.wallet_note}
              </Text>
            </View>
          </View>
        </ScrollView>
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
    fontSize: moderateScale(12),
    fontWeight: 400,
  },
  informationTxt: {
    color: '#7C8FAC',
    fontSize: moderateScale(14),
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
    fontSize: moderateScale(16),
    textAlign: 'center',
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 15,
  },
  scrollView: {
    flex: 1,
  },
  topView: {
    marginLeft: 16,
    marginRight: 16,
    flex: 1,
  },
  bottomView: {
    marginBottom: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8, // Adjust the value to change the roundness
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.gray1,
  },
  inputTxt: {
    flex: 1,
    paddingVertical: 13,
    fontSize: moderateScale(14),
    fontWeight: 400,
    color: '#333333',
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
  editTxt: {
    fontSize: moderateScale(14),
    fontWeight: 400,
    color: '#333333',
  },
  editTouch: {
    marginRight: 10,
    padding: 5,
  },
  forwardBtn: {
    padding: 5,
  },
  walletLogo: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
});

export default AddressBookInfoComponent;
