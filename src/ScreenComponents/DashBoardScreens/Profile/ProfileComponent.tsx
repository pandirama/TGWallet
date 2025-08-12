/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../utils/appStyles';
import {colors} from '../../../utils/colors';
import WalletNew from '../../../assets/wallet_new.svg';
import {Ionicons, SimpleLineIcons} from '../../../utils/IconUtils';
import WalletListComponent from '../../../components/WalletListComponent';
import {useGetNetworksQuery} from '../../../api/auth/authAPI';
import {useFocusEffect} from '@react-navigation/native';
import {getErrorMessage} from '../../../utils/common';
import useCommon from '../../../hooks/useCommon';
import {useSelector} from 'react-redux';

type Props = NativeStackScreenProps<any, 'PROFILE'>;

const ProfileComponent = ({navigation}: Props) => {
  const {showToast, toggleBackdrop} = useCommon();

  const {walletInfo = {}} = useSelector(({authReducer}: any) => authReducer);

  const {network_mode} = walletInfo ?? {};

  const [showWallets, setShowWallets] = useState(false);
  const [networks, setNetworks] = useState<any>([]);

  const {isFetching, refetch} = useGetNetworksQuery();

  useEffect(() => {
    toggleBackdrop(isFetching);
  }, [isFetching]);

  useEffect(() => {
    if (!showWallets) {
      navigation?.navigate('Asset');
    }
  }, [showWallets]);

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

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.white}
        animated
      />
      <SafeAreaView style={appStyles.container}>
        <View style={styles.headerView}>
          <Text style={styles.headerTxt}>Profile</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={appStyles.scrollContainer}>
          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <TouchableOpacity
              style={styles.walletTouch}
              onPress={() => {
                setShowWallets(true);
              }}>
              <WalletNew width={22} height={21} style={styles.walletIcon} />
              <Text style={styles.walletTitleTxt}>Manage Wallets</Text>
              <Ionicons
                name={'chevron-forward'}
                size={25}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <TouchableOpacity
              style={styles.walletTouch}
              onPress={() => navigation.navigate('ADDRESS_BOOK')}>
              <SimpleLineIcons
                name={'notebook'}
                size={24}
                color={'#333333'}
                style={styles.leftIcon}
              />
              <Text style={styles.walletTitleTxt}>Address Book</Text>
              <Ionicons
                name={'chevron-forward'}
                size={25}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <TouchableOpacity
              style={styles.walletTouch}
              onPress={() => navigation.navigate('SETTINGS')}>
              <Ionicons
                name={'settings-outline'}
                size={25}
                color={'#333333'}
                style={styles.leftIcon}
              />
              <Text style={styles.walletTitleTxt}>Settings</Text>
              <Ionicons
                name={'chevron-forward'}
                size={25}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <WalletListComponent
          navigation={navigation}
          showWallets={showWallets}
          setShowWallets={setShowWallets}
          networkMode={network_mode}
          networks={networks}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: colors.white,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTxt: {
    fontSize: 18,
    fontWeight: 600,
    color: '#333333',
    flex: 1,
    textAlign: 'center',
  },
  walletSubContainer: {
    backgroundColor: colors.white,
    borderRadius: 5,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 15,
  },
  walletIcon: {
    marginLeft: 15,
  },
  walletTitleTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    textAlignVertical: 'center',
    marginLeft: 8,
    flex: 1,
  },
  walletTouch: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
  },
  walletColor: {
    backgroundColor: '#F5B8BC',
  },
  walletPaddingTop: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  walletPaddgionBottom: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
  },
  icon: {
    marginRight: 15,
    alignSelf: 'center',
  },
  leftIcon: {
    marginLeft: 10,
    alignSelf: 'center',
  },
});

export default ProfileComponent;
