/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../utils/colors';
import BitCoin from '../../../assets/bit_coin.svg';
import Ethereum from '../../../assets/ethereum.svg';

const DEFIs = [
  {
    id: 0,
    walletName: 'USDC',
    amount: '$3,678.05',
    spendAmount: '+72.03%',
    add: true,
    icon: <BitCoin width={28} height={28} />,
  },
  {
    id: 1,
    walletName: 'ETH',
    amount: '$3,678.05',
    spendAmount: '-72.03%',
    add: false,
    icon: <Ethereum width={28} height={28} />,
  },
  {
    id: 2,
    walletName: 'USDC',
    amount: '$3,678.05',
    spendAmount: '+72.03%',
    add: true,
    icon: <BitCoin width={28} height={28} />,
  },
  {
    id: 3,
    walletName: 'ETH',
    amount: '$3,678.05',
    spendAmount: '-72.03%',
    add: false,
    icon: <Ethereum width={28} height={28} />,
  },
  {
    id: 4,
    walletName: 'USDC',
    amount: '$3,678.05',
    spendAmount: '+72.03%',
    add: true,
    icon: <BitCoin width={28} height={28} />,
  },
  {
    id: 5,
    walletName: 'ETH',
    amount: '$3,678.05',
    spendAmount: '-72.03%',
    add: false,
    icon: <Ethereum width={28} height={28} />,
  },
  {
    id: 6,
    walletName: 'USDC',
    amount: '$3,678.05',
    spendAmount: '+72.03%',
    add: true,
    icon: <BitCoin width={28} height={28} />,
  },
  {
    id: 7,
    walletName: 'ETH',
    amount: '$3,678.05',
    spendAmount: '-72.03%',
    add: false,
    icon: <Ethereum width={28} height={28} />,
  },
  {
    id: 8,
    walletName: 'USDC',
    amount: '$3,678.05',
    spendAmount: '+72.03%',
    add: true,
    icon: <BitCoin width={28} height={28} />,
  },
  {
    id: 9,
    walletName: 'ETH',
    amount: '$3,678.05',
    spendAmount: '-72.03%',
    add: false,
    icon: <Ethereum width={28} height={28} />,
  },
  {
    id: 10,
    walletName: 'USDC',
    amount: '$3,678.05',
    spendAmount: '+72.03%',
    add: true,
    icon: <BitCoin width={28} height={28} />,
  },
  {
    id: 11,
    walletName: 'ETH',
    amount: '$3,678.05',
    spendAmount: '-72.03%',
    add: false,
    icon: <Ethereum width={28} height={28} />,
  },
];

const DEFIComponent = () => {
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity style={styles.defiListTouch}>
        <View style={styles.defiListIconView}>{item?.icon}</View>
        <View style={styles.defiListHeaderTxtView}>
          <View style={styles.defiListTxtView}>
            <Text style={[styles.defiListnameTxt, {flex: 1}]}>
              {item?.walletName}
            </Text>
            <Text style={styles.defiListnameTxt}>0</Text>
          </View>
          <View style={styles.defiListTxtView}>
            <Text style={styles.defiListamountTxt}>{item?.amount}</Text>
            <View
              style={[
                styles.spendView,
                item?.add ? styles.spendColour : styles.minusColor,
              ]}>
              <Text
                style={[
                  {
                    fontSize: 12,
                    fontWeight: 500,
                  },
                  item?.add
                    ? {
                        color: '#167E8D',
                      }
                    : {color: '#D32F2F'},
                ]}>
                {item?.spendAmount}
              </Text>
            </View>

            <Text
              style={[styles.defiListamountTxt, {textAlign: 'right', flex: 1}]}>
              $0
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={DEFIs}
      renderItem={renderItem}
      keyExtractor={(item: any) => item?.id}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => {
        return <View style={styles.borderView} />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  defiListTouch: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 10,
  },
  defiListIconView: {
    backgroundColor: '#F5FAFF',
    padding: 10,
    borderRadius: 100,
  },
  defiListHeaderTxtView: {
    marginLeft: 15,
    width: '82%',
  },
  defiListTxtView: {
    flexDirection: 'row',
    padding: 2,
    alignItems: 'center',
  },
  defiListnameTxt: {
    fontSize: 14,
    fontWeight: 600,
    color: '#333333',
  },
  defiListamountTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#7C8FAC',
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
    marginRight: 15,
    paddingLeft: 0,
    width: '100%',
  },
  spendView: {
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 8,
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    marginLeft: 8,
  },
  spendColour: {
    backgroundColor: '#D4FCEC',
    borderColor: '#167E8D',
  },
  minusColor: {
    backgroundColor: '#FDEDED',
    borderColor: '#D32F2F',
  },
});

export default DEFIComponent;
