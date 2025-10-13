/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useConfirmSwapMutation,
  useSwapDetailMutation,
  useSwapMutation,
} from '../../../../api/marketAPI';
import {Ionicons, MaterialIcons} from '../../../../utils/IconUtils';
import appStyles from '../../../../utils/appStyles';
import useCommon from '../../../../hooks/useCommon';
import {colors} from '../../../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {Switch} from 'react-native-paper';
import {getErrorMessage} from '../../../../utils/common';
import { moderateScale } from 'react-native-size-matters';

const titles = [
  {label: '0.3%', value: 0.3},
  {label: '1%', value: 1},
  {label: '2%', value: 2},
  {label: '5%', value: 5},
  {label: 'Custom', value: ''},
];

const SwapBridgeComponent = ({setShowWallets, walletInfo}: any) => {
  const {showToast, toggleBackdrop} = useCommon();
  const { t } = useTranslation();

  const actionSheetRef = useRef<ActionSheetRef>(null);
  const swapSheetRef = useRef<ActionSheetRef>(null);
  const routeSheetRef = useRef<ActionSheetRef>(null);

  const [fromAmount, setFromAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [activeTab, setActiveTab] = useState({label: '0.3%', value: 0.3});
  const [isAddress, setIsAddress] = useState(false);
  const [swapData, setSwapData] = useState<any>(null);
  const [swapIcon, setSwapIcon] = useState<any>(null);
  const [showSwap, setShowSwap] = useState('');
  const [selectedSwapNetwork, setSelectedSwapNetwork] = useState<any>([]);
  const [selectedSwap, setSelectedSwap] = useState(null);
  const [swapDataDetail, setSwapDatDetail] = useState<any>(null);
  const [swapRoute, setSwapRoute] = useState<any>(null);

  const [swap, {isLoading: isSwapLoading}] = useSwapMutation();
  const [swapDetail, {isLoading}] = useSwapDetailMutation();
  const [confirmSwap, {isLoading: isConfirmSwapLoading}] =
    useConfirmSwapMutation();

  useEffect(() => {
    toggleBackdrop(isSwapLoading || isLoading || isConfirmSwapLoading);
  }, [isSwapLoading || isLoading || isConfirmSwapLoading]);

  const getSwap = async () => {
    try {
      const params = {
        userid: walletInfo?.userid,
        networkid: walletInfo?.network_mode,
        walletid: walletInfo?.wallet_id,
      };
      const response: any = await swap(params).unwrap();
      if (response?.success) {
        const {selected, tokenlist, walletaddress, icon} = response?.data ?? {};
        const dataArray = Object.keys(icon).map(key => ({
          id: key,
          icon_url: icon[key],
          icon_txt: '',
        }));
        dataArray.unshift({id: 'all', icon_txt: 'All', icon_url: ''});
        setSwapData(response?.data);
        setSelectedSwapNetwork(selected);
        setSwapIcon(dataArray);
        setSelectedSwap(tokenlist);
        setWalletAddress(walletaddress);
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

  const getSwapDetail = async () => {
    if (selectedSwapNetwork?.length >= 2 && fromAmount !== '') {
      const payload = {
        amount: parseInt(fromAmount, 10),
        slippage:
          activeTab?.label === 'Custom'
            ? parseInt(customAmount, 10)
            : activeTab?.value,
        blockchainid: selectedSwapNetwork[0].blockchainid,
        fromaddress: selectedSwapNetwork[0].address,
        toaddress: selectedSwapNetwork[1].address,
        fromtokenid: selectedSwapNetwork[0].tokenid,
        totokenid: selectedSwapNetwork[1].tokenid,
        fromns: selectedSwapNetwork[0].ns,
        tons: selectedSwapNetwork[1].ns,
        fromchainid: selectedSwapNetwork[0].chainid,
        tochainid: selectedSwapNetwork[1].chainid,
        issuer: walletAddress,
        // amount: '1',
        // slippage: '5',
        // blockchainid: '27',
        // fromaddress: '',
        // toaddress: 'TMwFHYXLJaRUPeW6421aqXL4ZEzPRFGkGT',
        // fromtokenid: '254861470',
        // totokenid: '48566600',
        // fromns: 'solana',
        // tons: 'tron',
        // fromchainid: '1',
        // tochainid: '728126428',
        // issuer: 'FPKZ4UesNZ6TgonqjoznH3PB71U24YcjUsJfzyvvGsAg',
      };
      try {
        const response: any = await swapDetail(payload).unwrap();

        if (response?.success === true) {
          const {Result} = response ?? {};
          const dataArray = Object.keys(Result).map(key => ({
            id: key,
            title: key,
            value: Result[key],
          }));
          if (
            selectedSwapNetwork?.[0]?.ns !== selectedSwapNetwork?.[1]?.ns
          ) {
            dataArray?.map((data: any) => {
              if (Array.isArray(data?.value)) {
                dataArray.splice(dataArray?.length - 1, 0, {
                  id: 'Fees',
                  title: 'Fees',
                  value: data?.value?.[0]?.fee,
                });
              }
            });
          }
          setSwapDatDetail(dataArray);
        } else {
          setSwapDatDetail(null);
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
    }
  };

  useEffect(() => {
    getSwap();
  }, []);

  useEffect(() => {
    getSwapDetail();
  }, [selectedSwapNetwork]);

  useEffect(() => {
    getSwapDetail();
  }, [fromAmount]);

  const onConfirmSwap = async () => {
    if (selectedSwapNetwork?.length >= 2 && fromAmount !== '') {
      const payload = {
        amount: parseInt(fromAmount, 10),
        slippage:
          activeTab?.label === 'Custom'
            ? parseInt(customAmount, 10)
            : activeTab?.value,
        blockchainid: selectedSwapNetwork[0].blockchainid,
        fromaddress: selectedSwapNetwork[0].address,
        toaddress: selectedSwapNetwork[1].address,
        fromtokenid: selectedSwapNetwork[0].tokenid,
        totokenid: selectedSwapNetwork[1].tokenid,
        fromns: selectedSwapNetwork[0].ns,
        tons: selectedSwapNetwork[1].ns,
        fromchainid: selectedSwapNetwork[0].chainid,
        tochainid: selectedSwapNetwork[1].chainid,
        issuer: walletAddress,
        userid: walletInfo?.userid,
        walletid: walletInfo?.wallet_id,
      };

      try {
        const response: any = await confirmSwap(payload).unwrap();
        if (response?.Result?.success) {
          showToast({
            type: 'success',
            text1: response?.Result?.message,
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
    }
  };

  const renderSwapItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row', margin: 10}}
        onPress={() => {
          if (item?.id === 'all') {
            setSelectedSwap(swapData?.tokenlist);
          } else {
            setSelectedSwap(swapData?.[item?.id]);
          }
        }}>
        {item?.id === 'all' ? (
          <View
            style={{
              backgroundColor: colors.gray_bg,
              width: 40,
              height: 40,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: moderateScale(14),
                color: '#333333',
                textAlign: 'center',
                fontWeight: 600,
              }}>
              {item?.icon_txt}
            </Text>
          </View>
        ) : (
          <Image
            style={styles.itemIconLogo}
            source={{
              uri: item?.icon_url,
            }}
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderSwapListItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row', margin: 15, alignItems: 'center'}}
        onPress={() => {
          let array;
          if (showSwap === 'Swap From') {
            array = [...selectedSwapNetwork];
            array[0] = item;
          } else if (showSwap === 'Swap To') {
            array = [...selectedSwapNetwork];
            array[1] = item;
          }
          setSelectedSwapNetwork(array);
          swapSheetRef?.current?.hide();
        }}>
        <Image
          style={styles.itemIconLogo}
          source={{
            uri: item?.icon_url,
          }}
        />
        <Text
          style={{
            fontSize: moderateScale(14),
            color: '#333333',
            textAlign: 'center',
            fontWeight: 600,
            marginLeft: 15,
          }}>
          {item?.symbol}
        </Text>
        <Text
          style={{
            fontSize: moderateScale(12),
            color: '#9C9DA0',
            textAlign: 'center',
            fontWeight: 600,
            marginLeft: 5,
          }}>
          {`(${item?.network})`}
        </Text>
      </TouchableOpacity>
    );
  };

  const showRoutes = (item: any) => {
    if (Array.isArray(item?.value)) {
      if (selectedSwapNetwork?.[0]?.ns !== selectedSwapNetwork?.[1]?.ns) {
        return (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              routeSheetRef?.current?.show();
              setSwapRoute(item?.value);
            }}>
            <Image
              style={{width: 10, height: 10}}
              source={{
                uri: item?.value[0]?.icon,
              }}
            />
            <Text
              style={{
                fontSize: moderateScale(12),
                fontWeight: 500,
                color: '#333333',
                marginLeft: 5,
              }}>
              {item?.value[0].bridge}
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={15}
              color={'#333333'}
            />
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
          onPress={() => {
            routeSheetRef?.current?.show();
            setSwapRoute(item?.value);
          }}>
          <Image
            style={{width: 10, height: 10}}
            source={{
              uri: item?.value[0]?.icon,
            }}
          />
          <Text
            style={{
              fontSize: moderateScale(12),
              fontWeight: 500,
              color: '#333333',
              marginLeft: 5,
            }}>
            {item?.value[0].dexName}
          </Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={15}
            color={'#333333'}
          />
        </TouchableOpacity>
      );
    }
    return (
      <Text
        style={{
          fontSize: moderateScale(12),
          fontWeight: 500,
          color: '#333333',
          textAlign: 'right',
          flex: 1,
        }}>
        {item?.value}
      </Text>
    );
  };

  const renderSwapDetailItem = ({item}: any) => {
    return (
      <View style={{flexDirection: 'row', marginRight: 5, marginTop: 5}}>
        <Text
          style={{
            fontSize: moderateScale(12),
            fontWeight: 500,
            color: '#9C9DA0',
            flex: 1,
          }}>
          {item?.title}
        </Text>
        {showRoutes(item)}
      </View>
    );
  };

  const renderRouteItem = ({item}: any) => {
    return (
      <View style={{flexDirection: 'row', marginRight: 5, marginTop: 10}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image
            style={{
              width: 15,
              height: 15,
              borderRadius: 100,
              alignSelf: 'center',
            }}
            source={{
              uri: item?.icon,
            }}
          />
          <Text
            style={{
              fontSize: moderateScale(14),
              fontWeight: 500,
              color: '#9C9DA0',
              marginLeft: 5,
              textAlign: 'center',
            }}
            numberOfLines={1}>
            {item?.dexName}
          </Text>
        </View>

        <Text
          style={{
            fontSize: moderateScale(14),
            fontWeight: 500,
            color: '#9C9DA0',
            flex: 1.5,
          }}>
          {item?.amountOut}
        </Text>
        <Text
          style={{
            fontSize: moderateScale(14),
            fontWeight: 500,
            color: '#9C9DA0',
            flex: 0.5,
          }}>
          {item?.diff}
        </Text>
      </View>
    );
  };

  const renderDiffRouteItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row', marginRight: 5, marginTop: 10}}
        onPress={() => {
          const dataArray = [...swapDataDetail];
          dataArray?.map((data: any, index) => {
            if (Array.isArray(data?.value)) {
              dataArray[index - 1] = {
                id: 'Fees',
                title: 'Fees',
                value: item?.fee,
              };
            }
          });
          setSwapDatDetail(dataArray);
          routeSheetRef?.current?.hide();
        }}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{
              width: 15,
              height: 15,
              borderRadius: 100,
              alignSelf: 'center',
            }}
            source={{
              uri: item?.icon,
            }}
          />
          <Text
            style={{
              fontSize: moderateScale(14),
              fontWeight: 500,
              color: '#9C9DA0',
              marginLeft: 5,
              textAlign: 'center',
            }}
            numberOfLines={1}>
            {item?.bridge}
          </Text>
        </View>

        <Text
          style={{
            fontSize: moderateScale(14),
            fontWeight: 500,
            color: '#9C9DA0',
            flex: 1.5,
          }}>
          {item?.duration}
        </Text>
        <Text
          style={{
            fontSize: moderateScale(14),
            fontWeight: 500,
            color: '#9C9DA0',
            flex: 0.5,
          }}>
          {item?.from_to}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={[
          appStyles.boxShadow,
          {
            backgroundColor: colors.white,
            borderRadius: 5,
            margin: 16,
            padding: 15,
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{fontSize: moderateScale(16), fontWeight: 700, color: '#333333', flex: 1}}>
            {t('TRANSIT')}
          </Text>
          <TouchableOpacity
            style={{padding: 5}}
            onPress={() => actionSheetRef?.current?.show()}>
            <Ionicons name={'settings-outline'} size={18} color={'#333333'} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.gray1,
            borderRadius: 5,
            backgroundColor: '#F5FAFF',
            padding: 8,
            marginTop: 5,
          }}>
          <Text style={{fontSize: moderateScale(12), fontWeight: 500, color: '#9C9DA0'}}>
            {t('FROM_1')}
          </Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => {
                swapSheetRef?.current?.show();
                setShowSwap('Swap From');
              }}>
              <Image
                style={styles.itemLogo}
                source={{
                  uri: selectedSwapNetwork?.[0]?.icon_url,
                }}
              />
              <View style={{marginLeft: 5, flex: 1}}>
                <Text
                  style={{
                    fontSize: moderateScale(14),
                    fontWeight: 500,
                    color: '#333333',
                  }}
                  numberOfLines={1}>
                  {selectedSwapNetwork?.[0]?.symbol}
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontWeight: 500,
                    color: '#9C9DA0',
                  }}
                  numberOfLines={1}>
                  {selectedSwapNetwork?.[0]?.network}
                </Text>
              </View>
              <Ionicons name={'chevron-down'} size={25} color={'#7E7F82'} />
            </TouchableOpacity>
            <View style={{flex: 1, marginLeft: 10}}>
              <TextInput
                style={styles.inputAmount}
                placeholder="0"
                placeholderTextColor="#9C9DA0"
                value={fromAmount}
                keyboardType="numeric"
                returnKeyType="done"
                onChangeText={text => {
                  setFromAmount(text);
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.gray1,
            borderRadius: 5,
            backgroundColor: '#F5FAFF',
            padding: 8,
            marginTop: 15,
          }}>
          <Text
            style={{
              fontSize: moderateScale(12),
              fontWeight: 500,
              color: '#9C9DA0',
            }}>
            {t('TO_ESTIMATE')}
          </Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => {
                swapSheetRef?.current?.show();
                setShowSwap('Swap To');
              }}>
              <Image
                style={styles.itemLogo}
                source={{
                  uri: selectedSwapNetwork?.[1]?.icon_url,
                }}
              />
              <View style={{marginLeft: 5, flex: 1}}>
                <Text
                  style={{
                    fontSize: moderateScale(14),
                    fontWeight: 500,
                    color: '#333333',
                  }}
                  numberOfLines={1}>
                  {selectedSwapNetwork?.[1]?.symbol}
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontWeight: 500,
                    color: '#9C9DA0',
                  }}
                  numberOfLines={1}>
                  {selectedSwapNetwork?.[1]?.network}
                </Text>
              </View>
              <Ionicons name={'chevron-down'} size={25} color={'#7E7F82'} />
            </TouchableOpacity>
            <View style={{flex: 1, marginLeft: 10}}>
              <Text style={{marginRight: 5, textAlign: 'right'}}>0</Text>
            </View>
          </View>
          <View style={styles.searchContainer}>
            {/* <TextInput
              style={styles.input}
              placeholder="Input or choose receive address"
              placeholderTextColor="#9C9DA0"
              value={walletAddress}
              editable={false}
              numberOfLines={1}
              onChangeText={text => {
                setWalletAddress(text);
              }}
            /> */}
            <Text
              style={{
                fontSize: moderateScale(14),
                color: '#9C9DA0',
                fontWeight: 600,
                flex: 1,
                paddingVertical: 13,
                marginRight: 5,
              }}
              numberOfLines={1}>
              {walletAddress}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowWallets(true);
              }}>
              <Ionicons name={'wallet-outline'} size={25} color={'#333333'} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={[styles.startedTouch]} onPress={onConfirmSwap}>
          <LinearGradient
            colors={['#6B121C', '#ED1C24']}
            style={styles.startedBtn}>
            <Text style={styles.startedBtnTxt}>{t('SWAP')}</Text>
          </LinearGradient>
        </TouchableOpacity>

        {swapDataDetail && (
          <FlatList
            data={swapDataDetail}
            renderItem={renderSwapDetailItem}
            removeClippedSubviews={false}
            scrollEnabled={false}
            style={{
              borderWidth: 1,
              borderColor: colors.gray1,
              borderRadius: 5,
              padding: 8,
              marginTop: 15,
            }}
            keyExtractor={(item, index) => 'key' + index}
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
              <Text style={styles.actionTitleTxt}>{t('ADVANCED_SETTINGS')}</Text>
              <TouchableOpacity
                onPress={() => {
                  actionSheetRef?.current?.hide();
                }}>
                <Ionicons name={'close'} size={20} color={'#333333'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderView} />
          <View style={{padding: 12}}>
            <Text
              style={{
                fontSize: moderateScale(14),
                fontWeight: 400,
                color: '#333333',
              }}>
              {t('SLIPPAGE_SETTING')}
            </Text>
            <Text
              style={{
                fontSize: moderateScale(12),
                fontWeight: 400,
                color: '#7C8FAC',
                marginTop: 5,
              }}>
              {t('SLIPPAGE_WARNING')}
            </Text>
            <View style={styles.tabContainer}>
              {titles?.map((title: any) => {
                if (
                  activeTab?.label === title?.label &&
                  title?.label === 'Custom'
                ) {
                  return (
                    <TextInput
                      style={{
                        backgroundColor: colors.white,
                        flex: 1,
                        borderRadius: 8,
                      }}
                      placeholder="0"
                      placeholderTextColor="#9C9DA0"
                      value={customAmount}
                      keyboardType="numeric"
                      returnKeyType="done"
                      onChangeText={text => {
                        setCustomAmount(text);
                      }}
                    />
                  );
                }
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      setCustomAmount('');
                      setActiveTab(title);
                    }}
                    style={[
                      styles.pillContainer,
                      activeTab?.value === title?.value && styles.activePill,
                    ]}>
                    <Text
                      style={[
                        styles.title,
                        activeTab?.value === title?.value && styles.activeTitle,
                      ]}>
                      {title?.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={{flexDirection: 'row', padding: 15, marginTop: 15}}>
              <Text
                style={{
                  fontSize: moderateScale(14),
                  fontWeight: 400,
                  color: '#333333',
                  flex: 1,
                }}>
                {t('LP_FEE_DISCOUNT')}
              </Text>
              <Ionicons
                name={'chevron-forward'}
                size={22}
                color={colors.black}
              />
            </View>
            <View style={styles.borderView} />
            <View style={{flexDirection: 'row', padding: 15}}>
              <Text
                style={{
                  fontSize: moderateScale(14),
                  fontWeight: 400,
                  color: '#333333',
                  flex: 1,
                }}>
                {t('MEV_PROTECTION')}
              </Text>
              <Ionicons
                name={'chevron-forward'}
                size={22}
                color={colors.black}
              />
            </View>
            <View style={styles.borderView} />
            <View style={{flexDirection: 'row', padding: 15}}>
              <Text
                style={{
                  fontSize: moderateScale(14),
                  fontWeight: 400,
                  color: '#333333',
                  flex: 1,
                }}>
                {t('RECEIVING_ADDRESS')}
              </Text>
              <Switch
                color="#00C9A7"
                value={isAddress}
                onValueChange={val => setIsAddress(val)}
              />
            </View>
          </View>
        </ActionSheet>

        <ActionSheet
          ref={swapSheetRef}
          containerStyle={styles.actionContainer}
          closeOnPressBack={false}
          closeOnTouchBackdrop={false}
          onClose={() => {
            swapSheetRef?.current?.hide();
          }}>
          <View style={styles.actionViewContainer}>
            <View style={styles.actionTitleView}>
              <Text style={styles.actionTitleTxt}>{showSwap}</Text>
              <TouchableOpacity
                onPress={() => {
                  swapSheetRef?.current?.hide();
                }}>
                <Ionicons name={'close'} size={20} color={'#333333'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderView} />
          <FlatList
            data={swapIcon}
            renderItem={renderSwapItem}
            removeClippedSubviews={false}
            keyExtractor={(item, index) => 'key' + index}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingBottom: 15, marginLeft: 15}}
          />
          <FlatList
            data={selectedSwap}
            renderItem={renderSwapListItem}
            removeClippedSubviews={false}
            keyExtractor={(item, index) => 'key' + index}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.borderView} />}
          />
        </ActionSheet>

        <ActionSheet
          ref={routeSheetRef}
          containerStyle={styles.actionContainer}
          closeOnPressBack={false}
          closeOnTouchBackdrop={false}
          onClose={() => {
            routeSheetRef?.current?.hide();
          }}>
          <View style={styles.actionViewContainer}>
            <View style={styles.actionTitleView}>
              <Text style={styles.actionTitleTxt}>{t('ROUTE_DETAILS')}</Text>
              <TouchableOpacity
                onPress={() => {
                  routeSheetRef?.current?.hide();
                }}>
                <Ionicons name={'close'} size={20} color={'#333333'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderView} />
          {selectedSwapNetwork?.[0]?.ns !==
          selectedSwapNetwork?.[1]?.ns ? (
            <FlatList
              data={swapRoute}
              renderItem={renderDiffRouteItem}
              removeClippedSubviews={false}
              keyExtractor={(item, index) => 'key' + index}
              showsHorizontalScrollIndicator={false}
              style={{paddingBottom: 15, marginLeft: 15}}
              ListHeaderComponent={() => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginRight: 5,
                      marginTop: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: moderateScale(14),
                        fontWeight: 700,
                        color: '#333333',
                        flex: 1,
                      }}>
                      {t('BRIDGE')}
                    </Text>
                    <Text
                      style={{
                        fontSize: moderateScale(14),
                        fontWeight: 700,
                        color: '#333333',
                        flex: 1.5,
                      }}>
                      {t('DURATION')}
                    </Text>
                    <Text
                      style={{
                        fontSize: moderateScale(14),
                        fontWeight: 700,
                        color: '#333333',
                        flex: 0.5,
                      }}>
                      {t('FROM_TO')}
                    </Text>
                  </View>
                );
              }}
            />
          ) : (
            <FlatList
              data={swapRoute}
              renderItem={renderRouteItem}
              removeClippedSubviews={false}
              keyExtractor={(item, index) => 'key' + index}
              showsHorizontalScrollIndicator={false}
              style={{paddingBottom: 15, marginLeft: 15}}
              ListHeaderComponent={() => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginRight: 5,
                      marginTop: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: moderateScale(14),
                        fontWeight: 700,
                        color: '#333333',
                        flex: 1,
                      }}>
                      {t('DEX_NAME')}
                    </Text>
                    <Text
                      style={{
                        fontSize: moderateScale(14),
                        fontWeight: 700,
                        color: '#333333',
                        flex: 1.5,
                      }}>
                      {t('OUTPUT')}
                    </Text>
                    <Text
                      style={{
                        fontSize: moderateScale(14),
                        fontWeight: 700,
                        color: '#333333',
                        flex: 0.5,
                      }}>
                      {t('DIFF')}
                    </Text>
                  </View>
                );
              }}
            />
          )}
        </ActionSheet>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputAmount: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    color: colors.black,
    textAlign: 'right',
    marginRight: 5,
  },
  dropdown: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.7,
  },
  imageStyle: {
    width: 24,
    height: 24,
  },
  placeholderStyle: {
    fontSize: moderateScale(16),
  },
  selectedTextStyle: {
    fontSize: moderateScale(16),
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: moderateScale(16),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12, // Adjust the value to change the roundness
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.gray1,
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    color: colors.black,
  },
  startedTouch: {
    width: '100%',
    marginTop: 20,
    marginBottom: 5,
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
    backgroundColor: '#FFFFFF',
    paddingBottom: 50,
    height: Dimensions.get('screen').height / 1.5,
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
    marginTop: 5,
    marginBottom: 5,
  },
  borderView: {
    borderWidth: 1,
    borderColor: colors.gray1,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    paddingVertical: 1,
    marginTop: 15,
    backgroundColor: '#EFF2F5',
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.29)',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  pillContainer: {
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 8,
    flex: 1,
  },
  title: {
    fontSize: moderateScale(13),
    fontWeight: 500,
    color: '#7C8FAC',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  activeTitle: {
    color: '#333333',
  },
  activePill: {
    backgroundColor: colors.white,
    flex: 1,
  },
  itemLogo: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  itemIconLogo: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
});

export default SwapBridgeComponent;
