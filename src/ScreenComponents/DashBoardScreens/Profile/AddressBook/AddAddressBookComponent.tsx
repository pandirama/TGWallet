/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../../utils/appStyles';
import {colors} from '../../../../utils/colors';
import DashBoardHeaderComponent from '../../../../components/DashBoardHeaderComponent';
import {useAddAddressBookMutation} from '../../../../api/addressBookAPI';
import useCommon from '../../../../hooks/useCommon';
import {getErrorMessage} from '../../../../utils/common';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {Ionicons} from '../../../../utils/IconUtils';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Scan from '../../../../assets/scan.svg';
import { moderateScale } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<any, 'ADD_ADDRESS'>;

const AddAddressBookComponent = ({navigation,route}: Props) => {
  const {t} = useTranslation();
  const {networks} = route?.params ?? {};
  const {showToast, toggleBackdrop} = useCommon();

  const actionSheetRef = useRef<ActionSheetRef>(null);

  const [walletIcon, setWalletIcon] = useState(networks[0]?.Wallet_icon);
  const [selectedNetwork, setSelectedNetwork] = useState<any>(networks[0]?.ID);

  const [walletName, setWalletName] = useState(networks[0]?.Wallet_network);
  const [walletAddress, setWalletAddress] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputNote, setInputNote] = useState('');

  const walletNameFieldRef = useRef<TextInput>(null);
  const addressFieldRef = useRef<TextInput>(null);
  const inputNameFieldRef = useRef<TextInput>(null);

  const [addAddressBook, {isLoading}] = useAddAddressBookMutation();

  const {userInfo = {}} = useSelector(({authReducer}: any) => authReducer);

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  const addAddress = async () => {
    try {
      const params = {
        network: selectedNetwork,
        wallet_address: walletAddress,
        wallet_name: inputName,
        wallet_note: inputNote,
        userid: userInfo?.generated_Id,
      };

      const response: any = await addAddressBook(params).unwrap();
      if (response?.success) {
        showToast({
          type: 'success',
          text1: response?.message,
        });
        navigation?.goBack();
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

  const renderNetworkItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.walletTouch}
        onPress={() => {
          actionSheetRef?.current?.hide();
          setWalletName(item?.Wallet_network);
          setWalletIcon(item?.Wallet_icon);
          setSelectedNetwork(item?.ID);
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

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.background}
        animated
      />
      <SafeAreaView style={appStyles.container} edges={['right', 'left', 'top']}>
        <DashBoardHeaderComponent title={t('ADD_ADDRESS')} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            appStyles.scrollContainer,
            styles.scrollView,
          ]}>
          <View style={styles.topView}>
            <Text style={styles.inputTitleTxt}>{t('WALLET_NAME')}</Text>
            <View style={styles.searchContainer}>
              <TouchableOpacity
                onPress={() => {
                  actionSheetRef?.current?.show();
                }}
                style={styles.forwardBtn}>
                {walletIcon && (
                  <Image
                    style={styles.walletLogo}
                    source={{
                      uri: walletIcon,
                    }}
                  />
                )}
                <Text style={styles.input}>{walletName}</Text>
                <Ionicons
                  name={'chevron-forward'}
                  size={20}
                  color={'#7C8FAC'}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputTitleTxt}>{t('WALLET_ADDRESS')}</Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                placeholder={t('INPUT_ADDRESS')}
                placeholderTextColor="#9C9DA0"
                value={walletAddress}
                onChangeText={text => {
                  setWalletAddress(text);
                }}
                ref={walletNameFieldRef}
                returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                onSubmitEditing={() => addressFieldRef.current?.focus()}
              />
              <TouchableOpacity style={styles.forwardBtn}>
                <Scan width={20} height={20} />
              </TouchableOpacity>
            </View>
            <Text style={styles.inputTitleTxt}>{t('SET_NAME')}</Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                placeholder={t('INPUT_NAME')}
                placeholderTextColor="#9C9DA0"
                value={inputName}
                onChangeText={text => {
                  setInputName(text);
                }}
                ref={addressFieldRef}
                returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                onSubmitEditing={() => inputNameFieldRef.current?.focus()}
              />
            </View>

            <Text style={styles.inputTitleTxt}>{t('NOTE')}</Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                placeholder={t('INPUT_NOTE')}
                placeholderTextColor="#9C9DA0"
                value={inputNote}
                onChangeText={text => {
                  setInputNote(text);
                }}
                ref={inputNameFieldRef}
                returnKeyType={'done'}
              />
            </View>
          </View>
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={[styles.startedTouch]}
              onPress={addAddress}>
              <LinearGradient
                colors={['#6B121C', '#ED1C24']}
                style={styles.startedBtn}>
                <Text style={styles.startedBtnTxt}>{t('ADD')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
              <Text style={styles.actionTitleTxt}>{t('CHOOSE_A_NETWORK')}</Text>
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
    backgroundColor: colors.white,
    borderRadius: 8, // Adjust the value to change the roundness
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.gray1,
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    color: colors.black,
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
    fontSize: moderateScale(14),
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
  walletLogo: {
    width: 25,
    height: 25,
    marginRight: 5,
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
    fontSize: moderateScale(14),
    fontWeight: 400,
    color: '#333333',
    flex: 1,
    textAlignVertical: 'center',
    marginLeft: 8,
  },
  forwardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AddAddressBookComponent;
