/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../utils/colors';


const DEFIComponent = ({tokenAssets, navigation}: any) => {
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.defiListTouch}
        onPress={() =>
          navigation.navigate('TOKEN', {
            token: item,
          })
        }>
        <View style={styles.defiListIconView}>
          <Image
            style={styles.itemLogo}
            source={{
              uri: item?.tokenImage,
            }}
          />
        </View>
        <View style={styles.defiListHeaderTxtView}>
          <Text style={[styles.defiListnameTxt]}>{item?.tokenName}</Text>
          <View style={styles.defiListTxtView}>
            <Text style={styles.defiListNameTxt}>{item?.balance}</Text>
            <Text style={[styles.defiListamountTxt]}>
              {`$${item?.balanceInUSD}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={tokenAssets}
      renderItem={renderItem}
      removeClippedSubviews={false}
      keyExtractor={(item, index) => 'key' + index}
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
    marginLeft: 5,
    flexDirection: 'row',
    flex: 1,
  },
  defiListTxtView: {
    padding: 2,
    marginRight: 15,
  },
  defiListnameTxt: {
    fontSize: 14,
    fontWeight: 600,
    color: '#333333',
    alignSelf: 'center',
    flex: 1,
  },
  defiListNameTxt: {
    fontSize: 14,
    fontWeight: 600,
    color: '#333333',
    textAlign: 'right',
  },
  defiListamountTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#7C8FAC',
    textAlign: 'right',
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
  itemLogo: {
    width: 30,
    height: 30,
  },
});

export default DEFIComponent;
