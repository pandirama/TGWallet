/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useTranslation } from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../utils/appStyles';
import {colors} from '../../../utils/colors';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import NFTNotFound from '../../../assets/nftnotfound.svg';
import Ethereum from '../../../assets/ethereum.svg';
import BinanceIcon from '../../../assets/binance_icon.svg';
import {Ionicons} from '../../../utils/IconUtils';
import { moderateScale } from 'react-native-size-matters';

type Props = NativeStackScreenProps<any, 'NFTDETAILS'>;

const NFTDetailsComponent = ({}: Props) => {
  const { t } = useTranslation();
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
        <DashBoardHeaderComponent title={t('NFT_DETAILS')} />
        <View style={styles.walletContainer}>
          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <View style={{flexDirection: 'row', padding: 15}}>
              <View style={styles.defiListIconView}>
                <Ethereum width={28} height={28} />
              </View>
              <View style={{marginLeft: 10, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontWeight: 400,
                    color: '#333333',
                  }}>
                  {t('STARRYNIFT')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      borderWidth: 1,
                      borderColor: colors.gray1,
                      padding: 2,
                      borderRadius: 5,
                      fontSize: moderateScale(10),
                      fontWeight: 400,
                      color: '#7C8FAC',
                    }}>
                    {t('ERC721')}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: moderateScale(12),
                      fontWeight: 400,
                      color: '#7C8FAC',
                    }}>
                    {t('NFT_ID_SAMPLE')}
                  </Text>
                  <Ionicons
                    name={'copy-outline'}
                    size={15}
                    color={'#7C8FAC'}
                    style={{marginLeft: 5}}
                  />
                </View>
              </View>
            </View>
            <View style={styles.borderView} />
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, alignItems: 'center', padding: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <BinanceIcon width={20} height={20} />
                  <Text
                    style={{
                      fontSize: moderateScale(12),
                      fontWeight: 400,
                      color: '#333333',
                      marginLeft: 5,
                    }}>
                    0
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontWeight: 400,
                    color: '#7C8FAC',
                    marginTop: 5,
                  }}>
                  {t('FLOOR_PRICE')}
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'center', padding: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <BinanceIcon width={20} height={20} />
                  <Text
                    style={{
                      fontSize: moderateScale(12),
                      fontWeight: 400,
                      color: '#333333',
                      marginLeft: 5,
                    }}>
                    0
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontWeight: 400,
                    color: '#7C8FAC',
                    marginTop: 5,
                  }}>
                  {t('AVG_PRICE_24H')}
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'center', padding: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <BinanceIcon width={20} height={20} />
                  <Text
                    style={{
                      fontSize: moderateScale(12),
                      fontWeight: 400,
                      color: '#333333',
                      marginLeft: 5,
                    }}>
                    0
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontWeight: 400,
                    color: '#7C8FAC',
                    marginTop: 5,
                  }}>
                  {t('VOLUME_24H')}
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.networkTxt}>{t('HOT_NFT')}</Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <NFTNotFound />
            <Text style={styles.noTxt}>{t('NO_NFT_FOUND')}</Text>
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
    flex: 1,
  },
  walletSubContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginTop: 10,
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
    marginLeft: 5,
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
    borderWidth: 1,
    borderColor: colors.gray1,
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
  noTxt: {
    fontSize: moderateScale(14),
    fontWeight: 400,
    color: '#7C8FAC',
    marginTop: 15,
  },
  defiListIconView: {
    backgroundColor: '#F5FAFF',
    padding: 10,
    borderRadius: 100,
  },
});

export default NFTDetailsComponent;
