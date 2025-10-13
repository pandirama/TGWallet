/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback, useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
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
import appStyles from '../../../utils/appStyles';
import {colors} from '../../../utils/colors';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import {EvilIcons} from '../../../utils/IconUtils';
import useCommon from '../../../hooks/useCommon';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {getErrorMessage} from '../../../utils/common';
import {
  useAddTokenMutation,
  useHomeTokenMutation,
  useMyTokenMutation,
  useRemoveTokenMutation,
} from '../../../api/tokenAPI';
import { moderateScale } from 'react-native-size-matters';

type Props = NativeStackScreenProps<any, 'TOKENSTYPE'>;

const TokenTypeComponent = ({route}: Props) => {
  const { t } = useTranslation();
  const {title, type} = route?.params ?? {};

  const {showToast, toggleBackdrop} = useCommon();

  const [tokens, setTokens] = useState<any>(null);

  const {walletInfo = {}, userInfo = {}} = useSelector(
    ({authReducer}: any) => authReducer,
  );
  const {network_mode} = walletInfo ?? {};

  const [myToken, {isLoading}] = useMyTokenMutation();
  const [homeToken, {isLoading: isHomeLoading}] = useHomeTokenMutation();
  const [addToken, {isLoading: isAddLoading}] = useAddTokenMutation();
  const [removeToken, {isLoading: isRemoveLoading}] = useRemoveTokenMutation();

  useEffect(() => {
    toggleBackdrop(
      isLoading || isHomeLoading || isAddLoading || isRemoveLoading,
    );
  }, [isLoading || isHomeLoading || isAddLoading || isRemoveLoading]);

  const getTokens = async () => {
    try {
      const params = {
        userid: userInfo?.generated_Id,
        networkid: network_mode,
        walletid: walletInfo?.wallet_id,
      };
      let response: any;
      if (type === 'mytokens') {
        response = await myToken(params).unwrap();
      } else if (type === 'hometokens') {
        response = await homeToken(params).unwrap();
      }
      if (response?.success) {
        setTokens(response?.tokens);
      } else {
        setTokens([]);
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
      getTokens();
      return () => {};
    }, []),
  );

  const addRemoveToken = async (token: any) => {
    try {
      const params = {
        userid: userInfo?.generated_Id,
        networkid: network_mode,
        walletid: walletInfo?.wallet_id,
        address: token?.tokenAddress,
      };
      let response: any;
      if (token?.status?.toString() === '1') {
        response = await addToken(params).unwrap();
      } else {
        response = await removeToken(params).unwrap();
      }

      if (response?.success) {
        getTokens();
        showToast({
          type: 'success',
          text1: response?.message,
        });
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

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity style={styles.walletTouch}>
        <Image
          style={{width: 30, height: 30, borderRadius: 100}}
          source={{
            uri: item?.tokenImage,
          }}
        />
        <View style={styles.nftNameView}>
          <Text style={styles.nftNameTxt}>{item?.token_symbol}</Text>
          <Text style={styles.nftValueTxt}>{item?.tokenAddress}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            addRemoveToken(item);
          }}>
          <EvilIcons
            name={item?.status?.toString() === '1' ? 'plus' : 'minus'}
            size={25}
            color={item?.status?.toString() === '1' ? '#ED1C24' : '#7C8FAC'}
            style={styles.icon}
          />
        </TouchableOpacity>
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
      <SafeAreaView
        style={appStyles.container}
        edges={['right', 'left', 'top']}>
        <DashBoardHeaderComponent title={title} />
        <View style={styles.walletContainer}>
          <Text style={styles.networkTxt}>{t('ASSET_LIST')}</Text>
          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <FlatList
              data={tokens}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => {
                return <View style={styles.borderView} />;
              }}
              removeClippedSubviews={false}
              keyExtractor={(item, index) => 'key' + index}
            />
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
    paddingLeft: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 155,
  },
  walletTitleTxt: {
    fontSize: moderateScale(14),
    fontWeight: 400,
    color: '#333333',
    textAlignVertical: 'center',
    marginLeft: 8,
  },
  networkTxt: {
    fontSize: moderateScale(15),
    fontWeight: 600,
    color: '#333333',
    textAlignVertical: 'center',
    marginLeft: 5,
    marginTop: 25,
  },
  icon: {
    marginRight: 10,
    padding: 5,
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
  nftNameView: {
    flex: 1,
    marginLeft: 10,
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
  nftBalanceTxt: {
    fontSize: moderateScale(10),
    fontWeight: 400,
    color: '#333333',
  },
});

export default TokenTypeComponent;
