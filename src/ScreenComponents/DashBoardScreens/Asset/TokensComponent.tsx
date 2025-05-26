/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
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
import {EvilIcons, Ionicons} from '../../../utils/IconUtils';
import {
  useAddTokenMutation,
  useRemoveTokenMutation,
  useTokenListMutation,
} from '../../../api/tokenAPI';
import useCommon from '../../../hooks/useCommon';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {getErrorMessage} from '../../../utils/common';
import FuzzySearch from 'fuzzy-search';

type Props = NativeStackScreenProps<any, 'TOKENS'>;

const TokensComponent = ({navigation}: Props) => {
  const {showToast, toggleBackdrop} = useCommon();

  const [searchTerm, setSearchTerm] = useState('');
  const [tokens, setTokens] = useState<any>(null);

  const {walletInfo = {}, userInfo = {}} = useSelector(
    ({authReducer}: any) => authReducer,
  );
  const {network_mode} = walletInfo ?? {};

  const [tokenList, {isLoading}] = useTokenListMutation();
  const [addToken, {isLoading: isAddLoading}] = useAddTokenMutation();
  const [removeToken, {isLoading: isRemoveLoading}] = useRemoveTokenMutation();

  useEffect(() => {
    toggleBackdrop(isLoading || isAddLoading || isRemoveLoading);
  }, [isLoading || isAddLoading || isRemoveLoading]);

  const getTokens = async () => {
    try {
      const params = {
        userid: userInfo?.generated_Id,
        networkid: network_mode,
        walletid: walletInfo?.wallet_id,
      };
      const response: any = await tokenList(params).unwrap();
      if (response?.success) {
        setTokens(response?.tokenlist);
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

  const fuzzySearch = (query: string, list: any) => {
    const searcher = new FuzzySearch(list, ['symbol','address']);
    return searcher.search(query);
  };

  const tokeLists = fuzzySearch(searchTerm, tokens);

  const addRemoveToken = async (token: any) => {
    try {
      const params = {
        userid: userInfo?.generated_Id,
        networkid: network_mode,
        walletid: walletInfo?.wallet_id,
        address: token?.address,
      };
      let response: any;
      if (token?.status === 1) {
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
            uri: item?.icon_url,
          }}
        />
        <View style={styles.nftNameView}>
          <Text style={styles.nftNameTxt}>{item?.symbol}</Text>
          <Text style={styles.nftValueTxt}>{item?.address}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            addRemoveToken(item);
          }}>
          <EvilIcons
            name={item?.status === 1 ? 'plus' : 'minus'}
            size={25}
            color={item?.status === 1 ? '#ED1C24' : '#7C8FAC'}
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <DashBoardHeaderComponent title={'Tokens'} />
          <View style={styles.walletContainer}>
            <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
              <TouchableOpacity
                style={styles.walletTouch}
                onPress={() =>
                  navigation.navigate('TOKENSTYPE', {
                    title: 'MY Tokens',
                    type: 'mytokens',
                  })
                }>
                <Text style={styles.walletTitleTxt}>MY Tokens</Text>
                <Ionicons
                  name={'chevron-forward'}
                  size={25}
                  color={colors.black}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <View style={styles.borderView} />
              <TouchableOpacity
                style={styles.walletTouch}
                onPress={() =>
                  navigation.navigate('TOKENSTYPE', {
                    title: 'Home Token',
                    type: 'hometokens',
                  })
                }>
                <Text style={styles.walletTitleTxt}>Home Token</Text>
                <Ionicons
                  name={'chevron-forward'}
                  size={25}
                  color={colors.black}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <View style={styles.borderView} />
              <TouchableOpacity
                style={styles.walletTouch}
                onPress={() => navigation.navigate('ADDTOKENS')}>
                <Text style={styles.walletTitleTxt}>Custom Token</Text>
                <Ionicons
                  name={'chevron-forward'}
                  size={25}
                  color={colors.black}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.networkTxt}>HOT Tokens</Text>
          <View
            style={[
              appStyles.boxShadow,
              styles.walletSubContainer,
              styles.walletSubContainer1,
            ]}>
            <FlatList
              data={tokeLists}
              renderItem={renderItem}
              ItemSeparatorComponent={() => {
                return <View style={styles.borderView} />;
              }}
              showsVerticalScrollIndicator={false}
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
              removeClippedSubviews={false}
              keyExtractor={(item, index) => 'key' + index}
            />
          </View>
        </KeyboardAvoidingView>
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
  },
  walletSubContainer1: {
    margin: 20,
    marginBottom: 5,
    flex: 1,
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
});

export default TokensComponent;
