/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../utils/appStyles';
import {colors} from '../../../utils/colors';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import NFTNotFound from '../../../assets/nftnotfound.svg';
import Ethereum from '../../../assets/ethereum.svg';
import BinanceIcon from '../../../assets/binance_icon.svg';
import { Ionicons } from '../../../utils/IconUtils';

type Props = NativeStackScreenProps<any, 'NFTDETAILS'>;

const NFTDetailsComponent = ({}: Props) => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.background}
        animated
      />
      <SafeAreaView style={appStyles.container}>
        <DashBoardHeaderComponent title={'NFT Details'} />
        <View style={styles.walletContainer}>
          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <View style={{flexDirection: 'row', padding: 15}}>
              <View style={styles.defiListIconView}>
                <Ethereum width={28} height={28} />
              </View>
              <View style={{marginLeft: 10, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#333333',
                  }}>
                  StarryNift
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
                      fontSize: 10,
                      fontWeight: 400,
                      color: '#7C8FAC',
                    }}>
                    ERC721
                  </Text>
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 12,
                      fontWeight: 400,
                      color: '#7C8FAC',
                    }}>
                    IJIiodsoewUI83234HJ
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
                      fontSize: 12,
                      fontWeight: 400,
                      color: '#333333',
                      marginLeft: 5,
                    }}>
                    0
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#7C8FAC',
                    marginTop: 5,
                  }}>
                  Floor Price
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'center', padding: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <BinanceIcon width={20} height={20} />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: '#333333',
                      marginLeft: 5,
                    }}>
                    0
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#7C8FAC',
                    marginTop: 5,
                  }}>
                  25H Avg Price
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'center', padding: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <BinanceIcon width={20} height={20} />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: '#333333',
                      marginLeft: 5,
                    }}>
                    0
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#7C8FAC',
                    marginTop: 5,
                  }}>
                  24H Volume
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.networkTxt}>Hot NFT</Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <NFTNotFound />
            <Text style={styles.noTxt}>No NFT Found</Text>
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
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    textAlignVertical: 'center',
    marginLeft: 8,
  },
  networkTxt: {
    fontSize: 15,
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
    fontSize: 12,
    fontWeight: 500,
    color: '#333333',
  },
  nftValueTxt: {
    fontSize: 10,
    fontWeight: 400,
    color: '#7C8FAC',
  },
  nftBalanceTxt: {
    fontSize: 10,
    fontWeight: 400,
    color: '#333333',
  },
  noTxt: {
    fontSize: 14,
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
